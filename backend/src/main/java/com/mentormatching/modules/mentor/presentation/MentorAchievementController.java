package com.mentormatching.modules.mentor.presentation;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.port.in.CreateCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.application.port.in.DeleteCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorAchievementsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAchievementsUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpdateCurrentMentorAchievementUseCase;
import com.mentormatching.modules.mentor.presentation.dto.request.SaveCurrentMentorAchievementRequest;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorAchievementDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorAchievementController {

    private final GetCurrentMentorAchievementsUseCase getCurrentMentorAchievementsUseCase;
    private final CreateCurrentMentorAchievementUseCase createCurrentMentorAchievementUseCase;
    private final UpdateCurrentMentorAchievementUseCase updateCurrentMentorAchievementUseCase;
    private final DeleteCurrentMentorAchievementUseCase deleteCurrentMentorAchievementUseCase;
    private final GetMentorAchievementsUseCase getMentorAchievementsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me/achievements")
    public ApiResponse<List<MentorAchievementDetailResponse>> getCurrentMentorAchievements(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        List<MentorAchievementDetail> achievements = getCurrentMentorAchievementsUseCase
                .getCurrentMentorAchievements(principal.getId());
        return apiResponseFactory.success(achievements.stream().map(MentorAchievementDetailResponse::from).toList(),
                "Get current mentor achievements successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/me/achievements")
    public ApiResponse<MentorAchievementDetailResponse> createCurrentMentorAchievement(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @Valid @RequestBody SaveCurrentMentorAchievementRequest request) {
        return apiResponseFactory.created(MentorAchievementDetailResponse.from(
                        createCurrentMentorAchievementUseCase.createCurrentMentorAchievement(
                                request.toCreateCommand(principal))),
                "Create current mentor achievement successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me/achievements/{achievementId}")
    public ApiResponse<MentorAchievementDetailResponse> updateCurrentMentorAchievement(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @PathVariable Long achievementId,
            @Valid @RequestBody SaveCurrentMentorAchievementRequest request) {
        return apiResponseFactory.success(MentorAchievementDetailResponse.from(
                        updateCurrentMentorAchievementUseCase.updateCurrentMentorAchievement(
                                request.toUpdateCommand(principal, achievementId))),
                "Update current mentor achievement successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/me/achievements/{achievementId}")
    public ApiResponse<Void> deleteCurrentMentorAchievement(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @PathVariable Long achievementId) {
        deleteCurrentMentorAchievementUseCase.deleteCurrentMentorAchievement(principal.getId(), achievementId);
        return apiResponseFactory.success(null, "Delete current mentor achievement successfully");
    }

    @GetMapping("/{id}/achievements")
    public ApiResponse<List<MentorAchievementDetailResponse>> getMentorAchievements(@PathVariable Long id) {
        List<MentorAchievementDetail> achievements = getMentorAchievementsUseCase.getMentorAchievements(id);
        return apiResponseFactory.success(achievements.stream().map(MentorAchievementDetailResponse::from).toList(),
                "Get mentor achievements successfully");
    }
}
