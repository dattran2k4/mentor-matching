package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationListItem;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorVerificationsQuery;
import com.mentormatching.shared.response.PageResponse;

public interface GetAdminMentorVerificationsUseCase {

    PageResponse<AdminMentorVerificationListItem> getAdminMentorVerifications(GetAdminMentorVerificationsQuery query);
}
