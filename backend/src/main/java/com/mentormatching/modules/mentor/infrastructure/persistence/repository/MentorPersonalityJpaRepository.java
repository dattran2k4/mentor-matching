package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorPersonalityJpaEntity;

public interface MentorPersonalityJpaRepository extends JpaRepository<MentorPersonalityJpaEntity, Long> {

    List<MentorPersonalityJpaEntity> findByMentorId(Long mentorId);
}
