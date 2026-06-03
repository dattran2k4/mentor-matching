package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorHighlightJpaEntity;

public interface MentorHighlightJpaRepository extends JpaRepository<MentorHighlightJpaEntity, Long> {

    List<MentorHighlightJpaEntity> findByMentorId(Long mentorId);

    @Query("""
            select highlightOption.id as id,
                   highlightOption.name as name,
                   highlightOption.description as description
            from MentorHighlightJpaEntity mentorHighlight
            join MentorHighlightOptionJpaEntity highlightOption on highlightOption.id = mentorHighlight.highlightOptionId
            where mentorHighlight.mentorId = :mentorId
            order by highlightOption.name
            """)
    List<MentorOptionProjection> findOptionsByMentorId(@Param("mentorId") Long mentorId);
}
