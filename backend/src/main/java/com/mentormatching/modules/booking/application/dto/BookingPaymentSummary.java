package com.mentormatching.modules.booking.application.dto;

import java.math.BigDecimal;

import com.mentormatching.modules.booking.domain.BookingStatus;

public record BookingPaymentSummary(Long bookingId, Long studentUserId, BigDecimal totalAmount,
                                    BookingStatus status) {
}
