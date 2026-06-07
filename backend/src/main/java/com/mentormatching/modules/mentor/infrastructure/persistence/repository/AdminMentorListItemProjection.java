package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;

public interface AdminMentorListItemProjection {

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

    MentorApprovalStatus getApprovalStatus();

    BigDecimal getMinPrice();

    LocalDateTime getCreatedAt();
}
