package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class MentorAvailability {

    private final Long id;
    private final Long mentorId;
    private AvailabilityType availabilityType;
    private Integer dayOfWeek;
    private LocalDate availableDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorAvailability(MentorAvailabilityRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.availabilityType = data.availabilityType();
        this.dayOfWeek = data.dayOfWeek();
        this.availableDate = data.availableDate();
        this.startTime = data.startTime();
        this.endTime = data.endTime();
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

    public AvailabilityType getAvailabilityType() {
        return availabilityType;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public LocalDate getAvailableDate() {
        return availableDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
