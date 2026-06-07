package com.mentormatching.modules.mentor.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorVerificationUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpsertCurrentMentorVerificationUseCase;
import com.mentormatching.modules.mentor.presentation.dto.request.UpsertCurrentMentorVerificationRequest;
import com.mentormatching.modules.mentor.presentation.dto.response.CurrentMentorVerificationResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorVerificationController {

    private final GetCurrentMentorVerificationUseCase getCurrentMentorVerificationUseCase;
    private final UpsertCurrentMentorVerificationUseCase upsertCurrentMentorVerificationUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me/verification")
    public ApiResponse<CurrentMentorVerificationResponse> getCurrentMentorVerification(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(CurrentMentorVerificationResponse.from(
                        getCurrentMentorVerificationUseCase.getCurrentMentorVerification(principal.getId())),
                "Get current mentor verification successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me/verification")
    public ApiResponse<CurrentMentorVerificationResponse> upsertCurrentMentorVerification(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @Valid @RequestBody UpsertCurrentMentorVerificationRequest request) {
        return apiResponseFactory.success(CurrentMentorVerificationResponse.from(
                        upsertCurrentMentorVerificationUseCase.upsertCurrentMentorVerification(
                                request.toCommand(principal))),
                "Save current mentor verification successfully");
    }
}
