package com.mentormatching.modules.booking.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.mentormatching.shared.exception.InvalidDataException;

public class Booking {

    private static final int MAX_NOTE_LENGTH = 1000;

    private final Long id;
    private final Long studentUserId;
    private final Long mentorId;
    private final Long mentorSubjectId;
    private final Long mentorAvailabilityId;
    private final LocalDate bookingDate;
    private BookingMeetingType meetingType;
    private String meetingLink;
    private String meetingAddress;
    private BookingStatus status;
    private String note;
    private Long cancelledBy;
    private String cancelReason;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Booking(BookingRestoreData data) {
        this.id = data.id();
        this.studentUserId = data.studentUserId();
        this.mentorId = data.mentorId();
        this.mentorSubjectId = data.mentorSubjectId();
        this.mentorAvailabilityId = data.mentorAvailabilityId();
        this.bookingDate = data.bookingDate();
        this.meetingType = data.meetingType();
        this.meetingLink = data.meetingLink();
        this.meetingAddress = data.meetingAddress();
        this.status = data.status();
        this.note = data.note();
        this.cancelledBy = data.cancelledBy();
        this.cancelReason = data.cancelReason();
        this.createdAt = data.createdAt();
        this.updatedAt = data.updatedAt();
    }

    public static Booking restore(BookingRestoreData data) {
        return new Booking(data);
    }

    public static Booking create(BookingCreateData data) {
        validateCreateData(data);
        LocalDateTime now = LocalDateTime.now();

        return new Booking(new BookingRestoreData(null, data.studentUserId(), data.mentorId(),
                data.mentorSubjectId(), data.mentorAvailabilityId(), data.bookingDate(), data.meetingType(),
                null, null, BookingStatus.PENDING, data.note(), null, null, now, now));
    }

    public Long getId() {
        return id;
    }

    public Long getStudentUserId() {
        return studentUserId;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getMentorSubjectId() {
        return mentorSubjectId;
    }

    public Long getMentorAvailabilityId() {
        return mentorAvailabilityId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public BookingMeetingType getMeetingType() {
        return meetingType;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public String getMeetingAddress() {
        return meetingAddress;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public String getNote() {
        return note;
    }

    public Long getCancelledBy() {
        return cancelledBy;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    private static void validateCreateData(BookingCreateData data) {
        requireNotNull(data, "Booking create data must not be null");
        requireNotNull(data.studentUserId(), "Student user id is required");
        requireNotNull(data.mentorId(), "Mentor id is required");
        requireNotNull(data.mentorSubjectId(), "Mentor subject id is required");
        requireNotNull(data.mentorAvailabilityId(), "Mentor availability id is required");
        requireNotNull(data.bookingDate(), "Booking date is required");
        requireNotNull(data.meetingType(), "Meeting type is required");
        validateBookingDate(data.bookingDate());
        validateNote(data.note());
    }

    private static void validateBookingDate(LocalDate bookingDate) {
        if (bookingDate.isBefore(LocalDate.now())) {
            throw new InvalidDataException("Booking date must not be in the past");
        }
    }

    private static void validateNote(String note) {
        if (note != null && note.length() > MAX_NOTE_LENGTH) {
            throw new InvalidDataException("Booking note must not exceed " + MAX_NOTE_LENGTH + " characters");
        }
    }

    private static void requireNotNull(Object value, String message) {
        if (value == null) {
            throw new InvalidDataException(message);
        }
    }
}
