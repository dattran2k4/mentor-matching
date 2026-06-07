package com.mentormatching.modules.mentor.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;
import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorVerificationUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorVerificationRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
@Transactional(readOnly = true)
public class MentorVerificationQueryService implements GetCurrentMentorVerificationUseCase {

    private static final String UNVERIFIED = "UNVERIFIED";

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorVerificationRepositoryPort mentorVerificationRepositoryPort;

    public MentorVerificationQueryService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                          MentorVerificationRepositoryPort mentorVerificationRepositoryPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorVerificationRepositoryPort = mentorVerificationRepositoryPort;
    }

    @Override
    public CurrentMentorVerificationDetails getCurrentMentorVerification(Long userId) {
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));

        return mentorVerificationRepositoryPort.findByMentorId(mentorProfile.getId())
                .map(this::toDetails)
                .orElseGet(() -> new CurrentMentorVerificationDetails(null, mentorProfile.getId(), null, null, null,
                        null, null, UNVERIFIED, null, null, null, null, null));
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
