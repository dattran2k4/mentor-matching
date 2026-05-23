package com.mentormatching.modules.user.infrastructure.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.domain.UserRole;
import com.mentormatching.modules.user.domain.UserStatus;
import com.mentormatching.modules.user.domain.UserType;
import com.mentormatching.modules.user.infrastructure.persistence.entity.UserJpaEntity;
import com.mentormatching.modules.user.infrastructure.persistence.repository.UserJpaRepository;

@Component
@Profile("dev")
public class UserDataSeeder implements CommandLineRunner {

    private static final String DEFAULT_ADMIN_PASSWORD =
            "$2a$10$f8K0p/rAvE9SrsZcahthQuKA79pIAqGt9APO14f3.czxnCPp9q6Iu";

    private final UserJpaRepository userJpaRepository;

    public UserDataSeeder(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public void run(String... args) {
        if (userJpaRepository.count() > 0) {
            return;
        }

        userJpaRepository.save(UserJpaEntity.builder()
                .fullName("Admin Test")
                .email("admin@test.com")
                .password(DEFAULT_ADMIN_PASSWORD)
                .phone("0900000000")
                .role(UserRole.ADMIN)
                .userType(UserType.WORKING_ADULT)
                .status(UserStatus.ACTIVE)
                .build());
    }
}
