package com.mentormatching.modules.mentor.application.port.in;

public interface DeleteCurrentMentorAchievementUseCase {

    void deleteCurrentMentorAchievement(Long userId, Long achievementId);
}
