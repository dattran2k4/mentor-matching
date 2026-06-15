package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;

public record GetMentorCalendarQuery(Long mentorId, LocalDate from, LocalDate to) {
}
