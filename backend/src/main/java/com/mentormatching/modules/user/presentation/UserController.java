package com.mentormatching.modules.user.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.user.application.port.in.GetCurrentUserUseCase;
import com.mentormatching.modules.user.presentation.dto.response.CurrentUserResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final ApiResponseFactory apiResponseFactory;
    private final GetCurrentUserUseCase getCurrentUserUseCase;

    @GetMapping("/public-check")
    public ApiResponse<String> publicCheck() {
        return apiResponseFactory.success("User public endpoint is reachable");
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> me(@AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(CurrentUserResponse.from(getCurrentUserUseCase.getCurrentUser(
                principal.getId())));
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
