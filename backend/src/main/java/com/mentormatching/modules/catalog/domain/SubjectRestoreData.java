package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public record SubjectRestoreData(Long id, Long categoryId, String name, String description,
                                 LocalDateTime createdAt, LocalDateTime updatedAt) {
}
