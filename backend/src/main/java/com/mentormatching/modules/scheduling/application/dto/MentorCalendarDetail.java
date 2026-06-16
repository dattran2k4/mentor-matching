package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;
import java.util.List;

public record MentorCalendarDetail(Long mentorId, LocalDate from, LocalDate to,
                                   List<MentorCalendarDateDetail> dates) {
}
