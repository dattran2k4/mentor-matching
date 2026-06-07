package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDateTime;

import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public record AdminMentorVerificationListItem(Long id, Long mentorId, Long userId, String accountFullName,
                                              String accountEmail, MentorVerificationStatus verificationStatus,
                                              LocalDateTime createdAt, LocalDateTime updatedAt) {
}
