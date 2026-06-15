package com.mentormatching.modules.scheduling.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.dto.SchedulingMentorSnapshot;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingMentorLookupPort;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

class MentorCalendarQueryServiceTest {

    private SchedulingMentorLookupPort schedulingMentorLookupPort;
    private MentorCalendarQueryService mentorCalendarQueryService;

    @BeforeEach
    void setUp() {
        schedulingMentorLookupPort = mock(SchedulingMentorLookupPort.class);
        mentorCalendarQueryService = new MentorCalendarQueryService(schedulingMentorLookupPort);
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
    }

    @Test
    void getMentorCalendarRejectsMentorThatIsNotApproved() {
        when(schedulingMentorLookupPort.getMentor(10L))
                .thenReturn(new SchedulingMentorSnapshot(10L, false));

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> mentorCalendarQueryService.getMentorCalendar(new GetMentorCalendarQuery(10L,
                        LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 7))));

        assertEquals("Mentor profile not found", exception.getMessage());
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
}
