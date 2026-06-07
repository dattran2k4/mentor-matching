package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public record AdminMentorVerificationDetailResponse(Long id, Long mentorId, Long userId, String accountFullName,
                                                    String accountEmail, String accountPhone,
                                                    MentorApprovalStatus approvalStatus, String approvalNote,
                                                    String fullName, String idCardNumber, String idCardFrontUrl,
                                                    String idCardBackUrl, String selfieWithIdUrl,
                                                    MentorVerificationStatus verificationStatus, Long verifiedBy,
                                                    LocalDateTime verifiedAt, String rejectionReason,
                                                    LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static AdminMentorVerificationDetailResponse from(AdminMentorVerificationDetail verification) {
        return new AdminMentorVerificationDetailResponse(verification.id(), verification.mentorId(),
                verification.userId(), verification.accountFullName(), verification.accountEmail(),
                verification.accountPhone(), verification.approvalStatus(), verification.approvalNote(),
                verification.fullName(), verification.idCardNumber(), verification.idCardFrontUrl(),
                verification.idCardBackUrl(), verification.selfieWithIdUrl(),
                verification.verificationStatus(), verification.verifiedBy(), verification.verifiedAt(),
                verification.rejectionReason(), verification.createdAt(), verification.updatedAt());
    }
}
