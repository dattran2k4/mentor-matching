package com.mentormatching.modules.review.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.review.infrastructure.persistence.entity.ReviewTagOptionJpaEntity;

public interface ReviewTagOptionJpaRepository extends JpaRepository<ReviewTagOptionJpaEntity, Long> {
}
