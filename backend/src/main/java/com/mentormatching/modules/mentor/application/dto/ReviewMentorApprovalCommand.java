package com.mentormatching.modules.mentor.application.dto;

public record ReviewMentorApprovalCommand(Long adminUserId, Long mentorId, ReviewMentorApprovalAction action,
                                          String approvalNote) {
}
