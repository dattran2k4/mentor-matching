package com.mentormatching.modules.auth.presentation.dto.request;

import com.mentormatching.modules.user.domain.UserType;
import com.mentormatching.shared.validation.EnumValue;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Full name is required") String fullName,
        @NotBlank(message = "Email is required") @Email(message = "Email is invalid") String email,
        @NotBlank(message = "Phone is required") @Size(max = 20, message = "Phone must not exceed 20 characters") String phone,
        @NotNull(message = "User type is required")
        @EnumValue(name = "User type", message = "User type must be one of: STUDENT, PARENT, UNIVERSITY_STUDENT, WORKING_ADULT") UserType userType,
        @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password,
        @NotBlank(message = "Password confirmation is required")
        @Size(min = 6, message = "Password confirmation must be at least 6 characters") String confirmPassword
) {
}
