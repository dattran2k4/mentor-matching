package com.mentormatching.modules.mentor.application.dto;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;

public record GetMentorsQuery(int page, int size, String sortBy, String sortDir, String search,
                              Gender gender, MeetingType meetingType, Long cityId, Long districtId,
                              Long subjectId, Long gradeId) {
}
