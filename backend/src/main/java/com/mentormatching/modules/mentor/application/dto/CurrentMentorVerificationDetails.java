package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDateTime;

public record CurrentMentorVerificationDetails(Long id, Long mentorId, String fullName, String idCardNumber,
                                               String idCardFrontUrl, String idCardBackUrl,
                                               String selfieWithIdUrl, String verificationStatus, Long verifiedBy,
                                               LocalDateTime verifiedAt, String rejectionReason,
                                               LocalDateTime createdAt, LocalDateTime updatedAt) {
}
