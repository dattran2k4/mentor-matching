package com.mentormatching.modules.mentor.application.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationAction;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationCommand;
import com.mentormatching.modules.mentor.application.port.in.ReviewMentorVerificationUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorVerificationRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.modules.mentor.domain.MentorVerification;
import com.mentormatching.modules.user.application.port.out.UserReadPort;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class AdminMentorVerificationService implements ReviewMentorVerificationUseCase {

    private final MentorVerificationRepositoryPort mentorVerificationRepositoryPort;
    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorReadRepositoryPort mentorReadRepositoryPort;
    private final UserReadPort userReadPort;
    private final UserRepositoryPort userRepositoryPort;

    public AdminMentorVerificationService(MentorVerificationRepositoryPort mentorVerificationRepositoryPort,
                                          MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                          MentorReadRepositoryPort mentorReadRepositoryPort,
                                          UserReadPort userReadPort,
                                          UserRepositoryPort userRepositoryPort) {
        this.mentorVerificationRepositoryPort = mentorVerificationRepositoryPort;
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorReadRepositoryPort = mentorReadRepositoryPort;
        this.userReadPort = userReadPort;
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    @Transactional
    public AdminMentorVerificationDetail reviewMentorVerification(ReviewMentorVerificationCommand command) {
        MentorVerification verification = mentorVerificationRepositoryPort.findById(command.verificationId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor verification not found"));
        MentorProfile mentorProfile = mentorProfileRepositoryPort.findById(verification.getMentorId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));

        if (command.action() == ReviewMentorVerificationAction.VERIFY) {
            verification.verify(command.adminUserId());
            promoteUserToMentor(mentorProfile.getUserId());
        } else {
            verification.reject(command.rejectionReason());
        }

        mentorVerificationRepositoryPort.save(verification);
        return mentorReadRepositoryPort.findAdminMentorVerificationDetailById(verification.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor verification not found"));
    }

    /*
     * Kiểm tra role user rồi chuyển sang ROLE.MENTOR
     */
    private void promoteUserToMentor(Long userId) {
        User user = userReadPort.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.promoteToMentor();
        userRepositoryPort.save(user);
    }
}
