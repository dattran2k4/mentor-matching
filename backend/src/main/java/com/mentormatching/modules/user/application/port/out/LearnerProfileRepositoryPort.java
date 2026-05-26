package com.mentormatching.modules.user.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.user.domain.LearnerProfile;

public interface LearnerProfileRepositoryPort {

    LearnerProfile save(LearnerProfile learnerProfile);

    Optional<LearnerProfile> findById(Long id);

    Optional<LearnerProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
