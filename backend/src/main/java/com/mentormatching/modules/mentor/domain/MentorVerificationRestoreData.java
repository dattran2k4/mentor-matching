package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public record MentorVerificationRestoreData(Long id, Long mentorId, String fullName, String idCardNumber,
                                            String idCardFrontUrl, String idCardBackUrl, String selfieWithIdUrl,
                                            MentorVerificationStatus verificationStatus, Long verifiedBy,
                                            LocalDateTime verifiedAt, String rejectionReason,
                                            LocalDateTime createdAt, LocalDateTime updatedAt) {
}
