package com.mentormatching.modules.catalog.domain;

import java.time.LocalDateTime;

public class SubjectGrade {

    private final Long id;
    private final Long subjectId;
    private final Long gradeId;
    private final LocalDateTime createdAt;

    private SubjectGrade(SubjectGradeRestoreData data) {
        this.id = data.id();
        this.subjectId = data.subjectId();
        this.gradeId = data.gradeId();
        this.createdAt = data.createdAt();
    }

    public static SubjectGrade restore(SubjectGradeRestoreData data) {
        return new SubjectGrade(data);
    }

    public Long getId() {
        return id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
