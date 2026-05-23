package com.mentormatching.modules.payment.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentRestoreData(Long id, Long bookingId, Long payerUserId, BigDecimal amount,
                                 PaymentMethod paymentMethod, PaymentProvider paymentProvider,
                                 PaymentStatus status, LocalDateTime paidAt,
                                 LocalDateTime createdAt, LocalDateTime updatedAt) {
}
