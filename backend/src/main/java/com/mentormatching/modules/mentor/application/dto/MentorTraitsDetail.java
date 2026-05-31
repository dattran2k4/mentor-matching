package com.mentormatching.modules.mentor.application.dto;

import java.util.List;

public record MentorTraitsDetail(List<MentorOptionDetail> personalities, List<MentorOptionDetail> highlights) {
}
