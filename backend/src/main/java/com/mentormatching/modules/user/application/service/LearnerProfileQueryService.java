package com.mentormatching.modules.user.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.user.application.dto.LearnerProfileDetails;
import com.mentormatching.modules.user.application.port.in.GetCurrentLearnerProfileUseCase;
import com.mentormatching.modules.user.application.port.out.LearnerProfileRepositoryPort;
import com.mentormatching.modules.user.domain.LearnerProfile;

@Service
@Transactional(readOnly = true)
public class LearnerProfileQueryService implements GetCurrentLearnerProfileUseCase {

    private final LearnerProfileRepositoryPort learnerProfileRepositoryPort;

    public LearnerProfileQueryService(LearnerProfileRepositoryPort learnerProfileRepositoryPort) {
        this.learnerProfileRepositoryPort = learnerProfileRepositoryPort;
    }

    @Override
    public LearnerProfileDetails getCurrentLearnerProfile(Long userId) {
        return learnerProfileRepositoryPort.findByUserId(userId)
                .map(this::toDetails)
                .orElseGet(() -> new LearnerProfileDetails(null, userId, null, null, null, null, null, null, null));
    }

    private LearnerProfileDetails toDetails(LearnerProfile learnerProfile) {
        return new LearnerProfileDetails(learnerProfile.getId(), learnerProfile.getUserId(),
                learnerProfile.getGender(), learnerProfile.getBirthYear(), learnerProfile.getSchoolName(),
                learnerProfile.getGradeId(), learnerProfile.getLearningGoal(), learnerProfile.getCreatedAt(),
                learnerProfile.getUpdatedAt());
    }
}
