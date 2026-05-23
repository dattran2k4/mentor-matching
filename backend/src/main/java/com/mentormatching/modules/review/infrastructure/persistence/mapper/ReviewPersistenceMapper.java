package com.mentormatching.modules.review.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.domain.Review;
import com.mentormatching.modules.review.domain.ReviewRestoreData;
import com.mentormatching.modules.review.infrastructure.persistence.entity.ReviewJpaEntity;

@Component
public class ReviewPersistenceMapper {

    public Review toDomain(ReviewJpaEntity entity) {
        return Review.restore(new ReviewRestoreData(entity.getId(), entity.getBookingId(), entity.getStudentUserId(),
                entity.getMentorId(), entity.getRating(), entity.getComment(), entity.getCreatedAt(),
                entity.getUpdatedAt()));
    }

    public ReviewJpaEntity toEntity(Review review) {
        return ReviewJpaEntity.builder()
                .id(review.getId())
                .bookingId(review.getBookingId())
                .studentUserId(review.getStudentUserId())
                .mentorId(review.getMentorId())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}
