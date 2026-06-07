package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.application.dto.AdminMentorDetail;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;

public record AdminMentorDetailResponse(Long id, Long userId, String fullName, String email, String phone,
                                        String avatarUrl, Gender gender,
                                        MentorDetailResponse.LocationResponse hometown,
                                        MentorDetailResponse.LocationResponse currentLocation, String headline,
                                        String introduction, String teachingStyle, Integer experienceYears,
                                        String currentPosition, String workplace, String education, String major,
                                        MeetingType meetingType, MentorApprovalStatus approvalStatus,
                                        String approvalNote, LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static AdminMentorDetailResponse from(AdminMentorDetail mentor) {
        return new AdminMentorDetailResponse(mentor.id(), mentor.userId(), mentor.fullName(), mentor.email(),
                mentor.phone(), mentor.avatarUrl(), mentor.gender(),
                new MentorDetailResponse.LocationResponse(mentor.hometownCityId(), mentor.hometownCityName(), null,
                        null),
                new MentorDetailResponse.LocationResponse(mentor.currentCityId(), mentor.currentCityName(),
                        mentor.currentDistrictId(), mentor.currentDistrictName()),
                mentor.headline(), mentor.introduction(), mentor.teachingStyle(), mentor.experienceYears(),
                mentor.currentPosition(), mentor.workplace(), mentor.education(), mentor.major(),
                mentor.meetingType(), mentor.approvalStatus(), mentor.approvalNote(), mentor.createdAt(),
                mentor.updatedAt());
    }
}
