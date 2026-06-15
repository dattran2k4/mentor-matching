package com.mentormatching.modules.scheduling.application.port.in;

import com.mentormatching.modules.scheduling.application.dto.UpdateCurrentMentorAvailabilityCommand;

public interface UpdateCurrentMentorAvailabilityUseCase {

    void updateCurrentMentorAvailability(UpdateCurrentMentorAvailabilityCommand command);
}
