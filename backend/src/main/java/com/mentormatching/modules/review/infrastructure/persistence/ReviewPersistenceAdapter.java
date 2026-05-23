package com.mentormatching.modules.review.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.review.application.port.out.ReviewRepositoryPort;
import com.mentormatching.modules.review.domain.Review;
import com.mentormatching.modules.review.infrastructure.persistence.mapper.ReviewPersistenceMapper;
import com.mentormatching.modules.review.infrastructure.persistence.repository.ReviewJpaRepository;

@Component
public class ReviewPersistenceAdapter implements ReviewRepositoryPort {

    private final ReviewJpaRepository reviewJpaRepository;
    private final ReviewPersistenceMapper reviewPersistenceMapper;

    public ReviewPersistenceAdapter(ReviewJpaRepository reviewJpaRepository,
                                    ReviewPersistenceMapper reviewPersistenceMapper) {
        this.reviewJpaRepository = reviewJpaRepository;
        this.reviewPersistenceMapper = reviewPersistenceMapper;
    }

    @Override
    public Review save(Review review) {
        return reviewPersistenceMapper.toDomain(reviewJpaRepository.save(reviewPersistenceMapper.toEntity(review)));
    }

    @Override
    public Optional<Review> findById(Long id) {
        return reviewJpaRepository.findById(id).map(reviewPersistenceMapper::toDomain);
    }

    @Override
    public Optional<Review> findByBookingId(Long bookingId) {
        return reviewJpaRepository.findByBookingId(bookingId).map(reviewPersistenceMapper::toDomain);
    }

    @Override
    public List<Review> findByStudentUserId(Long studentUserId) {
        return reviewJpaRepository.findByStudentUserId(studentUserId).stream().map(reviewPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<Review> findByMentorId(Long mentorId) {
        return reviewJpaRepository.findByMentorId(mentorId).stream().map(reviewPersistenceMapper::toDomain).toList();
    }
}
