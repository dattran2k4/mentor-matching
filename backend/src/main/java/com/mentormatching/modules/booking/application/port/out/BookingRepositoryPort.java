package com.mentormatching.modules.booking.application.port.out;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.booking.application.dto.GetBookingsQuery;
import com.mentormatching.modules.booking.application.dto.GetMentorBookingsQuery;
import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.shared.response.PageResponse;

public interface BookingRepositoryPort {

    Booking save(Booking booking);

    Optional<Booking> findById(Long id);

    PageResponse<Booking> findBookings(GetBookingsQuery query);

    PageResponse<Booking> findMyBookings(GetMyBookingsQuery query);

    PageResponse<Booking> findMentorBookings(Long mentorId, GetMentorBookingsQuery query);

    List<Booking> findByStudentUserId(Long studentUserId);

    List<Booking> findByMentorId(Long mentorId);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findScheduleBlockingBookings(Long mentorId, LocalDate from, LocalDate to,
            List<BookingStatus> statuses);

    boolean existsOverlappingBooking(Long mentorId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime,
                                     List<BookingStatus> statuses);
}
