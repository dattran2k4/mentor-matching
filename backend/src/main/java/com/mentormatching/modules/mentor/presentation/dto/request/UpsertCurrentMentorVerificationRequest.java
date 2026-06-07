package com.mentormatching.modules.mentor.presentation.dto.request;

import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorVerificationCommand;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpsertCurrentMentorVerificationRequest(
        @NotBlank(message = "Full name is required") String fullName,
        @Size(max = 50, message = "ID card number must not exceed 50 characters") String idCardNumber,
        @NotBlank(message = "ID card front URL is required") String idCardFrontUrl,
        @NotBlank(message = "ID card back URL is required") String idCardBackUrl,
        String selfieWithIdUrl
) {

    public UpsertCurrentMentorVerificationCommand toCommand(AuthenticatedPrincipal principal) {
        return new UpsertCurrentMentorVerificationCommand(principal.getId(), fullName, idCardNumber,
                idCardFrontUrl, idCardBackUrl, selfieWithIdUrl);
    }
}
