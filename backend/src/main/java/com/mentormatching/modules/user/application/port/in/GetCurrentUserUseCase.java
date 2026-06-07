package com.mentormatching.modules.user.application.port.in;

import com.mentormatching.modules.user.application.dto.CurrentUserDetails;

public interface GetCurrentUserUseCase {

    CurrentUserDetails getCurrentUser(Long userId);
}
