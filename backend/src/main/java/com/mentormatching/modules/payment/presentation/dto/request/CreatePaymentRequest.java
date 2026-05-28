package com.mentormatching.modules.payment.presentation.dto.request;

import com.mentormatching.modules.payment.application.dto.CreatePaymentCommand;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record CreatePaymentRequest(@NotNull(message = "Booking id is required") Long bookingId) {

    public CreatePaymentCommand toCommand(AuthenticatedPrincipal principal) {
        return new CreatePaymentCommand(bookingId, principal.getId());
    }
}
