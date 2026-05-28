package com.mentormatching.modules.mentor.application.dto;

import com.mentormatching.modules.mentor.domain.MeetingType;

public record MentorSummary(Long mentorId, Long userId, MeetingType meetingType) {
}
