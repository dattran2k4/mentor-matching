package com.mentormatching.modules.user.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.user.domain.User;

public interface UserRepositoryPort {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
