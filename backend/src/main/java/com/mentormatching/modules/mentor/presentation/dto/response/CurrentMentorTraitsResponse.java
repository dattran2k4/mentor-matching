package com.mentormatching.modules.mentor.presentation.dto.response;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorTraitSelections;

public record CurrentMentorTraitsResponse(List<Long> personalityOptionIds, List<Long> highlightOptionIds) {

    public static CurrentMentorTraitsResponse from(CurrentMentorTraitSelections traits) {
        return new CurrentMentorTraitsResponse(traits.personalityOptionIds(), traits.highlightOptionIds());
    }
}
