package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDate;

import com.mentormatching.modules.mentor.domain.AchievementType;

public record UpdateCurrentMentorAchievementCommand(Long userId, Long achievementId, String title,
                                                    String description, AchievementType achievementType,
                                                    String issuer, LocalDate achievedAt, String proofUrl) {
}
