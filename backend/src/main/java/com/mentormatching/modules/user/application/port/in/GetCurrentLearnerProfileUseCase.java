package com.mentormatching.modules.user.application.port.in;

import com.mentormatching.modules.user.application.dto.LearnerProfileDetails;

public interface GetCurrentLearnerProfileUseCase {

    LearnerProfileDetails getCurrentLearnerProfile(Long userId);
}
