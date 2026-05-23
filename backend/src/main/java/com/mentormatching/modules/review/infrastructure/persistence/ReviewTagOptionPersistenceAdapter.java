package com.mentormatching.modules.review.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.application.port.out.ReviewTagOptionRepositoryPort;
import com.mentormatching.modules.review.domain.ReviewTagOption;
import com.mentormatching.modules.review.infrastructure.persistence.mapper.ReviewTagOptionPersistenceMapper;
import com.mentormatching.modules.review.infrastructure.persistence.repository.ReviewTagOptionJpaRepository;

@Component
public class ReviewTagOptionPersistenceAdapter implements ReviewTagOptionRepositoryPort {

    private final ReviewTagOptionJpaRepository reviewTagOptionJpaRepository;
    private final ReviewTagOptionPersistenceMapper reviewTagOptionPersistenceMapper;

    public ReviewTagOptionPersistenceAdapter(ReviewTagOptionJpaRepository reviewTagOptionJpaRepository,
                                             ReviewTagOptionPersistenceMapper reviewTagOptionPersistenceMapper) {
        this.reviewTagOptionJpaRepository = reviewTagOptionJpaRepository;
        this.reviewTagOptionPersistenceMapper = reviewTagOptionPersistenceMapper;
    }

    @Override
    public ReviewTagOption save(ReviewTagOption reviewTagOption) {
        return reviewTagOptionPersistenceMapper.toDomain(reviewTagOptionJpaRepository.save(
                reviewTagOptionPersistenceMapper.toEntity(reviewTagOption)));
    }

    @Override
    public Optional<ReviewTagOption> findById(Long id) {
        return reviewTagOptionJpaRepository.findById(id).map(reviewTagOptionPersistenceMapper::toDomain);
    }

    @Override
    public List<ReviewTagOption> findAll() {
        return reviewTagOptionJpaRepository.findAll().stream().map(reviewTagOptionPersistenceMapper::toDomain).toList();
    }
}
