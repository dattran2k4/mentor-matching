package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public interface AdminMentorVerificationDetailProjection {

    Long getId();

    Long getMentorId();

    Long getUserId();

    String getAccountFullName();

    String getAccountEmail();

    String getAccountPhone();

    MentorApprovalStatus getApprovalStatus();

    String getApprovalNote();

    String getFullName();

    String getIdCardNumber();

    String getIdCardFrontUrl();

    String getIdCardBackUrl();

    String getSelfieWithIdUrl();

    MentorVerificationStatus getVerificationStatus();

    Long getVerifiedBy();

    LocalDateTime getVerifiedAt();

    String getRejectionReason();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();
}
