package com.mentormatching.modules.scheduling.presentation.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.application.dto.UpdateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record UpdateCurrentMentorAvailabilityRequest(
        @NotNull(message = "Availability type is required") AvailabilityType availabilityType,
        Integer dayOfWeek,
        LocalDate availableDate,
        @NotNull(message = "Start time is required") LocalTime startTime,
        @NotNull(message = "End time is required") LocalTime endTime
) {

    public UpdateCurrentMentorAvailabilityCommand toCommand(AuthenticatedPrincipal principal, Long availabilityId) {
        return new UpdateCurrentMentorAvailabilityCommand(principal.getId(), availabilityId, availabilityType,
                dayOfWeek, availableDate, startTime, endTime);
    }
}
