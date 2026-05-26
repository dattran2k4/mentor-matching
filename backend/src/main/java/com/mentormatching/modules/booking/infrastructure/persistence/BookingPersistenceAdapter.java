package com.mentormatching.modules.booking.infrastructure.persistence;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.dto.GetMyBookingsQuery;
import com.mentormatching.modules.booking.application.port.out.BookingRepositoryPort;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.entity.BookingJpaEntity;
import com.mentormatching.modules.booking.infrastructure.persistence.mapper.BookingPersistenceMapper;
import com.mentormatching.modules.booking.infrastructure.persistence.repository.BookingJpaRepository;
import com.mentormatching.modules.booking.infrastructure.persistence.specification.BookingSpecification;
import com.mentormatching.shared.response.PageResponse;

@Component
public class BookingPersistenceAdapter implements BookingRepositoryPort {

    private static final Set<String> SORTABLE_FIELDS = Set.of("id", "bookingDate", "status", "createdAt", "updatedAt");

    private final BookingJpaRepository bookingJpaRepository;
    private final BookingPersistenceMapper bookingPersistenceMapper;

    public BookingPersistenceAdapter(BookingJpaRepository bookingJpaRepository,
                                     BookingPersistenceMapper bookingPersistenceMapper) {
        this.bookingJpaRepository = bookingJpaRepository;
        this.bookingPersistenceMapper = bookingPersistenceMapper;
    }

    @Override
    public Booking save(Booking booking) {
        return bookingPersistenceMapper.toDomain(bookingJpaRepository.save(bookingPersistenceMapper.toEntity(booking)));
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return bookingJpaRepository.findById(id).map(bookingPersistenceMapper::toDomain);
    }

    @Override
    public PageResponse<Booking> findMyBookings(GetMyBookingsQuery query) {
        int pageNumber = query.page() > 0 ? query.page() - 1 : 0;
        Pageable pageable = PageRequest.of(pageNumber, query.size(), buildSort(query.sortBy(), query.sortDir()));
        Specification<BookingJpaEntity> specification = BookingSpecification.filterMyBookings(query.studentUserId(),
                query.status(), query.meetingType());
        Page<BookingJpaEntity> bookingPage = bookingJpaRepository.findAll(specification, pageable);

        return PageResponse.<Booking>builder()
                .page(bookingPage.getNumber() + 1)
                .pageSize(bookingPage.getSize())
                .totalPages(bookingPage.getTotalPages())
                .totalItems(bookingPage.getTotalElements())
                .data(bookingPage.getContent().stream().map(bookingPersistenceMapper::toDomain).toList())
                .build();
    }

    @Override
    public List<Booking> findByStudentUserId(Long studentUserId) {
        return bookingJpaRepository.findByStudentUserId(studentUserId).stream().map(bookingPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<Booking> findByMentorId(Long mentorId) {
        return bookingJpaRepository.findByMentorId(mentorId).stream().map(bookingPersistenceMapper::toDomain).toList();
    }

    @Override
    public List<Booking> findByStatus(BookingStatus status) {
        return bookingJpaRepository.findByStatus(status).stream().map(bookingPersistenceMapper::toDomain).toList();
    }

    @Override
    public boolean existsOverlappingBooking(Long mentorId, LocalDate bookingDate, LocalTime startTime,
                                            LocalTime endTime, List<BookingStatus> statuses) {
        return bookingJpaRepository.existsOverlappingBooking(mentorId, bookingDate, startTime, endTime, statuses);
    }

    private Sort buildSort(String sortBy, String sortDir) {
        String safeSortBy = sortBy != null && SORTABLE_FIELDS.contains(sortBy) ? sortBy : DEFAULT_SORT_BY;
        String safeSortDir = sortDir == null || sortDir.isBlank() ? DEFAULT_SORT_DIR : sortDir;
        Sort.Direction direction = Sort.Direction.fromOptionalString(safeSortDir)
                .orElse(Sort.Direction.fromString(DEFAULT_SORT_DIR));
        return Sort.by(direction, safeSortBy);
    }
}
