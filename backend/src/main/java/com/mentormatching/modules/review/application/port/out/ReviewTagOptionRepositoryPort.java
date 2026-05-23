package com.mentormatching.modules.review.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.review.domain.ReviewTagOption;

public interface ReviewTagOptionRepositoryPort {

    ReviewTagOption save(ReviewTagOption reviewTagOption);

    Optional<ReviewTagOption> findById(Long id);

    List<ReviewTagOption> findAll();
}
