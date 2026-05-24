package com.mentormatching.modules.booking.presentation;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_PAGE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SIZE;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.application.port.in.CreateBookingUseCase;
import com.mentormatching.modules.booking.application.port.in.GetMyBookingsUseCase;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.presentation.dto.request.CreateBookingRequest;
import com.mentormatching.modules.booking.presentation.dto.response.BookingResponse;
import com.mentormatching.modules.booking.presentation.dto.response.CreateBookingResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;
import com.mentormatching.shared.response.PageResponse;
import com.mentormatching.shared.security.model.AuthenticatedPrincipal;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final GetMyBookingsUseCase getMyBookingsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CreateBookingResponse> createBooking(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                            @Valid @RequestBody CreateBookingRequest request) {
        Long bookingId = createBookingUseCase.createBooking(request.toCommand(principal));
        return apiResponseFactory.created(CreateBookingResponse.from(bookingId), "Create booking successfully");
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<PageResponse<BookingResponse>> getMyBookings(@AuthenticationPrincipal AuthenticatedPrincipal principal,
                                                                    @RequestParam(defaultValue = DEFAULT_PAGE) @Min(1) int page,
                                                                    @RequestParam(defaultValue = DEFAULT_SIZE) @Min(1) @Max(100) int size,
                                                                    @RequestParam(defaultValue = DEFAULT_SORT_BY) String sortBy,
                                                                    @RequestParam(defaultValue = DEFAULT_SORT_DIR) String sortDir,
                                                                    @RequestParam(required = false) BookingStatus status,
                                                                    @RequestParam(required = false) BookingMeetingType meetingType) {
        PageResponse<Booking> bookings = getMyBookingsUseCase.getMyBookings(new GetMyBookingsQuery(
                principal.getId(), page, size, sortBy, sortDir, status, meetingType));
        return apiResponseFactory.success(BookingResponse.from(bookings), "Get my bookings successfully");
    }
}
