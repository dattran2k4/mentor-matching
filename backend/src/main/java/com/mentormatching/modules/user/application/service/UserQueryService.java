package com.mentormatching.modules.user.application.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.mentormatching.modules.user.application.dto.CurrentUserDetails;
import com.mentormatching.modules.user.application.dto.UserSummary;
import com.mentormatching.modules.user.application.port.in.GetCurrentUserUseCase;
import com.mentormatching.modules.user.application.port.in.GetUserSummaryUseCase;
import com.mentormatching.modules.user.application.port.out.UserReadPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
@Transactional(readOnly = true)
public class UserQueryService implements GetUserSummaryUseCase, GetCurrentUserUseCase {

    private final UserReadPort userReadPort;

    public UserQueryService(UserReadPort userReadPort) {
        this.userReadPort = userReadPort;
    }

    @Override
    public UserSummary getUserSummary(Long userId) {
        User user = getUserOrThrow(userId);
        return new UserSummary(user.getId(), user.getFullName());
    }

    @Override
    public CurrentUserDetails getCurrentUser(Long userId) {
        User user = getUserOrThrow(userId);
        return new CurrentUserDetails(user.getId(), user.getFullName(), user.getEmail(), user.getPhone(),
                user.getRole(), user.getUserType(), user.getStatus());
    }

    private User getUserOrThrow(Long userId) {
        return userReadPort.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
