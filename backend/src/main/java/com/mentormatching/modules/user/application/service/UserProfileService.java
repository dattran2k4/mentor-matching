package com.mentormatching.modules.user.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.user.application.dto.CurrentUserDetails;
import com.mentormatching.modules.user.application.dto.UpdateCurrentUserCommand;
import com.mentormatching.modules.user.application.port.in.UpdateCurrentUserUseCase;
import com.mentormatching.modules.user.application.port.out.UserReadPort;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class UserProfileService implements UpdateCurrentUserUseCase {

    private final UserReadPort userReadPort;
    private final UserRepositoryPort userRepositoryPort;

    @Override
    @Transactional
    public CurrentUserDetails updateCurrentUser(UpdateCurrentUserCommand command) {
        User user = userReadPort.findById(command.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (userRepositoryPort.existsByPhoneAndIdNot(command.phone(), command.userId())) {
            throw new InvalidDataException("Phone already exists");
        }

        user.updateProfile(command.fullName(), command.phone(), command.userType());
        User savedUser = userRepositoryPort.save(user);

        return new CurrentUserDetails(savedUser.getId(), savedUser.getFullName(), savedUser.getEmail(),
                savedUser.getPhone(), savedUser.getRole(), savedUser.getUserType(), savedUser.getStatus());
    }
}
