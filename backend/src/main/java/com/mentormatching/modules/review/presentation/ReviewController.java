package com.mentormatching.modules.review.presentation;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_PAGE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SIZE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.review.application.port.in.CreateReviewUseCase;
import com.mentormatching.modules.review.application.port.in.GetMentorReviewsUseCase;
import com.mentormatching.modules.review.application.port.in.GetReviewDetailUseCase;
import com.mentormatching.modules.review.presentation.dto.request.CreateReviewRequest;
import com.mentormatching.modules.review.presentation.dto.response.CreateReviewResponse;
import com.mentormatching.modules.review.presentation.dto.response.MentorReviewResponse;
import com.mentormatching.modules.review.presentation.dto.response.ReviewDetailResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final CreateReviewUseCase createReviewUseCase;
    private final GetReviewDetailUseCase getReviewDetailUseCase;
    private final GetMentorReviewsUseCase getMentorReviewsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CreateReviewResponse> createReview(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                          @Valid @RequestBody CreateReviewRequest request) {
        Long reviewId = createReviewUseCase.createReview(request.toCommand(principal));
        return apiResponseFactory.created(CreateReviewResponse.from(reviewId), "Create review successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<ReviewDetailResponse> getReviewDetail(@PathVariable Long id) {
        ReviewDetailResponse detail = ReviewDetailResponse.from(getReviewDetailUseCase.getReviewDetail(id));
        return apiResponseFactory.success(detail, "Get review detail successfully");
    }

    @GetMapping("/mentor/{mentorId}")
    public ApiResponse<PageResponse<MentorReviewResponse>> getMentorReviews(@PathVariable Long mentorId,
                                                                            @RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
                                                                            @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
                                                                            @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
                                                                            @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir) {
        PageResponse<com.mentormatching.modules.review.application.dto.MentorReviewItem> reviews =
                getMentorReviewsUseCase.getMentorReviews(mentorId, page, size, sortBy, sortDir);
        return apiResponseFactory.success(MentorReviewResponse.from(reviews), "Get mentor reviews successfully");
    }
}
