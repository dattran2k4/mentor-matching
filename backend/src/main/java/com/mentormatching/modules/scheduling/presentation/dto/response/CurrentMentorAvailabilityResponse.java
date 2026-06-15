package com.mentormatching.modules.scheduling.presentation.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.application.dto.CurrentMentorAvailabilityDetail;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;

public record CurrentMentorAvailabilityResponse(Long id, AvailabilityType availabilityType, Integer dayOfWeek,
                                                LocalDate availableDate, LocalTime startTime, LocalTime endTime) {

    public static CurrentMentorAvailabilityResponse from(CurrentMentorAvailabilityDetail availability) {
        return new CurrentMentorAvailabilityResponse(availability.id(), availability.availabilityType(),
                availability.dayOfWeek(), availability.availableDate(), availability.startTime(),
                availability.endTime());
    }
}
