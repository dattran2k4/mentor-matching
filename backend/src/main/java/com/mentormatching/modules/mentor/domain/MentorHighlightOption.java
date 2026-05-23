package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public class MentorHighlightOption {

    private final Long id;
    private String name;
    private String description;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorHighlightOption(MentorHighlightOptionRestoreData data) {
        this.id = data.id();
        this.name = data.name();
        this.description = data.description();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorHighlightOption restore(MentorHighlightOptionRestoreData data) {
        return new MentorHighlightOption(data);
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
