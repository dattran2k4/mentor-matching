package com.mentormatching.modules.payment.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.modules.payment.domain.Payment;
import com.mentormatching.modules.payment.domain.PaymentMethod;
import com.mentormatching.modules.payment.domain.PaymentProvider;
import com.mentormatching.modules.payment.domain.PaymentStatus;

public record PaymentResult(Long id, Long bookingId, Long payerUserId, BigDecimal amount,
                            PaymentMethod paymentMethod, PaymentProvider paymentProvider, PaymentStatus status,
                            String checkoutUrl, LocalDateTime expiresAt) {

    public static PaymentResult from(Payment payment) {
        return new PaymentResult(payment.getId(), payment.getBookingId(), payment.getPayerUserId(),
                payment.getAmount(), payment.getPaymentMethod(), payment.getPaymentProvider(), payment.getStatus(),
                payment.getCheckoutUrl(), payment.getExpiresAt());
    }
}
