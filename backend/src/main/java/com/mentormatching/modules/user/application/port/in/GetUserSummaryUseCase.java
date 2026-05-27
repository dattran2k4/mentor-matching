package com.mentormatching.modules.user.application.port.in;

import com.mentormatching.modules.user.application.dto.UserSummary;

public interface GetUserSummaryUseCase {

    UserSummary getUserSummary(Long userId);
}
