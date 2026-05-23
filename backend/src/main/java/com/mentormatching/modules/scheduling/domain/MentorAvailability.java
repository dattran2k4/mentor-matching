package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDateTime;

public class MentorAvailability {

    private final Long id;
    private final Long mentorId;
    private final Long timeSlotId;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorAvailability(MentorAvailabilityRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.timeSlotId = data.timeSlotId();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorAvailability restore(MentorAvailabilityRestoreData data) {
        return new MentorAvailability(data);
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
