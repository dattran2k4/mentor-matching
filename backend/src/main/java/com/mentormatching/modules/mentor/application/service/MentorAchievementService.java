package com.mentormatching.modules.mentor.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.dto.CreateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorAchievementCommand;
import com.mentormatching.modules.mentor.application.port.in.CreateCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.application.port.in.DeleteCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpdateCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorAchievementRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorAchievement;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorAchievementService implements CreateCurrentMentorAchievementUseCase,
        UpdateCurrentMentorAchievementUseCase, DeleteCurrentMentorAchievementUseCase {

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorAchievementRepositoryPort mentorAchievementRepositoryPort;

    public MentorAchievementService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                    MentorAchievementRepositoryPort mentorAchievementRepositoryPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorAchievementRepositoryPort = mentorAchievementRepositoryPort;
    }

    @Override
    @Transactional
    public MentorAchievementDetail createCurrentMentorAchievement(CreateCurrentMentorAchievementCommand command) {
        MentorProfile mentorProfile = getMentorProfile(command.userId());
        MentorAchievement mentorAchievement = MentorAchievement.create(mentorProfile.getId(), command.title(),
                command.description(), command.achievementType(), command.issuer(), command.achievedAt(), command.proofUrl());
        return toDetail(mentorAchievementRepositoryPort.save(mentorAchievement));
    }

    @Override
    @Transactional
    public MentorAchievementDetail updateCurrentMentorAchievement(UpdateCurrentMentorAchievementCommand command) {
        MentorProfile mentorProfile = getMentorProfile(command.userId());
        MentorAchievement mentorAchievement = mentorAchievementRepositoryPort.findById(command.achievementId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor achievement not found"));
        ensureAchievementBelongsToMentor(mentorProfile.getId(), mentorAchievement);

        mentorAchievement.update(command.title(), command.description(), command.achievementType(), command.issuer(),
                command.achievedAt(), command.proofUrl());
        return toDetail(mentorAchievementRepositoryPort.save(mentorAchievement));
    }

    @Override
    @Transactional
    public void deleteCurrentMentorAchievement(Long userId, Long achievementId) {
        MentorProfile mentorProfile = getMentorProfile(userId);
        MentorAchievement mentorAchievement = mentorAchievementRepositoryPort.findById(achievementId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor achievement not found"));
        ensureAchievementBelongsToMentor(mentorProfile.getId(), mentorAchievement);
        mentorAchievementRepositoryPort.delete(mentorAchievement);
    }

    private MentorProfile getMentorProfile(Long userId) {
        return mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
    }

    private void ensureAchievementBelongsToMentor(Long mentorId, MentorAchievement mentorAchievement) {
        if (!mentorId.equals(mentorAchievement.getMentorId())) {
            throw new ResourceNotFoundException("Mentor achievement not found");
        }
    }

    private MentorAchievementDetail toDetail(MentorAchievement mentorAchievement) {
        return new MentorAchievementDetail(mentorAchievement.getId(), mentorAchievement.getTitle(),
                mentorAchievement.getDescription(), mentorAchievement.getAchievementType(),
                mentorAchievement.getIssuer(), mentorAchievement.getAchievedAt(), mentorAchievement.getProofUrl(),
                mentorAchievement.getVerified());
    }
}
