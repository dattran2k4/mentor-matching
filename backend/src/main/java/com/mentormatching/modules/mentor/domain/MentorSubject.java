package com.mentormatching.modules.mentor.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MentorSubject {

    private final Long id;
    private final Long mentorId;
    private final Long subjectGradeId;
    private ProficiencyLevel proficiencyLevel;
    private String teachingNote;
    private BigDecimal pricePerHour;
    private Boolean active;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private MentorSubject(MentorSubjectRestoreData data) {
        this.id = data.id();
        this.mentorId = data.mentorId();
        this.subjectGradeId = data.subjectGradeId();
        this.proficiencyLevel = data.proficiencyLevel();
        this.teachingNote = data.teachingNote();
        this.pricePerHour = data.pricePerHour();
        this.active = data.active();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static MentorSubject restore(MentorSubjectRestoreData data) {
        return new MentorSubject(data);
    }

    public Long getId() {
        return id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getSubjectGradeId() {
        return subjectGradeId;
    }

    public ProficiencyLevel getProficiencyLevel() {
        return proficiencyLevel;
    }

    public String getTeachingNote() {
        return teachingNote;
    }

    public BigDecimal getPricePerHour() {
        return pricePerHour;
    }

    public Boolean getActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
