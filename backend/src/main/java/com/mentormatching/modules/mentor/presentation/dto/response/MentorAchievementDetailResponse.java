package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDate;

import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.domain.AchievementType;

public record MentorAchievementDetailResponse(Long id, String title, String description,
                                              AchievementType achievementType, String issuer, LocalDate achievedAt,
                                              String proofUrl, Boolean verified) {

    public static MentorAchievementDetailResponse from(MentorAchievementDetail achievement) {
        return new MentorAchievementDetailResponse(achievement.id(), achievement.title(), achievement.description(),
                achievement.achievementType(), achievement.issuer(), achievement.achievedAt(), achievement.proofUrl(),
                achievement.verified());
    }
}
