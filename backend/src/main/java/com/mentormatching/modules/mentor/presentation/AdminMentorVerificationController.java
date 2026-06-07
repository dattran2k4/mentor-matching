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

import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationDetail;
import com.mentormatching.modules.mentor.application.dto.AdminMentorVerificationListItem;
import com.mentormatching.modules.mentor.application.dto.GetAdminMentorVerificationsQuery;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorVerificationDetailUseCase;
import com.mentormatching.modules.mentor.application.port.in.GetAdminMentorVerificationsUseCase;
import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.modules.mentor.presentation.dto.response.AdminMentorVerificationDetailResponse;
import com.mentormatching.modules.mentor.presentation.dto.response.AdminMentorVerificationListItemResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/admin/mentor-verifications")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMentorVerificationController {

    private final GetAdminMentorVerificationsUseCase getAdminMentorVerificationsUseCase;
    private final GetAdminMentorVerificationDetailUseCase getAdminMentorVerificationDetailUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping
    public ApiResponse<PageResponse<AdminMentorVerificationListItemResponse>> getMentorVerifications(
            @RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
            @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
            @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir,
            @RequestParam(required = false) MentorVerificationStatus status) {
        PageResponse<AdminMentorVerificationListItem> verifications = getAdminMentorVerificationsUseCase
                .getAdminMentorVerifications(new GetAdminMentorVerificationsQuery(page, size, sortBy, sortDir,
                        status));
        return apiResponseFactory.success(AdminMentorVerificationListItemResponse.from(verifications),
                "Get mentor verifications successfully");
    }

    @GetMapping("/{verificationId}")
    public ApiResponse<AdminMentorVerificationDetailResponse> getMentorVerificationDetail(
            @PathVariable Long verificationId) {
        AdminMentorVerificationDetail verification = getAdminMentorVerificationDetailUseCase
                .getAdminMentorVerificationDetail(verificationId);
        return apiResponseFactory.success(AdminMentorVerificationDetailResponse.from(verification),
                "Get mentor verification detail successfully");
    }
}
