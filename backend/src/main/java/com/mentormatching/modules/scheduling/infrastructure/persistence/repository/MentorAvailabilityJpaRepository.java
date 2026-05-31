package com.mentormatching.modules.scheduling.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.MentorAvailabilityJpaEntity;

public interface MentorAvailabilityJpaRepository extends JpaRepository<MentorAvailabilityJpaEntity, Long> {

    List<MentorAvailabilityJpaEntity> findByMentorId(Long mentorId);

    List<MentorAvailabilityJpaEntity> findByMentorIdOrderByAvailabilityTypeAscDayOfWeekAscAvailableDateAscStartTimeAsc(Long mentorId);

    List<MentorAvailabilityJpaEntity> findByAvailabilityType(AvailabilityType availabilityType);
}
