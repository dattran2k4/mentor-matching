package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;

public interface GetCurrentMentorVerificationUseCase {

    CurrentMentorVerificationDetails getCurrentMentorVerification(Long userId);
}
