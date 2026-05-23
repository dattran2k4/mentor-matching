package com.mentormatching.modules.auth.application.dto;

import com.mentormatching.modules.user.domain.UserType;

public record RegisterCommand(String fullName, String email, String phone, UserType userType, String password,
                              String confirmPassword) {
}
