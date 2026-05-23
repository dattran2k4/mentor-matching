package com.mentormatching.modules.review.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.domain.ReviewTagOption;
import com.mentormatching.modules.review.domain.ReviewTagOptionRestoreData;
import com.mentormatching.modules.review.infrastructure.persistence.entity.ReviewTagOptionJpaEntity;

@Component
public class ReviewTagOptionPersistenceMapper {

    public ReviewTagOption toDomain(ReviewTagOptionJpaEntity entity) {
        return ReviewTagOption.restore(new ReviewTagOptionRestoreData(entity.getId(), entity.getName(),
                entity.getDescription(), entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public ReviewTagOptionJpaEntity toEntity(ReviewTagOption reviewTagOption) {
        return ReviewTagOptionJpaEntity.builder()
                .id(reviewTagOption.getId())
                .name(reviewTagOption.getName())
                .description(reviewTagOption.getDescription())
                .createdAt(reviewTagOption.getCreatedAt())
                .updatedAt(reviewTagOption.getUpdatedAt())
                .build();
    }
}
