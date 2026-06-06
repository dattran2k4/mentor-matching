package com.mentormatching.modules.mentor.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.mentormatching.shared.exception.InvalidDataException;

public class MentorSubject {

    private final Long id;
    private final Long mentorId;
    private Long subjectGradeId;
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

    public static MentorSubject create(Long mentorId, Long subjectGradeId, ProficiencyLevel proficiencyLevel,
                                       String teachingNote, BigDecimal pricePerHour, Boolean active) {
        validatePricePerHour(pricePerHour);
        return new MentorSubject(new MentorSubjectRestoreData(null, mentorId, subjectGradeId, proficiencyLevel,
                teachingNote, pricePerHour, active, null, null));
    }

    public void updateOffering(Long subjectGradeId, ProficiencyLevel proficiencyLevel, String teachingNote,
                               BigDecimal pricePerHour, Boolean active) {
        validatePricePerHour(pricePerHour);
        this.subjectGradeId = subjectGradeId;
        this.proficiencyLevel = proficiencyLevel;
        this.teachingNote = teachingNote;
        this.pricePerHour = pricePerHour;
        this.active = active;
    }

    private static void validatePricePerHour(BigDecimal pricePerHour) {
        if (pricePerHour != null && pricePerHour.signum() < 0) {
            throw new InvalidDataException("Price per hour must be greater than or equal to 0");
        }
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
