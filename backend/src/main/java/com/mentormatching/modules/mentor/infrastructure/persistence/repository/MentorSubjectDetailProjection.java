package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.math.BigDecimal;

import com.mentormatching.modules.mentor.domain.ProficiencyLevel;

public interface MentorSubjectDetailProjection {

    Long getId();

    Long getSubjectGradeId();

    Long getSubjectId();

    String getSubjectName();

    Long getGradeId();

    String getGradeName();

    ProficiencyLevel getProficiencyLevel();

    String getTeachingNote();

    BigDecimal getPricePerHour();

    Boolean getActive();
}
