package com.mentormatching.modules.payment.presentation.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.payment.application.dto.PaymentDetail;
import com.mentormatching.modules.payment.domain.PaymentStatus;

public record PaymentDetailResponse(Long id, Long bookingId, BigDecimal amount, PaymentStatus status,
                                    BookingStatus bookingStatus, String providerReferenceId,
                                    String providerTransactionId, LocalDateTime paidAt, LocalDateTime expiresAt,
                                    String failureReason, LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static PaymentDetailResponse from(PaymentDetail detail) {
        return new PaymentDetailResponse(detail.id(), detail.bookingId(), detail.amount(), detail.status(),
                detail.bookingStatus(), detail.providerReferenceId(), detail.providerTransactionId(), detail.paidAt(),
                detail.expiresAt(), detail.failureReason(), detail.createdAt(), detail.updatedAt());
    }
}
