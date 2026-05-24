package com.mentormatching.modules.booking.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.booking.application.port.in.CreateBookingUseCase;
import com.mentormatching.modules.booking.presentation.dto.request.CreateBookingRequest;
import com.mentormatching.modules.booking.presentation.dto.response.CreateBookingResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CreateBookingResponse> createBooking(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                            @Valid @RequestBody CreateBookingRequest request) {
        Long bookingId = createBookingUseCase.createBooking(request.toCommand(principal.getId()));
        return apiResponseFactory.created(CreateBookingResponse.from(bookingId), "Create booking successfully");
    }
}
