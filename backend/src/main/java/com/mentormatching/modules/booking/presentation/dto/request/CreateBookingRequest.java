package com.mentormatching.modules.booking.presentation.dto.request;

import java.time.LocalDate;

import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;
import com.mentormatching.modules.booking.domain.BookingMeetingType;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBookingRequest(@NotNull(message = "Mentor id is required") Long mentorId,
                                   @NotNull(message = "Mentor subject id is required") Long mentorSubjectId,
                                   @NotNull(message = "Mentor availability id is required") Long mentorAvailabilityId,
                                   @NotNull(message = "Booking date is required")
                                   @FutureOrPresent(message = "Booking date must not be in the past") LocalDate bookingDate,
                                   @NotNull(message = "Meeting type is required") BookingMeetingType meetingType,
                                   @Size(max = 1000, message = "Booking note must not exceed 1000 characters") String note) {

    public CreateBookingCommand toCommand(Long studentUserId) {
        return new CreateBookingCommand(studentUserId, mentorId, mentorSubjectId, mentorAvailabilityId, bookingDate,
                meetingType, note);
    }
}
