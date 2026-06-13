package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;

public record CurrentMentorAvailabilityDetail(Long id, AvailabilityType availabilityType, Integer dayOfWeek,
                                              LocalDate availableDate, LocalTime startTime, LocalTime endTime) {
}
