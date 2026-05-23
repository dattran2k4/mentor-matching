package com.mentormatching.modules.scheduling.domain;

import java.time.LocalDateTime;

public record MentorAvailabilityRestoreData(Long id, Long mentorId, Long timeSlotId, LocalDateTime createdAt,
                                            LocalDateTime updatedAt) {
}
