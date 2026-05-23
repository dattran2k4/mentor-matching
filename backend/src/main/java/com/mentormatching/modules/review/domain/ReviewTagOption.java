package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public class ReviewTagOption {

    private final Long id;
    private String name;
    private String description;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private ReviewTagOption(ReviewTagOptionRestoreData data) {
        this.id = data.id();
        this.name = data.name();
        this.description = data.description();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static ReviewTagOption restore(ReviewTagOptionRestoreData data) {
        return new ReviewTagOption(data);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
