package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.shared.response.PageResponse;

public interface GetMentorsUseCase {

    PageResponse<MentorListItem> getMentors(GetMentorsQuery query);
}
