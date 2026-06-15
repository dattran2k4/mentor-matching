package com.mentormatching.modules.booking.infrastructure.persistence.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

public interface BookingJpaRepository extends JpaRepository<BookingJpaEntity, Long>, JpaSpecificationExecutor<BookingJpaEntity> {

    List<BookingJpaEntity> findByStudentUserId(Long studentUserId);

    List<BookingJpaEntity> findByMentorId(Long mentorId);

    List<BookingJpaEntity> findByStatus(BookingStatus status);

    @Query("""
            select booking
            from BookingJpaEntity booking
            where booking.mentorId = :mentorId
              and booking.bookingDate between :from and :to
              and booking.status in :statuses
            order by booking.bookingDate asc, booking.startTime asc
            """)
    List<BookingJpaEntity> findScheduleBlockingBookings(@Param("mentorId") Long mentorId,
                                                        @Param("from") LocalDate from,
                                                        @Param("to") LocalDate to,
                                                        @Param("statuses") List<BookingStatus> statuses);

    @Query("""
            select count(booking) > 0
            from BookingJpaEntity booking
            where booking.mentorId = :mentorId
              and booking.bookingDate = :bookingDate
              and booking.status in :statuses
              and booking.startTime < :endTime
              and booking.endTime > :startTime
            """)
    boolean existsOverlappingBooking(@Param("mentorId") Long mentorId,
                                     @Param("bookingDate") LocalDate bookingDate,
                                     @Param("startTime") LocalTime startTime,
                                     @Param("endTime") LocalTime endTime,
                                     @Param("statuses") List<BookingStatus> statuses);
}
