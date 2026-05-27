package com.mentormatching.modules.booking.infrastructure.lookup;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.dto.BookingMentorSubjectSnapshot;
import com.mentormatching.modules.booking.application.port.out.BookingMentorSubjectLookupPort;
import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;
import com.mentormatching.modules.catalog.application.port.in.GetSubjectGradeSummaryUseCase;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectSummary;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSubjectSummaryUseCase;

@Component
public class BookingMentorSubjectLookupAdapter implements BookingMentorSubjectLookupPort {

    private final GetMentorSubjectSummaryUseCase getMentorSubjectSummaryUseCase;
    private final GetSubjectGradeSummaryUseCase getSubjectGradeSummaryUseCase;

    public BookingMentorSubjectLookupAdapter(GetMentorSubjectSummaryUseCase getMentorSubjectSummaryUseCase,
                                             GetSubjectGradeSummaryUseCase getSubjectGradeSummaryUseCase) {
        this.getMentorSubjectSummaryUseCase = getMentorSubjectSummaryUseCase;
        this.getSubjectGradeSummaryUseCase = getSubjectGradeSummaryUseCase;
    }

    @Override
    public BookingMentorSubjectSnapshot getMentorSubjectSnapshot(Long mentorSubjectId) {
        MentorSubjectSummary mentorSubject = getMentorSubjectSummaryUseCase.getMentorSubjectSummary(mentorSubjectId);
        SubjectGradeSummary subjectGrade = getSubjectGradeSummaryUseCase.getSubjectGradeSummary(
                mentorSubject.subjectGradeId());
        return new BookingMentorSubjectSnapshot(mentorSubject.mentorSubjectId(), mentorSubject.mentorId(),
                subjectGrade.subjectName(), subjectGrade.gradeName(), mentorSubject.pricePerHour(),
                mentorSubject.active());
    }
}
