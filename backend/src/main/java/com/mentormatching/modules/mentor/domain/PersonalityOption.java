package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public class PersonalityOption {

    private final Long id;
    private String name;
    private String description;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private PersonalityOption(PersonalityOptionRestoreData data) {
        this.id = data.id();
        this.name = data.name();
        this.description = data.description();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static PersonalityOption restore(PersonalityOptionRestoreData data) {
        return new PersonalityOption(data);
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
