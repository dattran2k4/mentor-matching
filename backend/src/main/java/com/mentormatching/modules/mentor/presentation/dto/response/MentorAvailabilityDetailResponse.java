package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;

public record MentorAvailabilityDetailResponse(Long id, AvailabilityType availabilityType, Integer dayOfWeek,
                                               LocalDate availableDate, LocalTime startTime, LocalTime endTime) {

    public static MentorAvailabilityDetailResponse from(MentorAvailabilityDetail availability) {
        return new MentorAvailabilityDetailResponse(availability.id(), availability.availabilityType(),
                availability.dayOfWeek(), availability.availableDate(), availability.startTime(),
                availability.endTime());
    }
}
