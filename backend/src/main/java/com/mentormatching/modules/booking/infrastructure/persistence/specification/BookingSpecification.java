package com.mentormatching.modules.booking.infrastructure.persistence.specification;

import org.springframework.data.jpa.domain.Specification;

import com.mentormatching.modules.booking.domain.BookingMeetingType;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;

import jakarta.persistence.criteria.Predicate;

public final class BookingSpecification {

    private BookingSpecification() {
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
}
