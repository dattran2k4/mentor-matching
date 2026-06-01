package com.mentormatching.modules.booking.application.port.out;

import com.mentormatching.modules.booking.application.dto.BookingUserSnapshot;

public interface BookingUserLookupPort {

    BookingUserSnapshot getUserSnapshot(Long userId);
}
