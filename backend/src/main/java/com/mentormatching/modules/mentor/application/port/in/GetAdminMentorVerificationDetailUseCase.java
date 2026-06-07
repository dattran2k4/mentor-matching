package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;

public interface GetAdminMentorVerificationDetailUseCase {

    AdminMentorVerificationDetail getAdminMentorVerificationDetail(Long verificationId);
}
