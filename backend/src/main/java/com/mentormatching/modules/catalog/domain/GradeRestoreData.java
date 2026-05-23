package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public record GradeRestoreData(Long id, String name, GradeLevelGroup levelGroup, LocalDateTime createdAt,
                               LocalDateTime updatedAt) {
}
