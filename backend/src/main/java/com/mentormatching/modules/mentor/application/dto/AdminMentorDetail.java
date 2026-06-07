package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;

public record AdminMentorDetail(Long id, Long userId, String fullName, String email, String phone,
                                String avatarUrl, Gender gender, Long hometownCityId, String hometownCityName,
                                Long currentCityId, String currentCityName, Long currentDistrictId,
                                String currentDistrictName, String headline, String introduction,
                                String teachingStyle, Integer experienceYears, String currentPosition,
                                String workplace, String education, String major, MeetingType meetingType,
                                MentorApprovalStatus approvalStatus, String approvalNote,
                                LocalDateTime createdAt, LocalDateTime updatedAt) {
}
