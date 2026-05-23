package com.mentormatching.modules.booking.application.port.out;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;

public interface BookingRepositoryPort {

    Booking save(Booking booking);

    Optional<Booking> findById(Long id);

    List<Booking> findByStudentUserId(Long studentUserId);

    List<Booking> findByMentorId(Long mentorId);

    List<Booking> findByStatus(BookingStatus status);

    Optional<Booking> findByMentorAvailabilityIdAndBookingDate(Long mentorAvailabilityId, LocalDate bookingDate);
}
