package com.mentormatching.modules.scheduling.presentation;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.scheduling.application.dto.CurrentMentorAvailabilityDetail;
import com.mentormatching.modules.scheduling.application.port.in.GetCurrentMentorAvailabilitiesUseCase;
import com.mentormatching.modules.scheduling.presentation.dto.response.CurrentMentorAvailabilityResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/scheduling")
public class SchedulingController {

    private final GetCurrentMentorAvailabilitiesUseCase getCurrentMentorAvailabilitiesUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping("/me/availabilities")
    @PreAuthorize("hasRole('MENTOR')")
    public ApiResponse<List<CurrentMentorAvailabilityResponse>> getCurrentMentorAvailabilities(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        List<CurrentMentorAvailabilityDetail> availabilities = getCurrentMentorAvailabilitiesUseCase
                .getCurrentMentorAvailabilities(principal.getId());
        return apiResponseFactory.success(
                availabilities.stream().map(CurrentMentorAvailabilityResponse::from).toList(),
                "Get current mentor availabilities successfully");
    }
}
