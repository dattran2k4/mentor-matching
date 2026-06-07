package com.mentormatching.modules.mentor.presentation;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.port.in.GetHighlightOptionsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetPersonalityOptionsUseCase;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorOptionDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorOptionController {

    private final GetPersonalityOptionsUseCase getPersonalityOptionsUseCase;
    private final GetHighlightOptionsUseCase getHighlightOptionsUseCase;
    private final ApiResponseFactory apiResponseFactory;

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
}
