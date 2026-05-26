package com.mentormatching.modules.catalog.application.service;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.catalog.application.dto.SubjectGradeSummary;
import com.mentormatching.modules.catalog.application.port.in.GetSubjectGradeSummaryUseCase;
import com.mentormatching.modules.catalog.application.port.out.GradeRepositoryPort;
import com.mentormatching.modules.catalog.application.port.out.SubjectGradeRepositoryPort;
import com.mentormatching.modules.catalog.application.port.out.SubjectRepositoryPort;
import com.mentormatching.modules.catalog.domain.Subject;
import com.mentormatching.modules.catalog.domain.SubjectGrade;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class CatalogQueryService implements GetSubjectGradeSummaryUseCase {

    private final SubjectGradeRepositoryPort subjectGradeRepositoryPort;
    private final SubjectRepositoryPort subjectRepositoryPort;
    private final GradeRepositoryPort gradeRepositoryPort;

    public CatalogQueryService(SubjectGradeRepositoryPort subjectGradeRepositoryPort,
                               SubjectRepositoryPort subjectRepositoryPort,
                               GradeRepositoryPort gradeRepositoryPort) {
        this.subjectGradeRepositoryPort = subjectGradeRepositoryPort;
        this.subjectRepositoryPort = subjectRepositoryPort;
        this.gradeRepositoryPort = gradeRepositoryPort;
    }

    @Override
    public SubjectGradeSummary getSubjectGradeSummary(Long subjectGradeId) {
        SubjectGrade subjectGrade = subjectGradeRepositoryPort.findById(subjectGradeId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject grade not found"));
        Subject subject = subjectRepositoryPort.findById(subjectGrade.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        String gradeName = subjectGrade.getGradeId() == null ? null : gradeRepositoryPort.findById(
                subjectGrade.getGradeId()).map(grade -> grade.getName()).orElse(null);
        return new SubjectGradeSummary(subjectGrade.getId(), subject.getName(), gradeName);
    }
}
