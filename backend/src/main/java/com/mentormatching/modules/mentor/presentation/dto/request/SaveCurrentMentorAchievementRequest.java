package com.mentormatching.modules.mentor.presentation.dto.request;

import java.time.LocalDate;

import com.mentormatching.modules.mentor.application.dto.CreateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.domain.AchievementType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SaveCurrentMentorAchievementRequest(
        @NotBlank(message = "Title is required") String title,
        String description,
        @NotNull(message = "Achievement type is required") AchievementType achievementType,
        String issuer,
        LocalDate achievedAt,
        String proofUrl
) {

    public CreateCurrentMentorAchievementCommand toCreateCommand(AuthenticatedPrincipal principal) {
        return new CreateCurrentMentorAchievementCommand(principal.getId(), title, description, achievementType,
                issuer, achievedAt, proofUrl);
    }

    public UpdateCurrentMentorAchievementCommand toUpdateCommand(AuthenticatedPrincipal principal,
                                                                 Long achievementId) {
        return new UpdateCurrentMentorAchievementCommand(principal.getId(), achievementId, title, description,
                achievementType, issuer, achievedAt, proofUrl);
    }
}
