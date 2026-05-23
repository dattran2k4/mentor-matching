package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public record MentorPersonalityRestoreData(Long id, Long mentorId, Long personalityOptionId,
                                           LocalDateTime createdAt) {
}
