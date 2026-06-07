package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorListItem;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorsQuery;
import com.mentormatching.shared.response.PageResponse;

public interface GetAdminMentorsUseCase {

    PageResponse<AdminMentorListItem> getAdminMentors(GetAdminMentorsQuery query);
}
