package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public interface AdminMentorVerificationListProjection {

    Long getId();

    Long getMentorId();

    Long getUserId();

    String getAccountFullName();

    String getAccountEmail();

    MentorVerificationStatus getVerificationStatus();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();
}
