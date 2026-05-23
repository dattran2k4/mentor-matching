package com.mentormatching.modules.scheduling.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.TimeSlotJpaEntity;

public interface TimeSlotJpaRepository extends JpaRepository<TimeSlotJpaEntity, Long> {

    List<TimeSlotJpaEntity> findByDayOfWeek(Integer dayOfWeek);
}
