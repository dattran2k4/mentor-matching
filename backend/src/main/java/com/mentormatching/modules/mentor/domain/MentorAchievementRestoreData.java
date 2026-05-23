package com.mentormatching.modules.mentor.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record MentorAchievementRestoreData(Long id, Long mentorId, String title, String description,
                                           AchievementType achievementType, String issuer, LocalDate achievedAt,
                                           String proofUrl, Boolean verified, Long verifiedBy,
                                           LocalDateTime verifiedAt, LocalDateTime createdAt,
                                           LocalDateTime updatedAt) {
}
