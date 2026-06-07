package com.mentormatching.modules.user.presentation.dto.response;

import java.time.LocalDateTime;

import com.mentormatching.modules.user.application.dto.LearnerProfileDetails;
import com.mentormatching.modules.user.domain.LearnerGender;

public record LearnerProfileResponse(Long id, Long userId, LearnerGender gender, Integer birthYear,
                                     String schoolName, Long gradeId, String learningGoal,
                                     LocalDateTime createdAt, LocalDateTime updatedAt) {

    public static LearnerProfileResponse from(LearnerProfileDetails learnerProfile) {
        return new LearnerProfileResponse(learnerProfile.id(), learnerProfile.userId(), learnerProfile.gender(),
                learnerProfile.birthYear(), learnerProfile.schoolName(), learnerProfile.gradeId(),
                learnerProfile.learningGoal(), learnerProfile.createdAt(), learnerProfile.updatedAt());
    }
}
