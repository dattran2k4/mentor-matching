package com.mentormatching.modules.user.application.port.in;

import com.mentormatching.modules.user.application.dto.LearnerProfileDetails;
import com.mentormatching.modules.user.application.dto.UpdateCurrentLearnerProfileCommand;

public interface UpsertCurrentLearnerProfileUseCase {

    LearnerProfileDetails upsertCurrentLearnerProfile(UpdateCurrentLearnerProfileCommand command);
}
