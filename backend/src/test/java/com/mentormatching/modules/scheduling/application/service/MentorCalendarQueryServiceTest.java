package com.mentormatching.modules.scheduling.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.shared.exception.InvalidDataException;

class MentorCalendarQueryServiceTest {

    private MentorCalendarQueryService mentorCalendarQueryService;

    @BeforeEach
    void setUp() {
        mentorCalendarQueryService = new MentorCalendarQueryService();
    }

    @Test
    void getMentorCalendarAcceptsInclusiveRangeOfThirtyOneDays() {
        LocalDate from = LocalDate.of(2026, 6, 1);
        LocalDate to = LocalDate.of(2026, 7, 1);

        MentorCalendarDetail result = mentorCalendarQueryService.getMentorCalendar(
                new GetMentorCalendarQuery(10L, from, to));

        assertEquals(10L, result.mentorId());
        assertEquals(from, result.from());
        assertEquals(to, result.to());
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
