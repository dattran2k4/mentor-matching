package com.mentormatching.modules.catalog.application.port.in;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;

public interface GetSubjectGradeSummaryUseCase {

    SubjectGradeSummary getSubjectGradeSummary(Long subjectGradeId);
}
