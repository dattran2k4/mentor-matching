package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorTraitSelections;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorTraitsCommand;

public interface UpdateCurrentMentorTraitsUseCase {

    CurrentMentorTraitSelections updateCurrentMentorTraits(UpdateCurrentMentorTraitsCommand command);
}
