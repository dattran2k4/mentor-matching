package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mentormatching.modules.scheduling.domain.AvailabilityType;

public record MentorAvailabilityDetail(Long id, AvailabilityType availabilityType, Integer dayOfWeek,
                                       LocalDate availableDate, LocalTime startTime, LocalTime endTime) {
}
