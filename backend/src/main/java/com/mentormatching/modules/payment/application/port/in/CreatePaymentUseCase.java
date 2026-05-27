package com.mentormatching.modules.payment.application.port.in;

import com.mentormatching.modules.payment.application.dto.CreatePaymentCommand;
import com.mentormatching.modules.payment.application.dto.PaymentResult;

public interface CreatePaymentUseCase {

    PaymentResult createPayment(CreatePaymentCommand command);
}
