package com.mentormatching.modules.booking.application.port.in;

import java.time.LocalDate;
import java.util.List;

import com.mentormatching.modules.booking.application.dto.BookingScheduleBlock;

public interface GetMentorScheduleBlocksUseCase {

    List<BookingScheduleBlock> getMentorScheduleBlocks(Long mentorId, LocalDate from, LocalDate to);
}
