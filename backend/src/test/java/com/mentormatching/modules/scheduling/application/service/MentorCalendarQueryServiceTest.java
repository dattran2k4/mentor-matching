package com.mentormatching.modules.scheduling.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDateDetail;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarWindowDetail;
import com.mentormatching.modules.scheduling.application.dto.SchedulingBookingBlock;
import com.mentormatching.modules.scheduling.application.dto.SchedulingMentorSnapshot;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingBookingLookupPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingMentorLookupPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.modules.scheduling.domain.MentorAvailabilityRestoreData;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorCalendarQueryServiceTest {

    private static final ZoneId TEST_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    private SchedulingMentorLookupPort schedulingMentorLookupPort;
    private MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private SchedulingBookingLookupPort schedulingBookingLookupPort;
    private MentorCalendarQueryService mentorCalendarQueryService;

    @BeforeEach
    void setUp() {
        schedulingMentorLookupPort = mock(SchedulingMentorLookupPort.class);
        mentorAvailabilityRepositoryPort = mock(MentorAvailabilityRepositoryPort.class);
        schedulingBookingLookupPort = mock(SchedulingBookingLookupPort.class);
        mentorCalendarQueryService = createService(Clock.fixed(
                Instant.parse("2026-06-13T17:00:00Z"), TEST_ZONE));
    }

    @Test
    void getMentorCalendarAcceptsInclusiveRangeOfThirtyOneDays() {
        LocalDate from = LocalDate.of(2026, 6, 1);
        LocalDate to = LocalDate.of(2026, 7, 1);
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, true));

        MentorCalendarDetail result = mentorCalendarQueryService.getMentorCalendar(
                new GetMentorCalendarQuery(10L, from, to));

        assertEquals(10L, result.mentorId());
        assertEquals(from, result.from());
        assertEquals(to, result.to());
        verify(schedulingMentorLookupPort).getMentor(10L);
        verify(mentorAvailabilityRepositoryPort).findCalendarAvailabilities(10L, from, to);
        verify(schedulingBookingLookupPort).getScheduleBlocks(10L, from, to);
    }

    @Test
    void getMentorCalendarMergesAvailabilitiesAndSubtractsBookingBlocks() {
        LocalDate from = LocalDate.of(2026, 6, 15);
        LocalDate to = LocalDate.of(2026, 6, 17);
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, true));
        when(mentorAvailabilityRepositoryPort.findCalendarAvailabilities(10L, from, to))
                .thenReturn(List.of(
                        availability(AvailabilityType.RECURRING, 1, null, 9, 0, 12, 0),
                        availability(AvailabilityType.SPECIFIC_DATE, null, from, 11, 0, 14, 0),
                        availability(AvailabilityType.RECURRING, 2, null, 8, 0, 9, 0)));
        when(schedulingBookingLookupPort.getScheduleBlocks(10L, from, to))
                .thenReturn(List.of(
                        new SchedulingBookingBlock(from, LocalTime.of(10, 0), LocalTime.of(11, 0)),
                        new SchedulingBookingBlock(from, LocalTime.of(12, 0), LocalTime.of(13, 0)),
                        new SchedulingBookingBlock(from.plusDays(1), LocalTime.of(7, 0), LocalTime.of(8, 0))));

        MentorCalendarDetail result = mentorCalendarQueryService.getMentorCalendar(
                new GetMentorCalendarQuery(10L, from, to));

        assertEquals(List.of(
                new MentorCalendarDateDetail(from, List.of(
                        new MentorCalendarWindowDetail(LocalTime.of(9, 0), LocalTime.of(10, 0)),
                        new MentorCalendarWindowDetail(LocalTime.of(11, 0), LocalTime.of(12, 0)),
                        new MentorCalendarWindowDetail(LocalTime.of(13, 0), LocalTime.of(14, 0)))),
                new MentorCalendarDateDetail(from.plusDays(1), List.of(
                        new MentorCalendarWindowDetail(LocalTime.of(8, 0), LocalTime.of(9, 0)))),
                new MentorCalendarDateDetail(to, List.of())), result.dates());
    }

    @Test
    void getMentorCalendarReturnsEmptyWindowsWhenBookingCoversAvailability() {
        LocalDate date = LocalDate.of(2026, 6, 15);
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, true));
        when(mentorAvailabilityRepositoryPort.findCalendarAvailabilities(10L, date, date))
                .thenReturn(List.of(availability(AvailabilityType.RECURRING, 1, null, 9, 0, 11, 0)));
        when(schedulingBookingLookupPort.getScheduleBlocks(10L, date, date))
                .thenReturn(List.of(new SchedulingBookingBlock(date, LocalTime.of(8, 0), LocalTime.of(12, 0))));

        MentorCalendarDetail result = mentorCalendarQueryService.getMentorCalendar(
                new GetMentorCalendarQuery(10L, date, date));

        assertEquals(List.of(new MentorCalendarDateDetail(date, List.of())), result.dates());
    }

    @Test
    void getMentorCalendarRemovesPastDatesAndTrimsCurrentDateWindow() {
        LocalDate from = LocalDate.of(2026, 6, 14);
        LocalDate today = LocalDate.of(2026, 6, 15);
        LocalDate to = LocalDate.of(2026, 6, 16);
        mentorCalendarQueryService = createService(Clock.fixed(
                Instant.parse("2026-06-15T03:15:30Z"), TEST_ZONE));
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, true));
        when(mentorAvailabilityRepositoryPort.findCalendarAvailabilities(10L, from, to))
                .thenReturn(List.of(
                        availability(AvailabilityType.SPECIFIC_DATE, null, from, 9, 0, 12, 0),
                        availability(AvailabilityType.SPECIFIC_DATE, null, today, 9, 0, 12, 0),
                        availability(AvailabilityType.SPECIFIC_DATE, null, today, 8, 0, 10, 0),
                        availability(AvailabilityType.SPECIFIC_DATE, null, to, 9, 0, 12, 0)));

        MentorCalendarDetail result = mentorCalendarQueryService.getMentorCalendar(
                new GetMentorCalendarQuery(10L, from, to));

        assertEquals(List.of(
                new MentorCalendarDateDetail(from, List.of()),
                new MentorCalendarDateDetail(today, List.of(
                        new MentorCalendarWindowDetail(LocalTime.of(10, 16), LocalTime.of(12, 0)))),
                new MentorCalendarDateDetail(to, List.of(
                        new MentorCalendarWindowDetail(LocalTime.of(9, 0), LocalTime.of(12, 0))))), result.dates());
    }

    @Test
    void getMentorCalendarRejectsMentorThatIsNotApproved() {
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, false));

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L,
                        LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 7))));

        assertEquals("Mentor profile not found", exception.getMessage());
        verify(mentorAvailabilityRepositoryPort, never()).findCalendarAvailabilities(
                10L, LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 7));
        verify(schedulingBookingLookupPort, never()).getScheduleBlocks(
                10L, LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 7));
    }

    @Test
    void getMentorCalendarRejectsMissingQuery() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(null));

        assertEquals("Mentor calendar query is required", exception.getMessage());
    }

    @Test
    void getMentorCalendarRejectsInvalidMentorId() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(0L,
                        LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 7))));

        assertEquals("Mentor id must be greater than 0", exception.getMessage());
    }

    @Test
    void getMentorCalendarRejectsMissingFromDate() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L, null,
                        LocalDate.of(2026, 6, 7))));

        assertEquals("Calendar from date is required", exception.getMessage());
    }

    @Test
    void getMentorCalendarRejectsMissingToDate() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L,
                        LocalDate.of(2026, 6, 1), null)));

        assertEquals("Calendar to date is required", exception.getMessage());
    }

    @Test
    void getMentorCalendarRejectsReversedDateRange() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L,
                        LocalDate.of(2026, 6, 8), LocalDate.of(2026, 6, 1))));

        assertEquals("Calendar from date must not be after to date", exception.getMessage());
    }

    @Test
    void getMentorCalendarRejectsRangeLongerThanThirtyOneDays() {
        InvalidDataException exception = assertThrows(InvalidDataException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L,
                        LocalDate.of(2026, 6, 1), LocalDate.of(2026, 7, 2))));

        assertEquals("Calendar date range must not exceed 31 days", exception.getMessage());
    }

    private MentorAvailability availability(AvailabilityType type, Integer dayOfWeek, LocalDate availableDate,
            int startHour, int startMinute, int endHour, int endMinute) {
        return MentorAvailability.restore(new MentorAvailabilityRestoreData(100L, 10L, type, dayOfWeek,
                availableDate, LocalTime.of(startHour, startMinute), LocalTime.of(endHour, endMinute),
                LocalDateTime.of(2026, 6, 1, 10, 0), LocalDateTime.of(2026, 6, 1, 10, 0)));
    }

    private MentorCalendarQueryService createService(Clock clock) {
        return new MentorCalendarQueryService(schedulingMentorLookupPort, mentorAvailabilityRepositoryPort,
                schedulingBookingLookupPort, clock);
    }
}
