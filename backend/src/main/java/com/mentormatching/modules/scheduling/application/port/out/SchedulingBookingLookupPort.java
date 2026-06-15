package com.mentormatching.modules.scheduling.application.port.out;

import java.time.LocalDate;
import java.util.List;

import com.mentormatching.modules.scheduling.application.dto.SchedulingBookingBlock;

public interface SchedulingBookingLookupPort {

    List<SchedulingBookingBlock> getScheduleBlocks(Long mentorId, LocalDate from, LocalDate to);
}
