package com.mentormatching.modules.payment.infrastructure.booking;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.port.out.BookingRepositoryPort;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.payment.application.port.out.BookingConfirmationPort;
import com.mentormatching.shared.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Slf4j
public class BookingConfirmationAdapter implements BookingConfirmationPort {

    private final BookingRepositoryPort bookingRepositoryPort;

    @Override
    public void confirmBooking(Long bookingId) {
        Booking booking = bookingRepositoryPort.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.confirm();
        bookingRepositoryPort.save(booking);
        log.info("Confirmed for bookingId = {}", booking.getId());
    }
}
