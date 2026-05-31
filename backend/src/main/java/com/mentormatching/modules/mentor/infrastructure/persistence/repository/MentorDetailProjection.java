package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;

public interface MentorDetailProjection {

    Long getId();

    Long getUserId();

    String getFullName();

    String getAvatarUrl();

    Gender getGender();

    Long getHometownCityId();

    String getHometownCityName();

    Long getCurrentCityId();

    String getCurrentCityName();

    Long getCurrentDistrictId();

    String getCurrentDistrictName();

    String getHeadline();

    String getIntroduction();

    String getTeachingStyle();

    Integer getExperienceYears();

    String getCurrentPosition();

    String getWorkplace();

    String getEducation();

    String getMajor();

    MeetingType getMeetingType();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();
}
