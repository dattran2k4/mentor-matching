package com.mentormatching.modules.scheduling.presentation.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;

public record MentorCalendarResponse(Long mentorId, LocalDate from, LocalDate to,
                                     List<MentorCalendarDateResponse> dates) {

    public static MentorCalendarResponse from(MentorCalendarDetail calendar) {
        return new MentorCalendarResponse(calendar.mentorId(), calendar.from(), calendar.to(),
                calendar.dates().stream().map(MentorCalendarDateResponse::from).toList());
    }
}
