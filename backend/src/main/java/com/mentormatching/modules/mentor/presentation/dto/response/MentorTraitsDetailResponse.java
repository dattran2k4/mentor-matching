package com.mentormatching.modules.mentor.presentation.dto.response;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;

public record MentorTraitsDetailResponse(List<MentorOptionDetailResponse> personalities,
                                         List<MentorOptionDetailResponse> highlights) {

    public static MentorTraitsDetailResponse from(MentorTraitsDetail traits) {
        return new MentorTraitsDetailResponse(
                traits.personalities().stream().map(MentorOptionDetailResponse::from).toList(),
                traits.highlights().stream().map(MentorOptionDetailResponse::from).toList());
    }
}
