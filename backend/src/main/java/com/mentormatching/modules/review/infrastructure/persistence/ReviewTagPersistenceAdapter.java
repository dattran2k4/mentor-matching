package com.mentormatching.modules.review.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.application.port.out.ReviewTagRepositoryPort;
import com.mentormatching.modules.review.domain.ReviewTag;
import com.mentormatching.modules.review.infrastructure.persistence.mapper.ReviewTagPersistenceMapper;
import com.mentormatching.modules.review.infrastructure.persistence.repository.ReviewTagJpaRepository;

@Component
public class ReviewTagPersistenceAdapter implements ReviewTagRepositoryPort {

    private final ReviewTagJpaRepository reviewTagJpaRepository;
    private final ReviewTagPersistenceMapper reviewTagPersistenceMapper;

    public ReviewTagPersistenceAdapter(ReviewTagJpaRepository reviewTagJpaRepository,
                                       ReviewTagPersistenceMapper reviewTagPersistenceMapper) {
        this.reviewTagJpaRepository = reviewTagJpaRepository;
        this.reviewTagPersistenceMapper = reviewTagPersistenceMapper;
    }

    @Override
    public ReviewTag save(ReviewTag reviewTag) {
        return reviewTagPersistenceMapper.toDomain(reviewTagJpaRepository.save(reviewTagPersistenceMapper.toEntity(reviewTag)));
    }

    @Override
    public Optional<ReviewTag> findById(Long id) {
        return reviewTagJpaRepository.findById(id).map(reviewTagPersistenceMapper::toDomain);
    }

    @Override
    public List<ReviewTag> findByReviewId(Long reviewId) {
        return reviewTagJpaRepository.findByReviewId(reviewId).stream().map(reviewTagPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<ReviewTag> findByReviewTagOptionId(Long reviewTagOptionId) {
        return reviewTagJpaRepository.findByReviewTagOptionId(reviewTagOptionId).stream()
                .map(reviewTagPersistenceMapper::toDomain)
                .toList();
    }
}
