package com.mentormatching.modules.payment.infrastructure.stripe;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.payment.application.dto.HandleStripeWebhookCommand;
import com.mentormatching.modules.payment.application.port.in.HandleStripeWebhookUseCase;
import com.mentormatching.shared.config.properties.AppStripeProperties;
import com.mentormatching.shared.exception.InvalidDataException;
import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Slf4j
public class StripeWebhookHandler {

    private final AppStripeProperties stripeProperties;
    private final HandleStripeWebhookUseCase handleStripeWebhookUseCase;

    public void handle(String payload, String signature) {
        Event event = constructEvent(payload, signature);

        if (HandleStripeWebhookCommand.CHECKOUT_SESSION_COMPLETED.equals(event.getType())) {
            handleCheckoutSessionCompleted(event);
        }
    }

    //Verify webhook + extract event
    private Event constructEvent(String payload, String signature) {
        if (signature == null || signature.isBlank()) {
            throw new InvalidDataException("Stripe signature is required");
        }
        if (stripeProperties.webhookSecret().isBlank()) {
            throw new IllegalStateException("Stripe webhook secret is not configured");
        }

        try {
            return Webhook.constructEvent(payload, signature, stripeProperties.webhookSecret());
        } catch (SignatureVerificationException ex) {
            throw new InvalidDataException("Invalid Stripe webhook signature");
        } catch (RuntimeException ex) {
            throw new InvalidDataException("Invalid Stripe webhook payload");
        }
    }

    private void handleCheckoutSessionCompleted(Event event) {
        Session session = extractCheckoutSession(event);

        //Call handle stripe webhook use case (application)
        handleStripeWebhookUseCase.handleWebhookStripe(new HandleStripeWebhookCommand(
                event.getId(),
                event.getType(),
                session.getId(),
                session.getPaymentIntent(),
                null));
    }

    private Session extractCheckoutSession(Event event) {
        Optional<StripeObject> stripeObject = event.getDataObjectDeserializer().getObject();
        StripeObject checkoutSession = stripeObject.orElseGet(() -> deserializeUnsafe(event));

        if (!(checkoutSession instanceof Session session)) {
            throw new InvalidDataException("Stripe webhook payload is not a checkout session");
        }
        return session;
    }

    //Deserialize không an toàn nếu null
    private StripeObject deserializeUnsafe(Event event) {
        try {
            return event.getDataObjectDeserializer().deserializeUnsafe();
        } catch (EventDataObjectDeserializationException ex) {
            throw new InvalidDataException("Unable to deserialize Stripe checkout session");
        }
    }
}
