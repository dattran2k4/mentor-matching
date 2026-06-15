package com.mentormatching.modules.payment.application.port.in;

import com.mentormatching.modules.payment.application.dto.PaymentDetail;

public interface GetPaymentDetailUseCase {

    PaymentDetail getPaymentDetail(Long payerUserId, Long paymentId);
}
