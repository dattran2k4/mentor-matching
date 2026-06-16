package com.mentormatching.modules.scheduling.infrastructure.persistence.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.infrastructure.persistence.entity.MentorAvailabilityJpaEntity;

public interface MentorAvailabilityJpaRepository extends JpaRepository<MentorAvailabilityJpaEntity, Long> {

    List<MentorAvailabilityJpaEntity> findByMentorId(Long mentorId);

    List<MentorAvailabilityJpaEntity> findByMentorIdOrderByAvailabilityTypeAscDayOfWeekAscAvailableDateAscStartTimeAsc(Long mentorId);

    //Get available times both RECURRING + SPECIFIC_DATE
    @Query("""
            SELECT availability
            FROM MentorAvailabilityJpaEntity availability
            WHERE availability.mentorId = :mentorId
              AND (
                  availability.availabilityType = com.mentormatching.modules.scheduling.domain.AvailabilityType.RECURRING
                  OR (
                      availability.availabilityType = com.mentormatching.modules.scheduling.domain.AvailabilityType.SPECIFIC_DATE
                      AND availability.availableDate BETWEEN :from AND :to
                  )
              )
            ORDER BY availability.availabilityType ASC,
                     availability.dayOfWeek ASC,
                     availability.availableDate ASC,
                     availability.startTime ASC
            """)
    List<MentorAvailabilityJpaEntity> findCalendarAvailabilities(
            @Param("mentorId") Long mentorId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to);

    List<MentorAvailabilityJpaEntity> findByAvailabilityType(AvailabilityType availabilityType);
}
