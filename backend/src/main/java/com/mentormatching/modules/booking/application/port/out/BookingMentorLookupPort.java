package com.mentormatching.modules.booking.application.port.out;

import com.mentormatching.modules.booking.application.dto.BookingMentorSnapshot;

public interface BookingMentorLookupPort {

    BookingMentorSnapshot getMentorSnapshot(Long mentorId);

    BookingMentorSnapshot getMentorSnapshotByUserId(Long userId);
}
