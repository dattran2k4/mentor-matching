package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorHighlightOptionJpaEntity;

public interface MentorHighlightOptionJpaRepository extends JpaRepository<MentorHighlightOptionJpaEntity, Long> {
}
