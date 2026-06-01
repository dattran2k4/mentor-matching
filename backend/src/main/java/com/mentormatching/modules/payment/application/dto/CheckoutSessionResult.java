package com.mentormatching.modules.payment.application.dto;

import java.time.LocalDateTime;

public record CheckoutSessionResult(String providerReferenceId, String checkoutUrl, LocalDateTime expiresAt) {
}
