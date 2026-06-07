package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;

public record CurrentMentorVerificationResponse(Long id, Long mentorId, String fullName, String idCardNumber,
                                                String idCardFrontUrl, String idCardBackUrl,
                                                String selfieWithIdUrl, String verificationStatus, Long verifiedBy,
                                                LocalDateTime verifiedAt, String rejectionReason,
                                                LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static CurrentMentorVerificationResponse from(CurrentMentorVerificationDetails verification) {
        return new CurrentMentorVerificationResponse(verification.id(), verification.mentorId(),
                verification.fullName(), verification.idCardNumber(), verification.idCardFrontUrl(),
                verification.idCardBackUrl(), verification.selfieWithIdUrl(), verification.verificationStatus(),
                verification.verifiedBy(), verification.verifiedAt(), verification.rejectionReason(),
                verification.createdAt(), verification.updatedAt());
    }
}
