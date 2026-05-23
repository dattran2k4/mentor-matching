package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public record CategoryRestoreData(Long id, String name, String description, LocalDateTime createdAt,
                                  LocalDateTime updatedAt) {
}
