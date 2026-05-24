package com.mentormatching.modules.booking.presentation.dto.response;

public record CreateBookingResponse(Long bookingId) {

    public static CreateBookingResponse from(Long bookingId) {
        return new CreateBookingResponse(bookingId);
    }
}
