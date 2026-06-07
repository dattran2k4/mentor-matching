package com.mentormatching.modules.mentor.presentation.dto.request;

import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationAction;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationCommand;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record ReviewMentorVerificationRequest(
        @NotNull(message = "Action is required") ReviewMentorVerificationAction action,
        String rejectionReason
) {

    public ReviewMentorVerificationCommand toCommand(AuthenticatedPrincipal principal, Long verificationId) {
        return new ReviewMentorVerificationCommand(principal.getId(), verificationId, action, rejectionReason);
    }
}
