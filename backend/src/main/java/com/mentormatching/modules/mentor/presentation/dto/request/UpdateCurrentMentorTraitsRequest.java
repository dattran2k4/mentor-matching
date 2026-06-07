package com.mentormatching.modules.mentor.presentation.dto.request;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorTraitsCommand;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record UpdateCurrentMentorTraitsRequest(
        @NotNull(message = "Personality option IDs are required") List<Long> personalityOptionIds,
        @NotNull(message = "Highlight option IDs are required") List<Long> highlightOptionIds
) {

    public UpdateCurrentMentorTraitsCommand toCommand(AuthenticatedPrincipal principal) {
        return new UpdateCurrentMentorTraitsCommand(principal.getId(), personalityOptionIds, highlightOptionIds);
    }
}
