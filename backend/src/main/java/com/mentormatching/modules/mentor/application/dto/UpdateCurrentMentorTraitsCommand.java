package com.mentormatching.modules.mentor.application.dto;

import java.util.List;

public record UpdateCurrentMentorTraitsCommand(Long userId, List<Long> personalityOptionIds,
                                               List<Long> highlightOptionIds) {
}
