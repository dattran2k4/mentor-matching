package com.mentormatching.modules.booking.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.shared.response.PageResponse;

public interface BookingRepositoryPort {

    Booking save(Booking booking);

    Optional<Booking> findById(Long id);

    PageResponse<Booking> findMyBookings(GetMyBookingsQuery query);

    List<Booking> findByStudentUserId(Long studentUserId);

    List<Booking> findByMentorId(Long mentorId);

    List<Booking> findByStatus(BookingStatus status);
}
