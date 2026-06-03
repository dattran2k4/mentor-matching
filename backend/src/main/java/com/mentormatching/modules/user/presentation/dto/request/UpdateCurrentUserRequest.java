package com.mentormatching.modules.user.presentation.dto.request;

import com.mentormatching.modules.user.application.dto.UpdateCurrentUserCommand;
import com.mentormatching.modules.user.domain.UserType;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;
import com.mentormatching.shared.validation.EnumValue;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateCurrentUserRequest(
        @NotBlank(message = "Full name is required") String fullName,
        @NotBlank(message = "Phone is required")
        @Size(max = 20, message = "Phone must not exceed 20 characters") String phone,
        @NotNull(message = "User type is required")
        @EnumValue(name = "User type", message = "User type must be one of: STUDENT, PARENT, UNIVERSITY_STUDENT, WORKING_ADULT") UserType userType
) {

    public UpdateCurrentUserCommand toCommand(AuthenticatedPrincipal principal) {
        return new UpdateCurrentUserCommand(principal.getId(), fullName, phone, userType);
    }
}
