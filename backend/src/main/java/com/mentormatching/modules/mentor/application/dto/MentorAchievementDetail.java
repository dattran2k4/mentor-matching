package com.mentormatching.modules.mentor.application.dto;

import java.time.LocalDate;

import com.mentormatching.modules.mentor.domain.AchievementType;

public record MentorAchievementDetail(Long id, String title, String description, AchievementType achievementType,
                                      String issuer, LocalDate achievedAt, String proofUrl, Boolean verified) {
}
