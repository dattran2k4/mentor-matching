package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorVerificationCommand;

public interface ReviewMentorVerificationUseCase {

    AdminMentorVerificationDetail reviewMentorVerification(ReviewMentorVerificationCommand command);
}
