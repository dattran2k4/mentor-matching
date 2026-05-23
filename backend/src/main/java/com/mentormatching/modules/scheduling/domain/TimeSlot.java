package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class TimeSlot {

    private final Long id;
    private Integer dayOfWeek;
    private String label;
    private LocalTime startTime;
    private LocalTime endTime;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private TimeSlot(TimeSlotRestoreData data) {
        this.id = data.id();
        this.dayOfWeek = data.dayOfWeek();
        this.label = data.label();
        this.startTime = data.startTime();
        this.endTime = data.endTime();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static TimeSlot restore(TimeSlotRestoreData data) {
        return new TimeSlot(data);
    }

    public Long getId() {
        return id;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public String getLabel() {
        return label;
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
