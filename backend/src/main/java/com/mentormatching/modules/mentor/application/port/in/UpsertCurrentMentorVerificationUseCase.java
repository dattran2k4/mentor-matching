package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorVerificationDetails;
import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorVerificationCommand;

public interface UpsertCurrentMentorVerificationUseCase {

    CurrentMentorVerificationDetails upsertCurrentMentorVerification(UpsertCurrentMentorVerificationCommand command);
}
