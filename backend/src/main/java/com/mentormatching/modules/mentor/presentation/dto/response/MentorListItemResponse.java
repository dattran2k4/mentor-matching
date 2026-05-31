package com.mentormatching.modules.mentor.presentation.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.shared.response.PageResponse;

public record MentorListItemResponse(Long id, Long userId, String fullName, String avatarUrl, Gender gender,
                                     String headline, Integer experienceYears, String currentPosition,
                                     String workplace, String education, String major, MeetingType meetingType,
                                     LocalDateTime createdAt) {

    public static MentorListItemResponse from(MentorListItem mentor) {
        return new MentorListItemResponse(mentor.id(), mentor.userId(), mentor.fullName(), mentor.avatarUrl(),
                mentor.gender(), mentor.headline(), mentor.experienceYears(), mentor.currentPosition(),
                mentor.workplace(), mentor.education(), mentor.major(), mentor.meetingType(), mentor.createdAt());
    }

    public static PageResponse<MentorListItemResponse> from(PageResponse<MentorListItem> mentors) {
        List<MentorListItemResponse> data = mentors.getData().stream().map(MentorListItemResponse::from).toList();
        return PageResponse.<MentorListItemResponse>builder()
                .page(mentors.getPage())
                .pageSize(mentors.getPageSize())
                .totalPages(mentors.getTotalPages())
                .totalItems(mentors.getTotalItems())
                .data(data)
                .build();
    }
}
