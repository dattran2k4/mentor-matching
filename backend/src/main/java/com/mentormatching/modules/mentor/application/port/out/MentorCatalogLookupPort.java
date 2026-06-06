package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;

public interface MentorCatalogLookupPort {

    List<Long> getSubjectGradeIds(Long subjectId, Long gradeId);
}
