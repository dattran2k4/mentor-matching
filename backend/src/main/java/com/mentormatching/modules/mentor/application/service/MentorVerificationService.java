package com.mentormatching.modules.mentor.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;
import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorVerificationCommand;
import com.mentormatching.modules.mentor.application.port.in.UpsertCurrentMentorVerificationUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorVerificationRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorVerificationService implements UpsertCurrentMentorVerificationUseCase {

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorVerificationRepositoryPort mentorVerificationRepositoryPort;

    public MentorVerificationService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                     MentorVerificationRepositoryPort mentorVerificationRepositoryPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorVerificationRepositoryPort = mentorVerificationRepositoryPort;
    }

    @Override
    @Transactional
    public CurrentMentorVerificationDetails upsertCurrentMentorVerification(UpsertCurrentMentorVerificationCommand command) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(command.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));

        MentorVerification verification = mentorVerificationRepositoryPort.findByMentorId(mentorProfile.getId())
                .map(existing -> resubmit(existing, command))
                .orElseGet(() -> MentorVerification.submit(mentorProfile.getId(), command.fullName(),
                        command.idCardNumber(), command.idCardFrontUrl(), command.idCardBackUrl(),
                        command.selfieWithIdUrl()));

        MentorVerification savedVerification = mentorVerificationRepositoryPort.save(verification);
        return toDetails(savedVerification);
    }

    private MentorVerification resubmit(MentorVerification verification,
                                        UpsertCurrentMentorVerificationCommand command) {
        verification.resubmit(command.fullName(), command.idCardNumber(), command.idCardFrontUrl(),
                command.idCardBackUrl(), command.selfieWithIdUrl());
        return verification;
    }

    private CurrentMentorVerificationDetails toDetails(MentorVerification verification) {
        return new CurrentMentorVerificationDetails(verification.getId(), verification.getMentorId(),
                verification.getFullName(), verification.getIdCardNumber(), verification.getIdCardFrontUrl(),
                verification.getIdCardBackUrl(), verification.getSelfieWithIdUrl(),
                verification.getVerificationStatus().name(), verification.getVerifiedBy(),
                verification.getVerifiedAt(), verification.getRejectionReason(), verification.getCreatedAt(),
                verification.getUpdatedAt());
    }
}
