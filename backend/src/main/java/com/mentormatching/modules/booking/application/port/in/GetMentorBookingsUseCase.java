package com.mentormatching.modules.booking.application.port.in;

import com.mentormatching.modules.booking.application.dto.GetMentorBookingsQuery;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.shared.response.PageResponse;

public interface GetMentorBookingsUseCase {

    PageResponse<Booking> getMentorBookings(GetMentorBookingsQuery query);
}
