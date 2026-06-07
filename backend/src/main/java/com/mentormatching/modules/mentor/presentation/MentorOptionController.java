package com.mentormatching.modules.mentor.presentation;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;
import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorTraitsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetHighlightOptionsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorTraitsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetPersonalityOptionsUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpdateCurrentMentorTraitsUseCase;
import com.mentormatching.modules.mentor.presentation.dto.request.UpdateCurrentMentorTraitsRequest;
import com.mentormatching.modules.mentor.presentation.dto.response.CurrentMentorTraitsResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorOptionDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorTraitsDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorOptionController {

    private final GetCurrentMentorTraitsUseCase getCurrentMentorTraitsUseCase;
    private final GetPersonalityOptionsUseCase getPersonalityOptionsUseCase;
    private final GetHighlightOptionsUseCase getHighlightOptionsUseCase;
    private final GetMentorTraitsUseCase getMentorTraitsUseCase;
    private final UpdateCurrentMentorTraitsUseCase updateCurrentMentorTraitsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me/traits")
    public ApiResponse<CurrentMentorTraitsResponse> getCurrentMentorTraits(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(CurrentMentorTraitsResponse.from(
                getCurrentMentorTraitsUseCase.getCurrentMentorTraits(principal.getId())),
                "Get current mentor traits successfully");
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/me/traits")
    public ApiResponse<CurrentMentorTraitsResponse> updateCurrentMentorTraits(
            @AuthenticationPrincipal AuthenticatedPrincipal principal,
            @Valid @RequestBody UpdateCurrentMentorTraitsRequest request) {
        return apiResponseFactory.success(CurrentMentorTraitsResponse.from(
                updateCurrentMentorTraitsUseCase.updateCurrentMentorTraits(request.toCommand(principal))),
                "Update current mentor traits successfully");
    }

    @GetMapping("/personality-options")
    public ApiResponse<List<MentorOptionDetailResponse>> getPersonalityOptions() {
        List<MentorOptionDetailResponse> options = getPersonalityOptionsUseCase.getPersonalityOptions().stream()
                .map(MentorOptionDetailResponse::from)
                .toList();
        return apiResponseFactory.success(options, "Get personality options successfully");
    }

    @GetMapping("/highlight-options")
    public ApiResponse<List<MentorOptionDetailResponse>> getHighlightOptions() {
        List<MentorOptionDetailResponse> options = getHighlightOptionsUseCase.getHighlightOptions().stream()
                .map(MentorOptionDetailResponse::from)
                .toList();
        return apiResponseFactory.success(options, "Get highlight options successfully");
    }

    @GetMapping("/{id}/traits")
    public ApiResponse<MentorTraitsDetailResponse> getMentorTraits(@PathVariable Long id) {
        MentorTraitsDetail traits = getMentorTraitsUseCase.getMentorTraits(id);
        return apiResponseFactory.success(MentorTraitsDetailResponse.from(traits), "Get mentor traits successfully");
    }
}
