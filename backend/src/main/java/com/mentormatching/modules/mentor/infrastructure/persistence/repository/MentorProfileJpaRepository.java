package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorProfileJpaEntity;

public interface MentorProfileJpaRepository extends JpaRepository<MentorProfileJpaEntity, Long> {

    Optional<MentorProfileJpaEntity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
