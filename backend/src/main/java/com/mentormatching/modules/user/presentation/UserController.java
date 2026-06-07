package com.mentormatching.modules.user.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.mentormatching.modules.user.application.port.in.GetCurrentLearnerProfileUseCase;
import com.mentormatching.modules.user.application.port.in.GetCurrentUserUseCase;
import com.mentormatching.modules.user.application.port.in.UpdateCurrentUserUseCase;
import com.mentormatching.modules.user.application.port.in.UpsertCurrentLearnerProfileUseCase;
import com.mentormatching.modules.user.presentation.dto.request.UpdateCurrentLearnerProfileRequest;
import com.mentormatching.modules.user.presentation.dto.request.UpdateCurrentUserRequest;
import com.mentormatching.modules.user.presentation.dto.response.CurrentUserResponse;
import com.mentormatching.modules.user.presentation.dto.response.LearnerProfileResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/users")
public class UserController {

    private final ApiResponseFactory apiResponseFactory;
    private final GetCurrentUserUseCase getCurrentUserUseCase;
    private final GetCurrentLearnerProfileUseCase getCurrentLearnerProfileUseCase;
    private final UpdateCurrentUserUseCase updateCurrentUserUseCase;
    private final UpsertCurrentLearnerProfileUseCase upsertCurrentLearnerProfileUseCase;

    @GetMapping("/public-check")
    public ApiResponse<String> publicCheck() {
        return apiResponseFactory.success("User public endpoint is reachable");
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> me(@AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(CurrentUserResponse.from(getCurrentUserUseCase.getCurrentUser(
                principal.getId())));
    }

    @PutMapping("/me")
    public ApiResponse<CurrentUserResponse> updateMe(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                     @Valid @RequestBody UpdateCurrentUserRequest request) {
        return apiResponseFactory.success(CurrentUserResponse.from(updateCurrentUserUseCase.updateCurrentUser(
                request.toCommand(principal))), "Update user profile successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me/learner-profile")
    public ApiResponse<LearnerProfileResponse> getMyLearnerProfile(@AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(LearnerProfileResponse.from(getCurrentLearnerProfileUseCase.getCurrentLearnerProfile(principal.getId())));
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me/learner-profile")
    public ApiResponse<LearnerProfileResponse> upsertMyLearnerProfile(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @Valid @RequestBody UpdateCurrentLearnerProfileRequest request) {
        return apiResponseFactory.success(LearnerProfileResponse.from(
                upsertCurrentLearnerProfileUseCase.upsertCurrentLearnerProfile(request.toCommand(principal))),
                "Save learner profile successfully");
    }

    @GetMapping("/auth-check")
    public ApiResponse<String> authCheck() {
        return apiResponseFactory.success("Authenticated user endpoint is reachable");
    }

    @GetMapping("/admin-check")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> adminCheck() {
        return apiResponseFactory.success("Admin endpoint is reachable");
    }
}
