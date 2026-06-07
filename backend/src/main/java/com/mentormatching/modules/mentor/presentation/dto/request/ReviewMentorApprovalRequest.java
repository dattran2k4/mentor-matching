package com.mentormatching.modules.mentor.presentation.dto.request;

import com.mentormatching.modules.mentor.application.dto.ReviewMentorApprovalAction;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorApprovalCommand;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotNull;

public record ReviewMentorApprovalRequest(
        @NotNull(message = "Action is required") ReviewMentorApprovalAction action,
        String approvalNote
) {

    public ReviewMentorApprovalCommand toCommand(AuthenticatedPrincipal principal, Long mentorId) {
        return new ReviewMentorApprovalCommand(principal.getId(), mentorId, action, approvalNote);
    }
}
