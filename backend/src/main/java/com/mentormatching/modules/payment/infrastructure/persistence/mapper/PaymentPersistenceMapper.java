package com.mentormatching.modules.payment.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.payment.domain.Payment;
import com.mentormatching.modules.payment.domain.PaymentRestoreData;
import com.mentormatching.modules.payment.infrastructure.persistence.entity.PaymentJpaEntity;

@Component
public class PaymentPersistenceMapper {

    public Payment toDomain(PaymentJpaEntity entity) {
        return Payment.restore(new PaymentRestoreData(entity.getId(), entity.getBookingId(), entity.getPayerUserId(),
                entity.getAmount(), entity.getPaymentMethod(), entity.getPaymentProvider(), entity.getStatus(),
                entity.getPaidAt(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public PaymentJpaEntity toEntity(Payment payment) {
        return PaymentJpaEntity.builder()
                .id(payment.getId())
                .bookingId(payment.getBookingId())
                .payerUserId(payment.getPayerUserId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentProvider(payment.getPaymentProvider())
                .status(payment.getStatus())
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }
}
