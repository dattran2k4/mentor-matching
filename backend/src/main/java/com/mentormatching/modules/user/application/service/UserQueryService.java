package com.mentormatching.modules.user.application.service;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.user.application.dto.UserSummary;
import com.mentormatching.modules.user.application.port.in.GetUserSummaryUseCase;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class UserQueryService implements GetUserSummaryUseCase {

    private final UserRepositoryPort userRepositoryPort;

    public UserQueryService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public UserSummary getUserSummary(Long userId) {
        User user = userRepositoryPort.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return new UserSummary(user.getId(), user.getFullName());
    }
}
