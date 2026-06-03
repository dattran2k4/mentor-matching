package com.mentormatching.modules.user.application.port.out;

import com.mentormatching.modules.user.domain.User;

public interface UserRepositoryPort {

    User save(User user);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
