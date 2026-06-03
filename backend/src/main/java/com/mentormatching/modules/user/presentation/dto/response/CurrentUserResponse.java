package com.mentormatching.modules.user.presentation.dto.response;

import com.mentormatching.modules.user.application.dto.CurrentUserDetails;
import com.mentormatching.modules.user.domain.UserRole;
import com.mentormatching.modules.user.domain.UserStatus;
import com.mentormatching.modules.user.domain.UserType;

public record CurrentUserResponse(Long id, String fullName, String email, String phone, UserRole role,
                                  UserType userType, UserStatus status) {

    public static CurrentUserResponse from(CurrentUserDetails currentUser) {
        return new CurrentUserResponse(currentUser.id(), currentUser.fullName(), currentUser.email(),
                currentUser.phone(), currentUser.role(), currentUser.userType(), currentUser.status());
    }
}
