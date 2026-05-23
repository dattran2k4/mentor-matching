package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public class ReviewTag {

    private final Long id;
    private final Long reviewId;
    private final Long reviewTagOptionId;
    private final LocalDateTime createdAt;

    private ReviewTag(ReviewTagRestoreData data) {
        this.id = data.id();
        this.reviewId = data.reviewId();
        this.reviewTagOptionId = data.reviewTagOptionId();
        this.createdAt = data.createdAt();
    }

    public static ReviewTag restore(ReviewTagRestoreData data) {
        return new ReviewTag(data);
    }

    public Long getId() {
        return id;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public Long getReviewTagOptionId() {
        return reviewTagOptionId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
