package com.mentormatching.modules.mentor.infrastructure.lookup;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.catalog.application.port.in.GetSubjectGradeIdsUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorCatalogLookupPort;

@Component
public class MentorCatalogLookupAdapter implements MentorCatalogLookupPort {

    private final GetSubjectGradeIdsUseCase getSubjectGradeIdsUseCase;

    public MentorCatalogLookupAdapter(GetSubjectGradeIdsUseCase getSubjectGradeIdsUseCase) {
        this.getSubjectGradeIdsUseCase = getSubjectGradeIdsUseCase;
    }

    @Override
    public List<Long> getSubjectGradeIds(Long subjectId, Long gradeId) {
        return getSubjectGradeIdsUseCase.getSubjectGradeIds(subjectId, gradeId);
    }
}
