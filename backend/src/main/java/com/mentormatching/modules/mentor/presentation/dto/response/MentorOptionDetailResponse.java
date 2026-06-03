package com.mentormatching.modules.mentor.presentation.dto.response;

import com.mentormatching.modules.mentor.application.dto.MentorOptionDetail;

public record MentorOptionDetailResponse(Long id, String name, String description) {

    public static MentorOptionDetailResponse from(MentorOptionDetail option) {
        return new MentorOptionDetailResponse(option.id(), option.name(), option.description());
    }
}
