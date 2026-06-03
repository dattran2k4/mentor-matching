package com.mentormatching.modules.payment.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.payment.application.port.out.PaymentRepositoryPort;
import com.mentormatching.modules.payment.domain.Payment;
import com.mentormatching.modules.payment.domain.PaymentStatus;
import com.mentormatching.modules.payment.infrastructure.persistence.mapper.PaymentPersistenceMapper;
import com.mentormatching.modules.payment.infrastructure.persistence.repository.PaymentJpaRepository;

@Component
public class PaymentPersistenceAdapter implements PaymentRepositoryPort {

    private final PaymentJpaRepository paymentJpaRepository;
    private final PaymentPersistenceMapper paymentPersistenceMapper;

    public PaymentPersistenceAdapter(PaymentJpaRepository paymentJpaRepository,
                                     PaymentPersistenceMapper paymentPersistenceMapper) {
        this.paymentJpaRepository = paymentJpaRepository;
        this.paymentPersistenceMapper = paymentPersistenceMapper;
    }

    @Override
    public Payment save(Payment payment) {
        return paymentPersistenceMapper.toDomain(paymentJpaRepository.save(paymentPersistenceMapper.toEntity(payment)));
    }

    @Override
    public Optional<Payment> findById(Long id) {
        return paymentJpaRepository.findById(id).map(paymentPersistenceMapper::toDomain);
    }

    @Override
    public Optional<Payment> findByBookingId(Long bookingId) {
        return paymentJpaRepository.findByBookingId(bookingId).map(paymentPersistenceMapper::toDomain);
    }

    @Override
    public Optional<Payment> findByProviderReferenceId(String providerReferenceId) {
        return paymentJpaRepository.findByProviderReferenceId(providerReferenceId)
                .map(paymentPersistenceMapper::toDomain);
    }

    @Override
    public List<Payment> findByPayerUserId(Long payerUserId) {
        return paymentJpaRepository.findByPayerUserId(payerUserId).stream().map(paymentPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<Payment> findByStatus(PaymentStatus status) {
        return paymentJpaRepository.findByStatus(status).stream().map(paymentPersistenceMapper::toDomain).toList();
    }
}
