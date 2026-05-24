package com.mentormatching.modules.user.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.application.port.out.LearnerProfileRepositoryPort;
import com.mentormatching.modules.user.domain.LearnerProfile;
import com.mentormatching.modules.user.infrastructure.persistence.mapper.LearnerProfilePersistenceMapper;
import com.mentormatching.modules.user.infrastructure.persistence.repository.LearnerProfileJpaRepository;

@Component
public class LearnerProfilePersistenceAdapter implements LearnerProfileRepositoryPort {

    private final LearnerProfileJpaRepository learnerProfileJpaRepository;
    private final LearnerProfilePersistenceMapper learnerProfilePersistenceMapper;

    public LearnerProfilePersistenceAdapter(LearnerProfileJpaRepository learnerProfileJpaRepository,
                                            LearnerProfilePersistenceMapper learnerProfilePersistenceMapper) {
        this.learnerProfileJpaRepository = learnerProfileJpaRepository;
        this.learnerProfilePersistenceMapper = learnerProfilePersistenceMapper;
    }

    @Override
    public LearnerProfile save(LearnerProfile learnerProfile) {
        return learnerProfilePersistenceMapper.toDomain(learnerProfileJpaRepository.save(
                learnerProfilePersistenceMapper.toEntity(learnerProfile)));
    }

    @Override
    public Optional<LearnerProfile> findById(Long id) {
        return learnerProfileJpaRepository.findById(id).map(learnerProfilePersistenceMapper::toDomain);
    }

    @Override
    public Optional<LearnerProfile> findByUserId(Long userId) {
        return learnerProfileJpaRepository.findByUserId(userId).map(learnerProfilePersistenceMapper::toDomain);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return learnerProfileJpaRepository.existsByUserId(userId);
    }
}
