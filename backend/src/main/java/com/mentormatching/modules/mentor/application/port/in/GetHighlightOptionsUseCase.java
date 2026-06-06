package com.mentormatching.modules.mentor.application.port.in;

import java.util.List;

import com.mentormatching.modules.mentor.application.dto.MentorOptionDetail;

public interface GetHighlightOptionsUseCase {

    List<MentorOptionDetail> getHighlightOptions();
}
