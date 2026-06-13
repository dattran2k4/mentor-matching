package com.mentormatching.modules.scheduling.presentation.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.application.dto.CreateCurrentMentorAvailabilityCommand;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record CreateCurrentMentorAvailabilityRequest(
        @NotNull(message = "Availability type is required") AvailabilityType availabilityType,
        Integer dayOfWeek,
        LocalDate availableDate,
        @NotNull(message = "Start time is required") LocalTime startTime,
        @NotNull(message = "End time is required") LocalTime endTime
) {

    public CreateCurrentMentorAvailabilityCommand toCommand(AuthenticatedPrincipal principal) {
        return new CreateCurrentMentorAvailabilityCommand(principal.getId(), availabilityType, dayOfWeek,
                availableDate, startTime, endTime);
    }
}
