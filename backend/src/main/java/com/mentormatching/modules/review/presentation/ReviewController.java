package com.mentormatching.modules.review.presentation;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.review.application.port.in.CreateReviewUseCase;
import com.mentormatching.modules.review.presentation.dto.request.CreateReviewRequest;
import com.mentormatching.modules.review.presentation.dto.response.CreateReviewResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final CreateReviewUseCase createReviewUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CreateReviewResponse> createReview(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                          @Valid @RequestBody CreateReviewRequest request) {
        Long reviewId = createReviewUseCase.createReview(request.toCommand(principal));
        return apiResponseFactory.created(CreateReviewResponse.from(reviewId), "Create review successfully");
    }
}
