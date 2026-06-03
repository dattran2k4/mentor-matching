package com.mentormatching.modules.payment.application.dto;

public record HandleStripeWebhookCommand(String eventId, String eventType, String providerReferenceId,
                                         String providerTransactionId, String failureReason) {

    public static final String CHECKOUT_SESSION_COMPLETED = "checkout.session.completed";
}
