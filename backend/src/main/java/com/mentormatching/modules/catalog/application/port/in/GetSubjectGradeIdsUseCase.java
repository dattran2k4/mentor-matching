package com.mentormatching.modules.catalog.application.port.in;

import java.util.List;

public interface GetSubjectGradeIdsUseCase {
    List<Long> getSubjectGradeIds(Long subjectId, Long gradeId);
}
