package com.mentormatching.modules.payment.infrastructure.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.payment.domain.PaymentStatus;
import com.mentormatching.modules.payment.infrastructure.persistence.entity.PaymentJpaEntity;

public interface PaymentJpaRepository extends JpaRepository<PaymentJpaEntity, Long> {

    Optional<PaymentJpaEntity> findByBookingId(Long bookingId);

    Optional<PaymentJpaEntity> findByProviderReferenceId(String providerReferenceId);

    List<PaymentJpaEntity> findByPayerUserId(Long payerUserId);

    List<PaymentJpaEntity> findByStatus(PaymentStatus status);
}
