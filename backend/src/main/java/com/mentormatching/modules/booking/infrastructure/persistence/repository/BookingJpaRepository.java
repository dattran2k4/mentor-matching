package com.mentormatching.modules.booking.infrastructure.persistence.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

public interface BookingJpaRepository extends JpaRepository<BookingJpaEntity, Long>, JpaSpecificationExecutor<BookingJpaEntity> {

    List<BookingJpaEntity> findByStudentUserId(Long studentUserId);

    List<BookingJpaEntity> findByMentorId(Long mentorId);

    List<BookingJpaEntity> findByStatus(BookingStatus status);

    Optional<BookingJpaEntity> findByMentorAvailabilityIdAndBookingDate(Long mentorAvailabilityId,
                                                                        LocalDate bookingDate);
}
