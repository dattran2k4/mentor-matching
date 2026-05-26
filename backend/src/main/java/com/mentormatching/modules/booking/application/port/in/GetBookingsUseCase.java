package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.GetBookingsQuery;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.shared.response.PageResponse;

public interface GetBookingsUseCase {

    PageResponse<Booking> getBookings(GetBookingsQuery query);
}
