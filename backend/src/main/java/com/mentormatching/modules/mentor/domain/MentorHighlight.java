package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public class MentorHighlight {

    private final Long id;
    private final Long mentorId;
    private final Long highlightOptionId;
    private final LocalDateTime createdAt;

    private MentorHighlight(MentorHighlightRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.highlightOptionId = data.highlightOptionId();
        this.createdAt = data.createdAt();
    }

    public static MentorHighlight restore(MentorHighlightRestoreData data) {
        return new MentorHighlight(data);
    }

    public static MentorHighlight create(Long mentorId, Long highlightOptionId) {
        return new MentorHighlight(new MentorHighlightRestoreData(null, mentorId, highlightOptionId, null));
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getHighlightOptionId() {
        return highlightOptionId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
