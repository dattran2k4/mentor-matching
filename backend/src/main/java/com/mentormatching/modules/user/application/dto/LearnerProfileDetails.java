package com.mentormatching.modules.user.application.dto;

import java.time.LocalDateTime;

import com.mentormatching.modules.user.domain.LearnerGender;

public record LearnerProfileDetails(Long id, Long userId, LearnerGender gender, Integer birthYear,
                                    String schoolName, Long gradeId, String learningGoal,
                                    LocalDateTime createdAt, LocalDateTime updatedAt) {
}
