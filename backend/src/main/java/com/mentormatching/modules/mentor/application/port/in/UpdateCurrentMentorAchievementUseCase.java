package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorAchievementCommand;

public interface UpdateCurrentMentorAchievementUseCase {

    MentorAchievementDetail updateCurrentMentorAchievement(UpdateCurrentMentorAchievementCommand command);
}
