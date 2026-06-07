package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public record AdminMentorVerificationDetail(Long id, Long mentorId, Long userId, String accountFullName,
                                            String accountEmail, String accountPhone,
                                            MentorApprovalStatus approvalStatus, String approvalNote,
                                            String fullName, String idCardNumber, String idCardFrontUrl,
                                            String idCardBackUrl, String selfieWithIdUrl,
                                            MentorVerificationStatus verificationStatus, Long verifiedBy,
                                            LocalDateTime verifiedAt, String rejectionReason,
                                            LocalDateTime createdAt, LocalDateTime updatedAt) {
}
