package com.mentormatching.modules.mentor.application.port.out;

import java.util.Optional;

import com.mentormatching.modules.mentor.domain.MentorProfile;

public interface MentorProfileRepositoryPort {

    MentorProfile save(MentorProfile mentorProfile);

    Optional<MentorProfile> findById(Long id);

    Optional<MentorProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
