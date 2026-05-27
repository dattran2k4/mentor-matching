package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record MentorAvailabilityRestoreData(Long id, Long mentorId, AvailabilityType availabilityType,
                                            Integer dayOfWeek, LocalDate availableDate, LocalTime startTime,
                                            LocalTime endTime, LocalDateTime createdAt, LocalDateTime updatedAt) {
}
