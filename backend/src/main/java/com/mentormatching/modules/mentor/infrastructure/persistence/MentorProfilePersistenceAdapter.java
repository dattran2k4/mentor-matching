package com.mentormatching.modules.mentor.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.infrastructure.persistence.mapper.MentorProfilePersistenceMapper;
import com.mentormatching.modules.mentor.infrastructure.persistence.repository.MentorProfileJpaRepository;

@Component
public class MentorProfilePersistenceAdapter implements MentorProfileRepositoryPort {

    private final MentorProfileJpaRepository mentorProfileJpaRepository;
    private final MentorProfilePersistenceMapper mentorProfilePersistenceMapper;

    public MentorProfilePersistenceAdapter(MentorProfileJpaRepository mentorProfileJpaRepository,
                                           MentorProfilePersistenceMapper mentorProfilePersistenceMapper) {
        this.mentorProfileJpaRepository = mentorProfileJpaRepository;
        this.mentorProfilePersistenceMapper = mentorProfilePersistenceMapper;
    }

    @Override
    public MentorProfile save(MentorProfile mentorProfile) {
        return mentorProfilePersistenceMapper.toDomain(mentorProfileJpaRepository.save(
                mentorProfilePersistenceMapper.toEntity(mentorProfile)));
    }

    @Override
    public Optional<MentorProfile> findById(Long id) {
        return mentorProfileJpaRepository.findById(id).map(mentorProfilePersistenceMapper::toDomain);
    }

    @Override
    public Optional<MentorProfile> findByUserId(Long userId) {
        return mentorProfileJpaRepository.findByUserId(userId).map(mentorProfilePersistenceMapper::toDomain);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return mentorProfileJpaRepository.existsByUserId(userId);
    }
}
