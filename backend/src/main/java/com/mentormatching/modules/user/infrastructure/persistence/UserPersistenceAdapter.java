package com.mentormatching.modules.user.infrastructure.persistence;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.application.port.out.UserReadPort;
import com.mentormatching.modules.user.application.port.out.UserRepositoryPort;
import com.mentormatching.modules.user.domain.User;
import com.mentormatching.modules.user.infrastructure.persistence.mapper.UserPersistenceMapper;
import com.mentormatching.modules.user.infrastructure.persistence.repository.UserJpaRepository;

@Component
@RequiredArgsConstructor
public class UserPersistenceAdapter implements UserRepositoryPort, UserReadPort {

    private final UserJpaRepository userJpaRepository;
    private final UserPersistenceMapper userPersistenceMapper;

    @Override
    public User save(User user) {
        return userPersistenceMapper.toDomain(userJpaRepository.save(userPersistenceMapper.toEntity(user)));
    }

    @Override
    public Optional<User> findById(Long id) {
        return userJpaRepository.findById(id).map(userPersistenceMapper::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email).map(userPersistenceMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return userJpaRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsByPhoneAndIdNot(String phone, Long id) {
        return userJpaRepository.existsByPhoneAndIdNot(phone, id);
    }
}
