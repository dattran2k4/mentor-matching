package com.mentormatching.modules.payment.application.port.in;

import com.mentormatching.modules.payment.application.dto.HandleStripeWebhookCommand;

public interface HandleStripeWebhookUseCase {

    void handleWebhookStripe(HandleStripeWebhookCommand command);
}
