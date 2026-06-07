package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorDetails;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorCommand;

public interface UpdateCurrentMentorUseCase {

    CurrentMentorDetails updateCurrentMentor(UpdateCurrentMentorCommand command);
}
