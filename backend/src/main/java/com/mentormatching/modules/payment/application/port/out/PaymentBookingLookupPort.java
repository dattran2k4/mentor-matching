package com.mentormatching.modules.payment.application.port.out;

import com.mentormatching.modules.payment.application.dto.PaymentBookingSnapshot;

public interface PaymentBookingLookupPort {

    PaymentBookingSnapshot getBookingSnapshot(Long bookingId);
}
