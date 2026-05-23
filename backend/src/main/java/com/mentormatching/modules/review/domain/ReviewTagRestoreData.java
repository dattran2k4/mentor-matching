package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public record ReviewTagRestoreData(Long id, Long reviewId, Long reviewTagOptionId, LocalDateTime createdAt) {
}
