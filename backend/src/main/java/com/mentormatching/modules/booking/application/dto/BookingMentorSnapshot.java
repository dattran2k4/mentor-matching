package com.mentormatching.modules.booking.application.dto;

import com.mentormatching.modules.mentor.domain.MeetingType;

public record BookingMentorSnapshot(Long mentorId, Long userId, String fullName, MeetingType meetingType) {
}
