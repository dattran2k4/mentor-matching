package com.mentormatching.modules.scheduling.application.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.port.in.GetMentorCalendarUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingBookingLookupPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingMentorLookupPort;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorCalendarQueryService implements GetMentorCalendarUseCase {

    private static final long MAX_CALENDAR_RANGE_DAYS = 31;

    private final SchedulingMentorLookupPort schedulingMentorLookupPort;
    private final MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private final SchedulingBookingLookupPort schedulingBookingLookupPort;

    public MentorCalendarQueryService(SchedulingMentorLookupPort schedulingMentorLookupPort,
            MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort,
            SchedulingBookingLookupPort schedulingBookingLookupPort) {
        this.schedulingMentorLookupPort = schedulingMentorLookupPort;
        this.mentorAvailabilityRepositoryPort = mentorAvailabilityRepositoryPort;
        this.schedulingBookingLookupPort = schedulingBookingLookupPort;
    }

    @Override
    public MentorCalendarDetail getMentorCalendar(GetMentorCalendarQuery query) {
        validateQuery(query);
        ensureApprovedMentor(query.mentorId());
        mentorAvailabilityRepositoryPort.findCalendarAvailabilities(query.mentorId(), query.from(), query.to());
        schedulingBookingLookupPort.getScheduleBlocks(query.mentorId(), query.from(), query.to());
        return new MentorCalendarDetail(query.mentorId(), query.from(), query.to(), List.of());
    }

    private void ensureApprovedMentor(Long mentorId) {
        if (!schedulingMentorLookupPort.getMentor(mentorId).approved()) {
            throw new ResourceNotFoundException("Mentor profile not found");
        }
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
