package com.mentormatching.modules.mentor.presentation.dto.request;

import java.math.BigDecimal;

import com.mentormatching.modules.mentor.application.dto.UpsertCurrentMentorSubjectCommand;
import com.mentormatching.modules.mentor.domain.ProficiencyLevel;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record UpsertCurrentMentorSubjectRequest(
        Long id,
        @NotNull(message = "Subject grade ID is required") Long subjectGradeId,
        @NotNull(message = "Proficiency level is required") ProficiencyLevel proficiencyLevel,
        String teachingNote,
        @NotNull(message = "Price per hour is required")
        @DecimalMin(value = "0.0", inclusive = true, message = "Price per hour must be greater than or equal to 0") BigDecimal pricePerHour,
        @NotNull(message = "Active status is required") Boolean active
) {

    public UpsertCurrentMentorSubjectCommand toCommand(AuthenticatedPrincipal principal) {
        return new UpsertCurrentMentorSubjectCommand(principal.getId(), id, subjectGradeId, proficiencyLevel,
                teachingNote, pricePerHour, active);
    }
}
