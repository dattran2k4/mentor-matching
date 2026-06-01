package com.mentormatching.modules.booking.infrastructure.persistence.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

import jakarta.persistence.criteria.Predicate;

public final class BookingSpecification {

    private BookingSpecification() {
    }

    public static Specification<BookingJpaEntity> filterBookings(BookingStatus status, BookingMeetingType meetingType,
                                                                 String mentorName, String studentName,
                                                                 LocalDate bookingDateFrom,
                                                                 LocalDate bookingDateTo) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (status != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), status));
            }

            if (meetingType != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("meetingType"), meetingType));
            }

            if (StringUtils.hasText(mentorName)) {
                String pattern = containsPattern(mentorName);
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("mentorName")), pattern));
            }

            if (StringUtils.hasText(studentName)) {
                String pattern = containsPattern(studentName);
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("studentName")), pattern));
            }

            if (bookingDateFrom != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("bookingDate"), bookingDateFrom));
            }

            if (bookingDateTo != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("bookingDate"), bookingDateTo));
            }

            return predicate;
        };
    }

    public static Specification<BookingJpaEntity> filterMyBookings(Long studentUserId, BookingStatus status,
                                                                   BookingMeetingType meetingType) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("studentUserId"), studentUserId));

            if (status != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), status));
            }

            if (meetingType != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("meetingType"), meetingType));
            }

            return predicate;
        };
    }

    public static Specification<BookingJpaEntity> filterMentorBookings(Long mentorId, BookingStatus status,
                                                                       BookingMeetingType meetingType,
                                                                       LocalDate bookingDateFrom,
                                                                       LocalDate bookingDateTo) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("mentorId"), mentorId));

            if (status != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), status));
            }

            if (meetingType != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("meetingType"), meetingType));
            }

            if (bookingDateFrom != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(root.get("bookingDate"), bookingDateFrom));
            }

            if (bookingDateTo != null) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(root.get("bookingDate"), bookingDateTo));
            }

            return predicate;
        };
    }

    private static String containsPattern(String value) {
        return "%" + value.trim().toLowerCase() + "%";
    }
}
