package com.mentormatching.modules.user.domain;

import java.time.LocalDateTime;

public record LearnerProfileRestoreData(Long id, Long userId, LearnerGender gender, Integer birthYear,
                                        String schoolName, Long gradeId, String learningGoal,
                                        LocalDateTime createdAt, LocalDateTime updatedAt) {
}
