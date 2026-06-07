package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;

public interface AdminMentorDetailProjection {

    Long getId();

    Long getUserId();

    String getFullName();

    String getEmail();

    String getPhone();

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

    MentorApprovalStatus getApprovalStatus();

    String getApprovalNote();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();
}
