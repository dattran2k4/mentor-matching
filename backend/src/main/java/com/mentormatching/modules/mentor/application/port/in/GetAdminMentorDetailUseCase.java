package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorDetail;

public interface GetAdminMentorDetailUseCase {

    AdminMentorDetail getAdminMentorDetail(Long mentorId);
}
