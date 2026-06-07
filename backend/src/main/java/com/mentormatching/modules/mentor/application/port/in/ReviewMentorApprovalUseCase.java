package com.mentormatching.modules.mentor.application.port.in;

import com.mentormatching.modules.mentor.application.dto.AdminMentorDetail;
import com.mentormatching.modules.mentor.application.dto.ReviewMentorApprovalCommand;

public interface ReviewMentorApprovalUseCase {

    AdminMentorDetail reviewMentorApproval(ReviewMentorApprovalCommand command);
}
