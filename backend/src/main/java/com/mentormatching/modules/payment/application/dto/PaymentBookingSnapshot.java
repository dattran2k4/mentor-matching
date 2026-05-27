package com.mentormatching.modules.payment.application.dto;

import java.math.BigDecimal;

import com.mentormatching.modules.booking.domain.BookingStatus;

public record PaymentBookingSnapshot(Long bookingId, Long studentUserId, BigDecimal totalAmount,
                                     BookingStatus status) {
}
