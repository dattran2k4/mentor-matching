package com.mentormatching.modules.review.domain;

import java.time.LocalDateTime;

public record ReviewTagOptionRestoreData(Long id, String name, String description, LocalDateTime createdAt,
                                         LocalDateTime updatedAt) {
}
