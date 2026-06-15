package com.mentormatching.modules.booking.application.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingScheduleBlock(LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
}
