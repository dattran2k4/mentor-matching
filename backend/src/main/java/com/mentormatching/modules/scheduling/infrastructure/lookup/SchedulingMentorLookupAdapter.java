package com.mentormatching.modules.scheduling.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.mentor.application.dto.MentorSummary;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSummaryUseCase;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.scheduling.application.dto.SchedulingMentorSnapshot;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingMentorLookupPort;

@Component
public class SchedulingMentorLookupAdapter implements SchedulingMentorLookupPort {

    private final GetMentorSummaryUseCase getMentorSummaryUseCase;

    public SchedulingMentorLookupAdapter(GetMentorSummaryUseCase getMentorSummaryUseCase) {
        this.getMentorSummaryUseCase = getMentorSummaryUseCase;
    }

    @Override
    public SchedulingMentorSnapshot getMentor(Long mentorId) {
        MentorSummary mentor = getMentorSummaryUseCase.getMentorSummary(mentorId);
        return new SchedulingMentorSnapshot(mentor.mentorId(),
                mentor.approvalStatus() == MentorApprovalStatus.APPROVED);
    }
}
