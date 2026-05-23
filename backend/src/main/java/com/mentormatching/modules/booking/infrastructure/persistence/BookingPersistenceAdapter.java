package com.mentormatching.modules.booking.infrastructure.persistence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.booking.application.port.out.BookingRepositoryPort;
import com.mentormatching.modules.booking.domain.Booking;
import com.mentormatching.modules.booking.domain.BookingStatus;
import com.mentormatching.modules.booking.infrastructure.persistence.mapper.BookingPersistenceMapper;
import com.mentormatching.modules.booking.infrastructure.persistence.repository.BookingJpaRepository;

@Component
public class BookingPersistenceAdapter implements BookingRepositoryPort {

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
    public Optional<Booking> findByMentorAvailabilityIdAndBookingDate(Long mentorAvailabilityId,
                                                                      LocalDate bookingDate) {
        return bookingJpaRepository.findByMentorAvailabilityIdAndBookingDate(mentorAvailabilityId, bookingDate)
                .map(bookingPersistenceMapper::toDomain);
    }
}
