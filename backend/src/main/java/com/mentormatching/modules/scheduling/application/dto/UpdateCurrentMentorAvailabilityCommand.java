package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;

public record UpdateCurrentMentorAvailabilityCommand(Long userId, Long availabilityId,
                                                     AvailabilityType availabilityType, Integer dayOfWeek,
                                                     LocalDate availableDate, LocalTime startTime,
                                                     LocalTime endTime) {
}
