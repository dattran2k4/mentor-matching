package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorPersonalityJpaEntity;

public interface MentorPersonalityJpaRepository extends JpaRepository<MentorPersonalityJpaEntity, Long> {

    List<MentorPersonalityJpaEntity> findByMentorId(Long mentorId);

    void deleteByMentorId(Long mentorId);

    @Query("""
            select personalityOption.id as id,
                   personalityOption.name as name,
                   personalityOption.description as description
            from MentorPersonalityJpaEntity mentorPersonality
            join PersonalityOptionJpaEntity personalityOption on personalityOption.id = mentorPersonality.personalityOptionId
            where mentorPersonality.mentorId = :mentorId
            order by personalityOption.name
            """)
    List<MentorOptionProjection> findOptionsByMentorId(@Param("mentorId") Long mentorId);
}
