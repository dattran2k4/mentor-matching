package com.mentormatching.modules.payment.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Payment {

    private final Long id;
    private final Long bookingId;
    private final Long payerUserId;
    private BigDecimal amount;
    private PaymentMethod paymentMethod;
    private PaymentProvider paymentProvider;
    private PaymentStatus status;
    private LocalDateTime paidAt;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Payment(PaymentRestoreData data) {
        this.id = data.id();
        this.bookingId = data.bookingId();
        this.payerUserId = data.payerUserId();
        this.amount = data.amount();
        this.paymentMethod = data.paymentMethod();
        this.paymentProvider = data.paymentProvider();
        this.status = data.status();
        this.paidAt = data.paidAt();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Payment restore(PaymentRestoreData data) {
        return new Payment(data);
    }

    public Long getId() {
        return id;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public Long getPayerUserId() {
        return payerUserId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public PaymentProvider getPaymentProvider() {
        return paymentProvider;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
