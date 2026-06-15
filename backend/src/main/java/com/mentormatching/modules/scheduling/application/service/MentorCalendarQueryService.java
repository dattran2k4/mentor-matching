package com.mentormatching.modules.scheduling.application.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.port.in.GetMentorCalendarUseCase;
import com.mentormatching.shared.exception.InvalidDataException;

@Service
public class MentorCalendarQueryService implements GetMentorCalendarUseCase {

    private static final long MAX_CALENDAR_RANGE_DAYS = 31;

    @Override
    public MentorCalendarDetail getMentorCalendar(GetMentorCalendarQuery query) {
        validateQuery(query);
        return new MentorCalendarDetail(query.mentorId(), query.from(), query.to(), List.of());
    }

    private void validateQuery(GetMentorCalendarQuery query) {
        if (query == null) {
            throw new InvalidDataException("Mentor calendar query is required");
        }
        if (query.mentorId() == null || query.mentorId() <= 0) {
            throw new InvalidDataException("Mentor id must be greater than 0");
        }
        if (query.from() == null) {
            throw new InvalidDataException("Calendar from date is required");
        }
        if (query.to() == null) {
            throw new InvalidDataException("Calendar to date is required");
        }
        if (query.from().isAfter(query.to())) {
            throw new InvalidDataException("Calendar from date must not be after to date");
        }

        long inclusiveRangeDays = ChronoUnit.DAYS.between(query.from(), query.to()) + 1;
        if (inclusiveRangeDays > MAX_CALENDAR_RANGE_DAYS) {
            throw new InvalidDataException("Calendar date range must not exceed 31 days");
        }
    }
}
