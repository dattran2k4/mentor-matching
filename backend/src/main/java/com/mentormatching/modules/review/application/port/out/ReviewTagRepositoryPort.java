package com.mentormatching.modules.review.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.review.domain.ReviewTag;

public interface ReviewTagRepositoryPort {

    ReviewTag save(ReviewTag reviewTag);

    Optional<ReviewTag> findById(Long id);

    List<ReviewTag> findByReviewId(Long reviewId);

    List<ReviewTag> findByReviewTagOptionId(Long reviewTagOptionId);
}
