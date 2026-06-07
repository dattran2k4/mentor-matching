package com.mentormatching.modules.user.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.user.application.dto.LearnerProfileDetails;
import com.mentormatching.modules.user.application.dto.UpdateCurrentLearnerProfileCommand;
import com.mentormatching.modules.user.application.port.in.UpsertCurrentLearnerProfileUseCase;
import com.mentormatching.modules.user.application.port.out.LearnerProfileRepositoryPort;
import com.mentormatching.modules.user.domain.LearnerProfile;

@Service
public class LearnerProfileService implements UpsertCurrentLearnerProfileUseCase {

    private final LearnerProfileRepositoryPort learnerProfileRepositoryPort;

    public LearnerProfileService(LearnerProfileRepositoryPort learnerProfileRepositoryPort) {
        this.learnerProfileRepositoryPort = learnerProfileRepositoryPort;
    }

    @Override
    @Transactional
    public LearnerProfileDetails upsertCurrentLearnerProfile(UpdateCurrentLearnerProfileCommand command) {
        LearnerProfile learnerProfile = learnerProfileRepositoryPort.findByUserId(command.userId())
                .map(existingProfile -> {
                    existingProfile.updateProfile(command.gender(), command.birthYear(), command.schoolName(),
                            command.gradeId(), command.learningGoal());
                    return existingProfile;
                })
                .orElseGet(() -> LearnerProfile.create(command.userId(), command.gender(), command.birthYear(),
                        command.schoolName(), command.gradeId(), command.learningGoal()));

        LearnerProfile savedProfile = learnerProfileRepositoryPort.save(learnerProfile);
        return toDetails(savedProfile);
    }

    private LearnerProfileDetails toDetails(LearnerProfile learnerProfile) {
        return new LearnerProfileDetails(learnerProfile.getId(), learnerProfile.getUserId(),
                learnerProfile.getGender(), learnerProfile.getBirthYear(), learnerProfile.getSchoolName(),
                learnerProfile.getGradeId(), learnerProfile.getLearningGoal(), learnerProfile.getCreatedAt(),
                learnerProfile.getUpdatedAt());
    }
}
