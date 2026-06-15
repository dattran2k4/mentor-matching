package com.mentormatching.modules.scheduling.application.service;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mentormatching.modules.scheduling.application.dto.GetMentorCalendarQuery;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDateDetail;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarDetail;
import com.mentormatching.modules.scheduling.application.dto.MentorCalendarWindowDetail;
import com.mentormatching.modules.scheduling.application.dto.SchedulingBookingBlock;
import com.mentormatching.modules.scheduling.application.port.in.GetMentorCalendarUseCase;
import com.mentormatching.modules.scheduling.application.port.out.MentorAvailabilityRepositoryPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingBookingLookupPort;
import com.mentormatching.modules.scheduling.application.port.out.SchedulingMentorLookupPort;
import com.mentormatching.modules.scheduling.domain.AvailabilityType;
import com.mentormatching.modules.scheduling.domain.MentorAvailability;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorCalendarQueryService implements GetMentorCalendarUseCase {

    private static final long MAX_CALENDAR_RANGE_DAYS = 31;

    private final SchedulingMentorLookupPort schedulingMentorLookupPort;
    private final MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort;
    private final SchedulingBookingLookupPort schedulingBookingLookupPort;
    private final Clock clock;

    public MentorCalendarQueryService(SchedulingMentorLookupPort schedulingMentorLookupPort,
            MentorAvailabilityRepositoryPort mentorAvailabilityRepositoryPort,
            SchedulingBookingLookupPort schedulingBookingLookupPort, Clock clock) {
        this.schedulingMentorLookupPort = schedulingMentorLookupPort;
        this.mentorAvailabilityRepositoryPort = mentorAvailabilityRepositoryPort;
        this.schedulingBookingLookupPort = schedulingBookingLookupPort;
        this.clock = clock;
    }

    @Override
    public MentorCalendarDetail getMentorCalendar(GetMentorCalendarQuery query) {
        validateQuery(query);
        ensureApprovedMentor(query.mentorId());
        List<MentorAvailability> availabilities = mentorAvailabilityRepositoryPort.findCalendarAvailabilities(
                query.mentorId(), query.from(), query.to());
        List<SchedulingBookingBlock> bookingBlocks = schedulingBookingLookupPort.getScheduleBlocks(
                query.mentorId(), query.from(), query.to());
        return new MentorCalendarDetail(query.mentorId(), query.from(), query.to(),
                buildCalendarDates(query.from(), query.to(), availabilities, bookingBlocks));
    }

    /**
     * Dựng lịch từng ngày trong khoảng yêu cầu, bao gồm cả ngày không còn khung giờ trống.
     */
    private List<MentorCalendarDateDetail> buildCalendarDates(LocalDate from, LocalDate to,
            List<MentorAvailability> availabilities, List<SchedulingBookingBlock> bookingBlocks) {
        LocalDateTime bookingCutoff = LocalDateTime.now(clock).truncatedTo(ChronoUnit.MINUTES).plusMinutes(1);
        Map<LocalDate, List<TimeWindow>> bookingWindowsByDate = bookingBlocks.stream()
                .collect(Collectors.groupingBy(SchedulingBookingBlock::bookingDate,
                        Collectors.mapping(block -> new TimeWindow(block.startTime(), block.endTime()),
                                Collectors.toList())));

        return from.datesUntil(to.plusDays(1))
                .map(date -> new MentorCalendarDateDetail(date,
                        buildAvailableWindows(date, availabilities,
                                bookingWindowsByDate.getOrDefault(date, List.of()), bookingCutoff)))
                .toList();
    }

    /**
     * Lấy các khung giờ rảnh của một ngày sau khi gộp availability và trừ booking.
     */
    private List<MentorCalendarWindowDetail> buildAvailableWindows(LocalDate date,
            List<MentorAvailability> availabilities, List<TimeWindow> bookingWindows,
            LocalDateTime bookingCutoff) {
        if (date.isBefore(bookingCutoff.toLocalDate())) {
            return List.of();
        }

        List<TimeWindow> availableWindows = availabilities.stream()
                .filter(availability -> appliesToDate(availability, date))
                .map(availability -> new TimeWindow(availability.getStartTime(), availability.getEndTime()))
                .toList();

        return subtractWindows(mergeWindows(availableWindows), mergeWindows(bookingWindows)).stream()
                .map(window -> trimPastTime(date, window, bookingCutoff))
                .filter(window -> window != null)
                .map(window -> new MentorCalendarWindowDetail(window.startTime(), window.endTime()))
                .toList();
    }

    /**
     * Loại thời gian đã qua và cắt đầu window của ngày hiện tại tới phút có thể booking gần nhất.
     */
    private TimeWindow trimPastTime(LocalDate date, TimeWindow window, LocalDateTime bookingCutoff) {
        if (date.isAfter(bookingCutoff.toLocalDate())) {
            return window;
        }

        LocalTime cutoffTime = bookingCutoff.toLocalTime();
        if (!window.endTime().isAfter(cutoffTime)) {
            return null;
        }
        LocalTime startTime = window.startTime().isBefore(cutoffTime) ? cutoffTime : window.startTime();
        return new TimeWindow(startTime, window.endTime());
    }

    /**
     * Kiểm tra availability định kỳ hoặc theo ngày cụ thể có áp dụng cho ngày đang xét.
     */
    private boolean appliesToDate(MentorAvailability availability, LocalDate date) {
        if (availability.getAvailabilityType() == AvailabilityType.RECURRING) {
            return availability.getDayOfWeek() != null
                    && availability.getDayOfWeek() == date.getDayOfWeek().getValue();
        }
        return availability.getAvailableDate() != null && availability.getAvailableDate().isEqual(date);
    }

    /**
     * Gộp các khoảng thời gian bị chồng lấn hoặc liền kề thành một khoảng liên tục.
     */
    private List<TimeWindow> mergeWindows(List<TimeWindow> windows) {
        List<TimeWindow> sortedWindows = windows.stream()
                .sorted(Comparator.comparing(TimeWindow::startTime).thenComparing(TimeWindow::endTime))
                .toList();
        List<TimeWindow> mergedWindows = new ArrayList<>();

        for (TimeWindow window : sortedWindows) {
            if (mergedWindows.isEmpty()) {
                mergedWindows.add(window);
                continue;
            }

            TimeWindow previous = mergedWindows.getLast();
            if (window.startTime().isAfter(previous.endTime())) {
                mergedWindows.add(window);
                continue;
            }

            LocalTime mergedEnd = window.endTime().isAfter(previous.endTime())
                    ? window.endTime()
                    : previous.endTime();
            mergedWindows.set(mergedWindows.size() - 1, new TimeWindow(previous.startTime(), mergedEnd));
        }
        return mergedWindows;
    }

    /**
     * Lần lượt loại các khoảng booking khỏi danh sách khung giờ rảnh.
     */
    private List<TimeWindow> subtractWindows(List<TimeWindow> availableWindows, List<TimeWindow> bookingWindows) {
        List<TimeWindow> remainingWindows = new ArrayList<>(availableWindows);
        for (TimeWindow bookingWindow : bookingWindows) {
            List<TimeWindow> nextWindows = new ArrayList<>();
            for (TimeWindow availableWindow : remainingWindows) {
                subtractWindow(availableWindow, bookingWindow, nextWindows);
            }
            remainingWindows = nextWindows;
        }
        return remainingWindows;
    }

    /**
     * Trừ một booking khỏi một khung giờ rảnh, kết quả có thể còn không, một hoặc hai khoảng.
     */
    private void subtractWindow(TimeWindow availableWindow, TimeWindow bookingWindow, List<TimeWindow> result) {
        boolean noOverlap = !bookingWindow.endTime().isAfter(availableWindow.startTime())
                || !bookingWindow.startTime().isBefore(availableWindow.endTime());
        if (noOverlap) {
            result.add(availableWindow);
            return;
        }
        if (bookingWindow.startTime().isAfter(availableWindow.startTime())) {
            result.add(new TimeWindow(availableWindow.startTime(), bookingWindow.startTime()));
        }
        if (bookingWindow.endTime().isBefore(availableWindow.endTime())) {
            result.add(new TimeWindow(bookingWindow.endTime(), availableWindow.endTime()));
        }
    }

    private void ensureApprovedMentor(Long mentorId) {
        if (!schedulingMentorLookupPort.getMentor(mentorId).approved()) {
            throw new ResourceNotFoundException("Mentor profile not found");
        }
    }

    private void validateQuery(GetMentorCalendarQuery query) {
        if (query == null) {
            throw new InvalidDataException("Mentor calendar query is required");
        }
        if (query.mentorId() == null || query.mentorId() <= 0) {
            throw new InvalidDataException("Mentor id must be greater than 0");
        }
        if (query.from() == null) {
            throw new InvalidDataException("Calendar from date is required");
        }
        if (query.to() == null) {
            throw new InvalidDataException("Calendar to date is required");
        }
        if (query.from().isAfter(query.to())) {
            throw new InvalidDataException("Calendar from date must not be after to date");
        }

        long inclusiveRangeDays = ChronoUnit.DAYS.between(query.from(), query.to()) + 1;
        if (inclusiveRangeDays > MAX_CALENDAR_RANGE_DAYS) {
            throw new InvalidDataException("Calendar date range must not exceed 31 days");
        }
    }

    private record TimeWindow(LocalTime startTime, LocalTime endTime) {
    }
}
