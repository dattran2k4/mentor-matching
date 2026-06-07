package com.mentormatching.modules.mentor.presentation;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_PAGE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SIZE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.mentor.application.dto.AdminMentorDetail;
import com.mentormatching.modules.mentor.application.dto.AdminMentorListItem;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorsQuery;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorDetailUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorsUseCase;
import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.presentation.dto.response.AdminMentorDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.AdminMentorListItemResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/admin/mentors")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMentorController {

    private final GetAdminMentorsUseCase getAdminMentorsUseCase;
    private final GetAdminMentorDetailUseCase getAdminMentorDetailUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping
    public ApiResponse<PageResponse<AdminMentorListItemResponse>> getAdminMentors(
            @RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
            @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
            @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) MeetingType meetingType,
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) Long districtId,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long gradeId,
            @RequestParam(required = false) MentorApprovalStatus approvalStatus) {
        PageResponse<AdminMentorListItem> mentors = getAdminMentorsUseCase.getAdminMentors(
                new GetAdminMentorsQuery(page, size, sortBy, sortDir, search, gender, meetingType, cityId,
                        districtId, subjectId, gradeId, approvalStatus));
        return apiResponseFactory.success(AdminMentorListItemResponse.from(mentors),
                "Get admin mentors successfully");
    }

    @GetMapping("/{mentorId}")
    public ApiResponse<AdminMentorDetailResponse> getAdminMentorDetail(@PathVariable Long mentorId) {
        AdminMentorDetail mentor = getAdminMentorDetailUseCase.getAdminMentorDetail(mentorId);
        return apiResponseFactory.success(AdminMentorDetailResponse.from(mentor),
                "Get admin mentor detail successfully");
    }
}
