package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorVerificationRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.mapper.MentorVerificationPersistenceMapper;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorVerificationJpaRepository;

@Component
public class MentorVerificationPersistenceAdapter implements MentorVerificationRepositoryPort {

    private final MentorVerificationJpaRepository mentorVerificationJpaRepository;
    private final MentorVerificationPersistenceMapper mentorVerificationPersistenceMapper;

    public MentorVerificationPersistenceAdapter(MentorVerificationJpaRepository mentorVerificationJpaRepository,
                                                MentorVerificationPersistenceMapper mentorVerificationPersistenceMapper) {
        this.mentorVerificationJpaRepository = mentorVerificationJpaRepository;
        this.mentorVerificationPersistenceMapper = mentorVerificationPersistenceMapper;
    }

    @Override
    public MentorVerification save(MentorVerification mentorVerification) {
        return mentorVerificationPersistenceMapper.toDomain(mentorVerificationJpaRepository.save(
                mentorVerificationPersistenceMapper.toEntity(mentorVerification)));
    }

    @Override
    public Optional<MentorVerification> findById(Long id) {
        return mentorVerificationJpaRepository.findById(id).map(mentorVerificationPersistenceMapper::toDomain);
    }

    @Override
    public Optional<MentorVerification> findByMentorId(Long mentorId) {
        return mentorVerificationJpaRepository.findByMentorId(mentorId).map(mentorVerificationPersistenceMapper::toDomain);
    }

    @Override
    public List<MentorVerification> findByVerificationStatus(MentorVerificationStatus verificationStatus) {
        return mentorVerificationJpaRepository.findByVerificationStatus(verificationStatus).stream()
                .map(mentorVerificationPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsByMentorId(Long mentorId) {
        return mentorVerificationJpaRepository.existsByMentorId(mentorId);
    }
}
