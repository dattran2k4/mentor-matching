package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.PersonalityOptionJpaEntity;

public interface PersonalityOptionJpaRepository extends JpaRepository<PersonalityOptionJpaEntity, Long> {
}
