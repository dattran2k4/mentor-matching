package com.mentormatching.modules.user.application.dto;

import com.mentormatching.modules.user.domain.LearnerGender;

public record UpdateCurrentLearnerProfileCommand(Long userId, LearnerGender gender, Integer birthYear,
                                                 String schoolName, Long gradeId, String learningGoal) {
}
