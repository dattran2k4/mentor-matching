package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;

public interface MentorVerificationRepositoryPort {

    MentorVerification save(MentorVerification mentorVerification);

    Optional<MentorVerification> findById(Long id);

    Optional<MentorVerification> findByMentorId(Long mentorId);

    List<MentorVerification> findByVerificationStatus(MentorVerificationStatus verificationStatus);

    boolean existsByMentorId(Long mentorId);
}
