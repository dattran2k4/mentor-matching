package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public class Grade {

    private final Long id;
    private String name;
    private GradeLevelGroup levelGroup;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Grade(GradeRestoreData data) {
        this.id = data.id();
        this.name = data.name();
        this.levelGroup = data.levelGroup();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Grade restore(GradeRestoreData data) {
        return new Grade(data);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public GradeLevelGroup getLevelGroup() {
        return levelGroup;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
