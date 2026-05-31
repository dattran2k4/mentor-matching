package com.mentormatching.modules.mentor.application.port.in;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;

public interface GetMentorAvailabilitiesUseCase {

    List<MentorAvailabilityDetail> getMentorAvailabilities(Long mentorId);
}
