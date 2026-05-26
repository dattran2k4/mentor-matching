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
    private String providerReferenceId;
    private String providerTransactionId;
    private String checkoutUrl;
    private LocalDateTime expiresAt;
    private String failureReason;
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
        this.providerReferenceId = data.providerReferenceId();
        this.providerTransactionId = data.providerTransactionId();
        this.checkoutUrl = data.checkoutUrl();
        this.expiresAt = data.expiresAt();
        this.failureReason = data.failureReason();
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

    public String getProviderReferenceId() {
        return providerReferenceId;
    }

    public String getProviderTransactionId() {
        return providerTransactionId;
    }

    public String getCheckoutUrl() {
        return checkoutUrl;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
