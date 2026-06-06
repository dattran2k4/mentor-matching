package com.mentormatching.modules.user.domain;

import java.time.LocalDateTime;

import com.mentormatching.shared.exception.InvalidDataException;

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

    public static LearnerProfile create(Long userId, LearnerGender gender, Integer birthYear, String schoolName,
                                        Long gradeId, String learningGoal) {
        validateBirthYear(birthYear);
        LocalDateTime now = LocalDateTime.now();
        return new LearnerProfile(new LearnerProfileRestoreData(null, userId, gender, birthYear, schoolName,
                gradeId, learningGoal, now, now));
    }

    public void updateProfile(LearnerGender gender, Integer birthYear, String schoolName, Long gradeId,
                              String learningGoal) {
        validateBirthYear(birthYear);
        this.gender = gender;
        this.birthYear = birthYear;
        this.schoolName = schoolName;
        this.gradeId = gradeId;
        this.learningGoal = learningGoal;
        touch();
    }

    private static void validateBirthYear(Integer birthYear) {
        if (birthYear != null && birthYear > LocalDateTime.now().getYear()) {
            throw new InvalidDataException("Birth year must not be in the future");
        }
    }

    private void touch() {
        updatedAt = LocalDateTime.now();
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
