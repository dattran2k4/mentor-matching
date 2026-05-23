package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDateTime;
import java.time.LocalTime;

public record TimeSlotRestoreData(Long id, Integer dayOfWeek, String label, LocalTime startTime, LocalTime endTime,
                                  LocalDateTime createdAt, LocalDateTime updatedAt) {
}
