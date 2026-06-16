package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalTime;

public record MentorCalendarWindowDetail(LocalTime startTime, LocalTime endTime) {
}
