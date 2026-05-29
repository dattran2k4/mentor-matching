package com.mentormatching.modules.user.infrastructure.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.domain.UserRole;
import com.mentormatching.modules.user.domain.UserStatus;
import com.mentormatching.modules.user.domain.UserType;
import com.mentormatching.modules.user.infrastructure.persistence.entity.UserJpaEntity;
import com.mentormatching.modules.user.infrastructure.persistence.repository.UserJpaRepository;

@Component
@Profile("dev")
public class UserDataSeeder implements CommandLineRunner {

    /** Shared password for all dev test accounts. */
    public static final String TEST_PASSWORD = "123456";

    private final UserJpaRepository userJpaRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataSeeder(UserJpaRepository userJpaRepository, PasswordEncoder passwordEncoder) {
        this.userJpaRepository = userJpaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        ensureTestUser("learner@test.com", "Học viên Test", UserRole.LEARNER, "0900000001");
        ensureTestUser("mentor@test.com", "Mentor Test", UserRole.MENTOR, "0900000002");
        ensureTestUser("admin@test.com", "Admin Test", UserRole.ADMIN, "0900000003");
    }

    private void ensureTestUser(String email, String fullName, UserRole role, String phone) {
        String encodedPassword = passwordEncoder.encode(TEST_PASSWORD);

        userJpaRepository.findByEmail(email).ifPresentOrElse(
                existing -> {
                    existing.setPassword(encodedPassword);
                    existing.setFullName(fullName);
                    existing.setRole(role);
                    existing.setPhone(phone);
                    existing.setStatus(UserStatus.ACTIVE);
                    userJpaRepository.save(existing);
                },
                () -> userJpaRepository.save(UserJpaEntity.builder()
                        .fullName(fullName)
                        .email(email)
                        .password(encodedPassword)
                        .phone(phone)
                        .role(role)
                        .userType(UserType.WORKING_ADULT)
                        .status(UserStatus.ACTIVE)
                        .build()));
    }
}
