package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorHighlightJpaEntity;

public interface MentorHighlightJpaRepository extends JpaRepository<MentorHighlightJpaEntity, Long> {

    List<MentorHighlightJpaEntity> findByMentorId(Long mentorId);
}
