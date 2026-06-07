package com.mentormatching.modules.mentor.presentation;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAvailabilitiesUseCase;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorAvailabilityDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorAvailabilityController {

    private final GetMentorAvailabilitiesUseCase getMentorAvailabilitiesUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping("/{id}/availabilities")
    public ApiResponse<List<MentorAvailabilityDetailResponse>> getMentorAvailabilities(@PathVariable Long id) {
        List<MentorAvailabilityDetail> availabilities = getMentorAvailabilitiesUseCase.getMentorAvailabilities(id);
        return apiResponseFactory.success(availabilities.stream().map(MentorAvailabilityDetailResponse::from).toList(),
                "Get mentor availabilities successfully");
    }
}
