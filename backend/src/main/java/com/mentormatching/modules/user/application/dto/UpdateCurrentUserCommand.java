package com.mentormatching.modules.user.application.dto;

import com.mentormatching.modules.user.domain.UserType;

public record UpdateCurrentUserCommand(Long userId, String fullName, String phone, UserType userType) {
}
