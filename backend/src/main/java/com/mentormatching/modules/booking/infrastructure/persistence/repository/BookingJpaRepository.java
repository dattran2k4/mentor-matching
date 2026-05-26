package com.mentormatching.modules.booking.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

public interface BookingJpaRepository extends JpaRepository<BookingJpaEntity, Long>, JpaSpecificationExecutor<BookingJpaEntity> {

    List<BookingJpaEntity> findByStudentUserId(Long studentUserId);

    List<BookingJpaEntity> findByMentorId(Long mentorId);

    List<BookingJpaEntity> findByStatus(BookingStatus status);
}
