package com.mentormatching.modules.booking.presentation.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;
import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBookingRequest(String studentName,
                                   @NotNull(message = "Mentor id is required") Long mentorId,
                                   String mentorName,
                                   @NotNull(message = "Mentor subject id is required") Long mentorSubjectId,
                                   String subjectName,
                                   String gradeName,
                                   @NotNull(message = "Mentor availability id is required") Long mentorAvailabilityId,
                                   @NotNull(message = "Time slot id is required") Long timeSlotId,
                                   @NotNull(message = "Booking date is required")
                                   @FutureOrPresent(message = "Booking date must not be in the past") LocalDate bookingDate,
                                   @NotNull(message = "Start time is required") LocalTime startTime,
                                   @NotNull(message = "End time is required") LocalTime endTime,
                                   String timeSlotLabel,
                                   @NotNull(message = "Price per hour is required")
                                   @DecimalMin(value = "0.01", message = "Price per hour must be positive") BigDecimal pricePerHour,
                                   @NotNull(message = "Meeting type is required") BookingMeetingType meetingType,
                                   @Size(max = 1000, message = "Booking note must not exceed 1000 characters") String note) {

    public CreateBookingCommand toCommand(AuthenticatedPrincipal principal) {
        return new CreateBookingCommand(principal.getId(), studentName, mentorId, mentorName, mentorSubjectId,
                subjectName, gradeName, mentorAvailabilityId, timeSlotId, bookingDate, startTime, endTime,
                timeSlotLabel, pricePerHour, meetingType, note);
    }
}
