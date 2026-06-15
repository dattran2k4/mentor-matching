package com.mentormatching.modules.scheduling.application.port.out;

import com.mentormatching.modules.scheduling.application.dto.SchedulingMentorSnapshot;

public interface SchedulingMentorLookupPort {

    SchedulingMentorSnapshot getMentor(Long mentorId);
}
