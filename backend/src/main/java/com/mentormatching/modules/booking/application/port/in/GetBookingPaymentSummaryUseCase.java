package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.BookingPaymentSummary;

public interface GetBookingPaymentSummaryUseCase {

    BookingPaymentSummary getBookingPaymentSummary(Long bookingId);
}
