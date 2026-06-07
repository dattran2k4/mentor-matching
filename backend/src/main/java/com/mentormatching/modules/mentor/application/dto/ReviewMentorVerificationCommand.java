package com.mentormatching.modules.mentor.application.dto;

public record ReviewMentorVerificationCommand(Long adminUserId, Long verificationId,
                                              ReviewMentorVerificationAction action,
                                              String rejectionReason) {
}
