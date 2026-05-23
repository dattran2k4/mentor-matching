package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public class MentorPersonality {

    private final Long id;
    private final Long mentorId;
    private final Long personalityOptionId;
    private final LocalDateTime createdAt;

    private MentorPersonality(MentorPersonalityRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.personalityOptionId = data.personalityOptionId();
        this.createdAt = data.createdAt();
    }

    public static MentorPersonality restore(MentorPersonalityRestoreData data) {
        return new MentorPersonality(data);
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getPersonalityOptionId() {
        return personalityOptionId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
