package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.application.dto.MentorDetail;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;

public record MentorDetailResponse(Long id, Long userId, String fullName, String avatarUrl, Gender gender,
                                   LocationResponse hometown, LocationResponse currentLocation, String headline,
                                   String introduction, String teachingStyle, Integer experienceYears,
                                   String currentPosition, String workplace, String education, String major,
                                   MeetingType meetingType, LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static MentorDetailResponse from(MentorDetail mentor) {
        return new MentorDetailResponse(mentor.id(), mentor.userId(), mentor.fullName(), mentor.avatarUrl(),
                mentor.gender(), new LocationResponse(mentor.hometownCityId(), mentor.hometownCityName(), null, null),
                new LocationResponse(mentor.currentCityId(), mentor.currentCityName(), mentor.currentDistrictId(),
                        mentor.currentDistrictName()),
                mentor.headline(), mentor.introduction(), mentor.teachingStyle(), mentor.experienceYears(),
                mentor.currentPosition(), mentor.workplace(), mentor.education(), mentor.major(),
                mentor.meetingType(), mentor.createdAt(), mentor.updatedAt());
    }

    public record LocationResponse(Long cityId, String cityName, Long districtId, String districtName) {
    }
}
