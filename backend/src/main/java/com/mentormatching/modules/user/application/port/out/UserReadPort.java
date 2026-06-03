package com.mentormatching.modules.user.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.user.domain.User;

public interface UserReadPort {

    Optional<User> findById(Long userId);

    Optional<User> findByEmail(String email);
}
