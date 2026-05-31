package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;

public record MentorListItem(Long id, Long userId, String fullName, String avatarUrl, Gender gender,
                             String headline, Integer experienceYears, String currentPosition,
                             String workplace, String education, String major, MeetingType meetingType,
                             LocalDateTime createdAt) {
}
