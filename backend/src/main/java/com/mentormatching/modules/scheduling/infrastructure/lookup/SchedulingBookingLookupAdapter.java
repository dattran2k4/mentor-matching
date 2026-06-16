package com.mentormatching.modules.scheduling.infrastructure.lookup;

import java.time.LocalDate;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.port.in.GetMentorScheduleBlocksUseCase;
import com.mentormatching.modules.scheduling.application.dto.SchedulingBookingBlock;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingBookingLookupPort;

@Component
@RequiredArgsConstructor
public class SchedulingBookingLookupAdapter implements SchedulingBookingLookupPort {

    private final GetMentorScheduleBlocksUseCase getMentorScheduleBlocksUseCase;

    @Override
    public List<SchedulingBookingBlock> getScheduleBlocks(Long mentorId, LocalDate from, LocalDate to) {
        return getMentorScheduleBlocksUseCase.getMentorScheduleBlocks(mentorId, from, to).stream()
                .map(block -> new SchedulingBookingBlock(block.bookingDate(), block.startTime(), block.endTime()))
                .toList();
    }
}
