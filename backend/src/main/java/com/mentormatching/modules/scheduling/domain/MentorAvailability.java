package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.mentormatching.shared.exception.InvalidDataException;

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

    public static MentorAvailability create(Long mentorId, AvailabilityType availabilityType, Integer dayOfWeek,
                                            LocalDate availableDate, LocalTime startTime, LocalTime endTime) {
        validateCreateData(mentorId, availabilityType, dayOfWeek, availableDate, startTime, endTime);
        LocalDateTime now = LocalDateTime.now();
        return new MentorAvailability(new MentorAvailabilityRestoreData(null, mentorId, availabilityType, dayOfWeek,
                availableDate, startTime, endTime, now, now));
    }

    public void update(AvailabilityType availabilityType, Integer dayOfWeek, LocalDate availableDate,
                       LocalTime startTime, LocalTime endTime) {
        validateCreateData(mentorId, availabilityType, dayOfWeek, availableDate, startTime, endTime);
        this.availabilityType = availabilityType;
        this.dayOfWeek = dayOfWeek;
        this.availableDate = availableDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.updatedAt = LocalDateTime.now();
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

    private static void validateCreateData(Long mentorId, AvailabilityType availabilityType, Integer dayOfWeek,
                                           LocalDate availableDate, LocalTime startTime, LocalTime endTime) {
        if (mentorId == null) {
            throw new InvalidDataException("Mentor id is required");
        }
        if (availabilityType == null) {
            throw new InvalidDataException("Availability type is required");
        }
        if (startTime == null) {
            throw new InvalidDataException("Start time is required");
        }
        if (endTime == null) {
            throw new InvalidDataException("End time is required");
        }
        if (!endTime.isAfter(startTime)) {
            throw new InvalidDataException("End time must be after start time");
        }
        if (availabilityType == AvailabilityType.RECURRING) {
            if (dayOfWeek == null) {
                throw new InvalidDataException("Day of week is required for recurring availability");
            }
            if (dayOfWeek < 1 || dayOfWeek > 7) {
                throw new InvalidDataException("Day of week must be between 1 and 7");
            }
            if (availableDate != null) {
                throw new InvalidDataException("Available date must be null for recurring availability");
            }
            return;
        }
        if (availableDate == null) {
            throw new InvalidDataException("Available date is required for specific-date availability");
        }
        if (dayOfWeek != null) {
            throw new InvalidDataException("Day of week must be null for specific-date availability");
        }
    }
}
