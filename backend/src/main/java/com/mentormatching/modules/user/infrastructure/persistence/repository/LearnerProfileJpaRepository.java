package com.mentormatching.modules.user.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mentormatching.modules.user.infrastructure.persistence.entity.LearnerProfileJpaEntity;

@Repository
public interface LearnerProfileJpaRepository extends JpaRepository<LearnerProfileJpaEntity, Long> {

    Optional<LearnerProfileJpaEntity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
