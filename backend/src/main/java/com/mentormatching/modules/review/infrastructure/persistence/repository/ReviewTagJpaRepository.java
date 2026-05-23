package com.mentormatching.modules.review.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.review.infrastructure.persistence.entity.ReviewTagJpaEntity;

public interface ReviewTagJpaRepository extends JpaRepository<ReviewTagJpaEntity, Long> {

    List<ReviewTagJpaEntity> findByReviewId(Long reviewId);

    List<ReviewTagJpaEntity> findByReviewTagOptionId(Long reviewTagOptionId);
}
