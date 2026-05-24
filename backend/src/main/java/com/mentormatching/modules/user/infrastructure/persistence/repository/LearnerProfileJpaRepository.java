package com.mentormatching.modules.user.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.user.infrastructure.persistence.entity.LearnerProfileJpaEntity;

public interface LearnerProfileJpaRepository extends JpaRepository<LearnerProfileJpaEntity, Long> {

    Optional<LearnerProfileJpaEntity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
