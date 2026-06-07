package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;

public interface MentorCatalogLookupPort {

    List<Long> getSubjectGradeIds(Long subjectId, Long gradeId);

    SubjectGradeSummary getSubjectGradeSummary(Long subjectGradeId);
}
