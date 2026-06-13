package com.mentormatching.modules.scheduling.application.port.in;

import com.mentormatching.modules.scheduling.application.dto.CreateCurrentMentorAvailabilityCommand;

public interface CreateCurrentMentorAvailabilityUseCase {

    Long createCurrentMentorAvailability(CreateCurrentMentorAvailabilityCommand command);
}
