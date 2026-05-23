package com.mentormatching.modules.review.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.domain.ReviewTag;
import com.mentormatching.modules.review.domain.ReviewTagRestoreData;
import com.mentormatching.modules.review.infrastructure.persistence.entity.ReviewTagJpaEntity;

@Component
public class ReviewTagPersistenceMapper {

    public ReviewTag toDomain(ReviewTagJpaEntity entity) {
        return ReviewTag.restore(new ReviewTagRestoreData(entity.getId(), entity.getReviewId(),
                entity.getReviewTagOptionId(), entity.getCreatedAt()));
    }

    public ReviewTagJpaEntity toEntity(ReviewTag reviewTag) {
        return ReviewTagJpaEntity.builder()
                .id(reviewTag.getId())
                .reviewId(reviewTag.getReviewId())
                .reviewTagOptionId(reviewTag.getReviewTagOptionId())
                .createdAt(reviewTag.getCreatedAt())
                .build();
    }
}
