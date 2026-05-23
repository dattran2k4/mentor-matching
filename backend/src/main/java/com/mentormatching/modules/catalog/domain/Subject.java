package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public class Subject {

    private final Long id;
    private final Long categoryId;
    private String name;
    private String description;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Subject(SubjectRestoreData data) {
        this.id = data.id();
        this.categoryId = data.categoryId();
        this.name = data.name();
        this.description = data.description();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Subject restore(SubjectRestoreData data) {
        return new Subject(data);
    }

    public Long getId() {
        return id;
    }

    public Long getCategoryId() {
        return categoryId;
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
