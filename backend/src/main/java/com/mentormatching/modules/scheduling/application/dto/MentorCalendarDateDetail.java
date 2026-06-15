package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;
import java.util.List;

public record MentorCalendarDateDetail(LocalDate date, List<MentorCalendarWindowDetail> availableWindows) {
}
