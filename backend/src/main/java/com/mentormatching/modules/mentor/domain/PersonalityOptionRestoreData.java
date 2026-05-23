package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public record PersonalityOptionRestoreData(Long id, String name, String description, LocalDateTime createdAt,
                                           LocalDateTime updatedAt) {
}
