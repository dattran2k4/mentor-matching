package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;

public interface MentorListItemProjection {

    Long getId();

    Long getUserId();

    String getFullName();

    String getAvatarUrl();

    Gender getGender();

    String getHeadline();

    Integer getExperienceYears();

    String getCurrentPosition();

    String getWorkplace();

    String getEducation();

    String getMajor();

    MeetingType getMeetingType();

    BigDecimal getMinPrice();

    LocalDateTime getCreatedAt();
}
