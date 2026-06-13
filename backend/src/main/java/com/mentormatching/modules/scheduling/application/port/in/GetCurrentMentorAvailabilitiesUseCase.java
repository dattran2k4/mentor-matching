package com.mentormatching.modules.scheduling.application.port.in;

import java.util.List;

import com.mentormatching.modules.scheduling.application.dto.CurrentMentorAvailabilityDetail;

public interface GetCurrentMentorAvailabilitiesUseCase {

    List<CurrentMentorAvailabilityDetail> getCurrentMentorAvailabilities(Long userId);
}
