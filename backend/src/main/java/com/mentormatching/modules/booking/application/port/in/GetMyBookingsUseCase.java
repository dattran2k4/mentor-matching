package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.shared.response.PageResponse;

public interface GetMyBookingsUseCase {

    PageResponse<Booking> getMyBookings(GetMyBookingsQuery query);
}
