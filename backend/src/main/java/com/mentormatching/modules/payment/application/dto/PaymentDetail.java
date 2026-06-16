package com.mentormatching.modules.payment.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.payment.domain.PaymentStatus;

public record PaymentDetail(Long id, Long bookingId, BigDecimal amount, PaymentStatus status,
                            BookingStatus bookingStatus, String providerReferenceId, String providerTransactionId,
                            LocalDateTime paidAt, LocalDateTime expiresAt, String failureReason,
                            LocalDateTime createdAt, LocalDateTime updatedAt) {
}
