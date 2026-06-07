package com.mentormatching.modules.user.application.dto;

import com.mentormatching.modules.user.domain.UserRole;
import com.mentormatching.modules.user.domain.UserStatus;
import com.mentormatching.modules.user.domain.UserType;

public record CurrentUserDetails(Long id, String fullName, String email, String phone, UserRole role,
                                 UserType userType, UserStatus status) {
}
