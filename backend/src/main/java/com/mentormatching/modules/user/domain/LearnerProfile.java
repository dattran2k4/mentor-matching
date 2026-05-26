package com.mentormatching.modules.user.domain;

import java.time.LocalDateTime;

public class LearnerProfile {

    private final Long id;
    private final Long userId;
    private LearnerGender gender;
    private Integer birthYear;
    private String schoolName;
    private Long gradeId;
    private String learningGoal;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private LearnerProfile(LearnerProfileRestoreData data) {
        this.id = data.id();
        this.userId = data.userId();
        this.gender = data.gender();
        this.birthYear = data.birthYear();
        this.schoolName = data.schoolName();
        this.gradeId = data.gradeId();
        this.learningGoal = data.learningGoal();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static LearnerProfile restore(LearnerProfileRestoreData data) {
        return new LearnerProfile(data);
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public LearnerGender getGender() {
        return gender;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public String getLearningGoal() {
        return learningGoal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
