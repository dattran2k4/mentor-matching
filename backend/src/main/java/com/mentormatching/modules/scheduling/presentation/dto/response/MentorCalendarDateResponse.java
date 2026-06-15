package com.mentormatching.modules.scheduling.presentation.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDateDetail;

public record MentorCalendarDateResponse(LocalDate date, List<MentorCalendarWindowResponse> availableWindows) {

    public static MentorCalendarDateResponse from(MentorCalendarDateDetail date) {
        return new MentorCalendarDateResponse(date.date(),
                date.availableWindows().stream().map(MentorCalendarWindowResponse::from).toList());
    }
}
