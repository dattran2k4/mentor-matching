package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public record SubjectGradeRestoreData(Long id, Long subjectId, Long gradeId, LocalDateTime createdAt) {
}
