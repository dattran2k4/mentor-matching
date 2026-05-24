package com.mentormatching.modules.booking.application.service;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.booking.application.dto.CreateBookingCommand;
import com.mentormatching.modules.booking.application.port.in.CreateBookingUseCase;
import com.mentormatching.modules.booking.application.port.out.BookingRepositoryPort;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingCreateData;

@Service
public class BookingService implements CreateBookingUseCase {

    private final BookingRepositoryPort bookingRepositoryPort;

    public BookingService(BookingRepositoryPort bookingRepositoryPort) {
        this.bookingRepositoryPort = bookingRepositoryPort;
    }

    @Override
    public Long createBooking(CreateBookingCommand command) {
        Booking booking = Booking.create(new BookingCreateData(command.studentUserId(), command.mentorId(),
                command.mentorSubjectId(), command.mentorAvailabilityId(), command.bookingDate(),
                command.meetingType(), command.note()));

        Booking savedBooking = bookingRepositoryPort.save(booking);
        return savedBooking.getId();
    }
}
