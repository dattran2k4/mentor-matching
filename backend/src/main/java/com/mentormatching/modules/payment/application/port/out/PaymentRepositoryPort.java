package com.mentormatching.modules.payment.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.payment.domain.Payment;
import com.mentormatching.modules.payment.domain.PaymentStatus;

public interface PaymentRepositoryPort {

    Payment save(Payment payment);

    Optional<Payment> findById(Long id);

    Optional<Payment> findByBookingId(Long bookingId);

    List<Payment> findByPayerUserId(Long payerUserId);

    List<Payment> findByStatus(PaymentStatus status);
}
