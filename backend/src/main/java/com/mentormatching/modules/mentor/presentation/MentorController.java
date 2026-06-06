package com.mentormatching.modules.mentor.presentation;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_PAGE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SIZE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.mentor.application.dto.MentorDetail;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;
import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAchievementsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorAvailabilitiesUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorDetailUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorSubjectsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorTraitsUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetMentorsUseCase;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.presentation.dto.response.CurrentMentorResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorAchievementDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorAvailabilityDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorListItemResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorSubjectDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.MentorTraitsDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/mentors")
public class MentorController {

    private final GetCurrentMentorUseCase getCurrentMentorUseCase;
    private final GetMentorsUseCase getMentorsUseCase;
    private final GetMentorDetailUseCase getMentorDetailUseCase;
    private final GetMentorSubjectsUseCase getMentorSubjectsUseCase;
    private final GetMentorTraitsUseCase getMentorTraitsUseCase;
    private final GetMentorAchievementsUseCase getMentorAchievementsUseCase;
    private final GetMentorAvailabilitiesUseCase getMentorAvailabilitiesUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ApiResponse<CurrentMentorResponse> getCurrentMentor(
            @AuthenticationPrincipal AuthenticatedPrincipal principal) {
        return apiResponseFactory.success(CurrentMentorResponse.from(getCurrentMentorUseCase.getCurrentMentor(
                principal.getId())), "Get current mentor profile successfully");
    }

    @GetMapping
    public ApiResponse<PageResponse<MentorListItemResponse>> getMentors(@RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
                                                                        @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
                                                                        @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
                                                                        @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir,
                                                                        @RequestParam(required = false) String search,
                                                                        @RequestParam(required = false) Gender gender,
                                                                        @RequestParam(required = false) MeetingType meetingType,
                                                                        @RequestParam(required = false) Long cityId,
                                                                        @RequestParam(required = false) Long districtId,
                                                                        @RequestParam(required = false) Long subjectId,
                                                                        @RequestParam(required = false) Long gradeId) {
        PageResponse<MentorListItem> mentors = getMentorsUseCase.getMentors(new GetMentorsQuery(page, size, sortBy,
                sortDir, search, gender, meetingType, cityId, districtId, subjectId, gradeId));
        return apiResponseFactory.success(MentorListItemResponse.from(mentors), "Get mentors successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<MentorDetailResponse> getMentorDetail(@PathVariable Long id) {
        MentorDetail mentor = getMentorDetailUseCase.getMentorDetail(id);
        return apiResponseFactory.success(MentorDetailResponse.from(mentor), "Get mentor detail successfully");
    }

    @GetMapping("/{id}/subjects")
    public ApiResponse<List<MentorSubjectDetailResponse>> getMentorSubjects(@PathVariable Long id) {
        List<MentorSubjectDetail> subjects = getMentorSubjectsUseCase.getMentorSubjects(id);
        return apiResponseFactory.success(subjects.stream().map(MentorSubjectDetailResponse::from).toList(),
                "Get mentor subjects successfully");
    }

    @GetMapping("/{id}/traits")
    public ApiResponse<MentorTraitsDetailResponse> getMentorTraits(@PathVariable Long id) {
        MentorTraitsDetail traits = getMentorTraitsUseCase.getMentorTraits(id);
        return apiResponseFactory.success(MentorTraitsDetailResponse.from(traits), "Get mentor traits successfully");
    }

    @GetMapping("/{id}/achievements")
    public ApiResponse<List<MentorAchievementDetailResponse>> getMentorAchievements(@PathVariable Long id) {
        List<MentorAchievementDetail> achievements = getMentorAchievementsUseCase.getMentorAchievements(id);
        return apiResponseFactory.success(achievements.stream().map(MentorAchievementDetailResponse::from).toList(),
                "Get mentor achievements successfully");
    }

    @GetMapping("/{id}/availabilities")
    public ApiResponse<List<MentorAvailabilityDetailResponse>> getMentorAvailabilities(@PathVariable Long id) {
        List<MentorAvailabilityDetail> availabilities = getMentorAvailabilitiesUseCase.getMentorAvailabilities(id);
        return apiResponseFactory.success(availabilities.stream().map(MentorAvailabilityDetailResponse::from).toList(),
                "Get mentor availabilities successfully");
    }
}
