package com.mentormatching.modules.payment.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.payment.application.dto.PaymentResult;
import com.mentormatching.modules.payment.application.port.in.CreatePaymentUseCase;
import com.mentormatching.modules.payment.presentation.dto.request.CreatePaymentRequest;
import com.mentormatching.modules.payment.presentation.dto.response.PaymentResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payments")
@Slf4j(topic = "PAYMENT-CONTROLLER")
public class PaymentController {

    private final CreatePaymentUseCase createPaymentUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<PaymentResponse> createPayment(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                      @Valid @RequestBody CreatePaymentRequest request) {
        log.info("Received request to create payment for userId {}", principal.getId());
        PaymentResult payment = createPaymentUseCase.createPayment(request.toCommand(principal));
        return apiResponseFactory.created(PaymentResponse.from(payment), "Create payment successfully");
    }
}
