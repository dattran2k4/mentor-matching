package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public record ReviewRestoreData(Long id, Long bookingId, Long studentUserId, Long mentorId, Integer rating,
                                String comment, LocalDateTime createdAt, LocalDateTime updatedAt) {
}
