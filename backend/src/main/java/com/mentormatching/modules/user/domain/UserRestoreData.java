package com.mentormatching.modules.user.domain;

import java.time.LocalDateTime;

public record UserRestoreData(Long id, String fullName, String email, String password, String phone, UserRole role,
                              UserType userType, UserStatus status, LocalDateTime createdAt,
                              LocalDateTime updatedAt) {
}
