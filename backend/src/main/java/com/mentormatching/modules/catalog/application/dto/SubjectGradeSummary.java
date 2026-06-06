package com.mentormatching.modules.catalog.application.dto;

public record SubjectGradeSummary(Long subjectGradeId, Long subjectId, String subjectName, Long gradeId,
                                  String gradeName) {
}
