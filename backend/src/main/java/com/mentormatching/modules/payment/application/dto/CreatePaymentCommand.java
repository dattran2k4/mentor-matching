package com.mentormatching.modules.payment.application.dto;

public record CreatePaymentCommand(Long bookingId, Long payerUserId) {
}
