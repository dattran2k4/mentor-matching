package com.mentormatching.modules.scheduling.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record SchedulingBookingBlock(LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
}
