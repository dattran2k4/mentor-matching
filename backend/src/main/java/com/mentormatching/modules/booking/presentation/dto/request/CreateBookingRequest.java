package com.mentormatching.modules.booking.presentation.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;
import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBookingRequest(@NotNull(message = "Mentor id is required") Long mentorId,
                                   @NotNull(message = "Mentor subject id is required") Long mentorSubjectId,
                                   @NotNull(message = "Booking date is required")
                                   @FutureOrPresent(message = "Booking date must not be in the past") LocalDate bookingDate,
                                   @NotNull(message = "Start time is required") LocalTime startTime,
                                   @NotNull(message = "End time is required") LocalTime endTime,
                                   @NotNull(message = "Meeting type is required") BookingMeetingType meetingType,
                                   @Size(max = 1000, message = "Booking note must not exceed 1000 characters") String note) {

    public CreateBookingCommand toCommand(AuthenticatedPrincipal principal) {
        return new CreateBookingCommand(principal.getId(), mentorId, mentorSubjectId, bookingDate, startTime,
                endTime, meetingType, note);
    }
}
