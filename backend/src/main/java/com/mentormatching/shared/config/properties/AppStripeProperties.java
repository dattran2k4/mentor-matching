package com.mentormatching.shared.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.stripe")
public record AppStripeProperties(String secretKey, String webhookSecret, String successUrl, String cancelUrl,
                                  String currency) {

    public AppStripeProperties {
        secretKey = secretKey == null ? "" : secretKey;
        webhookSecret = webhookSecret == null ? "" : webhookSecret;
        successUrl = successUrl == null ? "http://localhost:5173/payment/success" : successUrl;
        cancelUrl = cancelUrl == null ? "http://localhost:5173/payment/cancel" : cancelUrl;
        currency = currency == null || currency.isBlank() ? "vnd" : currency.toLowerCase();
    }
}
