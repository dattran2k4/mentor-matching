package com.mentormatching.modules.mentor.infrastructure.lookup;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;
import com.mentormatching.modules.catalog.application.port.in.GetSubjectGradeIdsUseCase;
import com.mentormatching.modules.catalog.application.port.in.GetSubjectGradeSummaryUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;

@Component
public class MentorCatalogLookupAdapter implements MentorCatalogLookupPort {

    private final GetSubjectGradeIdsUseCase getSubjectGradeIdsUseCase;
    private final GetSubjectGradeSummaryUseCase getSubjectGradeSummaryUseCase;

    public MentorCatalogLookupAdapter(GetSubjectGradeIdsUseCase getSubjectGradeIdsUseCase,
                                      GetSubjectGradeSummaryUseCase getSubjectGradeSummaryUseCase) {
        this.getSubjectGradeIdsUseCase = getSubjectGradeIdsUseCase;
        this.getSubjectGradeSummaryUseCase = getSubjectGradeSummaryUseCase;
    }

    @Override
    public List<Long> getSubjectGradeIds(Long subjectId, Long gradeId) {
        return getSubjectGradeIdsUseCase.getSubjectGradeIds(subjectId, gradeId);
    }

    @Override
    public SubjectGradeSummary getSubjectGradeSummary(Long subjectGradeId) {
        return getSubjectGradeSummaryUseCase.getSubjectGradeSummary(subjectGradeId);
    }
}
