package com.mentormatching.modules.payment.presentation;

import com.mentormatching.modules.payment.infrastructure.stripe.StripeWebhookHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/payments/stripe/webhook")
public class StripeWebhookController {

    private static final String STRIPE_SIGNATURE_HEADER = "Stripe-Signature";

    private final StripeWebhookHandler stripeWebhookHandler;

    public StripeWebhookController(StripeWebhookHandler stripeWebhookHandler) {
        this.stripeWebhookHandler = stripeWebhookHandler;
    }

    @PostMapping
    public ResponseEntity<Void> handleStripeWebhook(@RequestBody String payload,
                                                    @RequestHeader(name = STRIPE_SIGNATURE_HEADER, required = false) String signature) {
        log.info("Stripe webhook called");
        stripeWebhookHandler.handle(payload, signature);
        return ResponseEntity.ok().build();
    }
}
