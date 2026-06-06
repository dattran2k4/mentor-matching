package com.mentormatching.modules.user.presentation.dto.request;

import com.mentormatching.modules.user.application.dto.UpdateCurrentLearnerProfileCommand;
import com.mentormatching.modules.user.domain.LearnerGender;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;
import com.mentormatching.shared.validation.EnumValue;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UpdateCurrentLearnerProfileRequest(
        @EnumValue(name = "Gender", message = "Gender must be one of: MALE, FEMALE, OTHER") LearnerGender gender,
        @Min(value = 1900, message = "Birth year must be greater than or equal to 1900")
        @Max(value = 2100, message = "Birth year must be less than or equal to 2100") Integer birthYear,
        @Size(max = 255, message = "School name must not exceed 255 characters") String schoolName,
        Long gradeId,
        @Size(max = 2000, message = "Learning goal must not exceed 2000 characters") String learningGoal
) {

    public UpdateCurrentLearnerProfileCommand toCommand(AuthenticatedPrincipal principal) {
        return new UpdateCurrentLearnerProfileCommand(principal.getId(), gender, birthYear, schoolName, gradeId,
                learningGoal);
    }
}
