package com.mentormatching.modules.scheduling.presentation.dto.response;

import java.time.LocalTime;

import com.mentormatching.modules.scheduling.application.dto.MentorCalendarWindowDetail;

public record MentorCalendarWindowResponse(LocalTime startTime, LocalTime endTime) {

    public static MentorCalendarWindowResponse from(MentorCalendarWindowDetail window) {
        return new MentorCalendarWindowResponse(window.startTime(), window.endTime());
    }
}
