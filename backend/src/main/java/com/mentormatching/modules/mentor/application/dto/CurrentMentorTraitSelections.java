package com.mentormatching.modules.mentor.application.dto;

import java.util.List;

public record CurrentMentorTraitSelections(List<Long> personalityOptionIds, List<Long> highlightOptionIds) {
}
