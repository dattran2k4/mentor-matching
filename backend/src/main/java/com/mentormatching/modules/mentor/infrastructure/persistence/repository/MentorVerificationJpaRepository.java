package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorVerificationJpaEntity;

public interface MentorVerificationJpaRepository extends JpaRepository<MentorVerificationJpaEntity, Long> {

    Optional<MentorVerificationJpaEntity> findByMentorId(Long mentorId);

    List<MentorVerificationJpaEntity> findByVerificationStatus(MentorVerificationStatus verificationStatus);

    boolean existsByMentorId(Long mentorId);
}
