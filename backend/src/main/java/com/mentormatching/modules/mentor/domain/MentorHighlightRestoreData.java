package com.mentormatching.modules.mentor.domain;

import java.time.LocalDateTime;

public record MentorHighlightRestoreData(Long id, Long mentorId, Long highlightOptionId, LocalDateTime createdAt) {
}
