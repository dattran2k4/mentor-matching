package com.mentormatching.modules.payment.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.dto.BookingPaymentSummary;
import com.mentormatching.modules.booking.application.port.in.GetBookingPaymentSummaryUseCase;
import com.mentormatching.modules.payment.application.dto.PaymentBookingSnapshot;
import com.mentormatching.modules.payment.application.port.out.PaymentBookingLookupPort;

@Component
public class PaymentBookingLookupAdapter implements PaymentBookingLookupPort {

    private final GetBookingPaymentSummaryUseCase getBookingPaymentSummaryUseCase;

    public PaymentBookingLookupAdapter(GetBookingPaymentSummaryUseCase getBookingPaymentSummaryUseCase) {
        this.getBookingPaymentSummaryUseCase = getBookingPaymentSummaryUseCase;
    }

    @Override
    public PaymentBookingSnapshot getBookingSnapshot(Long bookingId) {
        BookingPaymentSummary booking = getBookingPaymentSummaryUseCase.getBookingPaymentSummary(bookingId);
        return new PaymentBookingSnapshot(booking.bookingId(), booking.studentUserId(), booking.totalAmount(),
                booking.status());
    }
}
