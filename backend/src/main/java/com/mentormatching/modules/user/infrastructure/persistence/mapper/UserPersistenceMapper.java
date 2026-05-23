package com.mentormatching.modules.user.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.user.domain.User;
import com.mentormatching.modules.user.domain.UserRestoreData;
import com.mentormatching.modules.user.infrastructure.persistence.entity.UserJpaEntity;

@Component
public class UserPersistenceMapper {

    public User toDomain(UserJpaEntity entity) {
        return User.restore(new UserRestoreData(entity.getId(), entity.getFullName(), entity.getEmail(),
                entity.getPassword(), entity.getPhone(), entity.getRole(), entity.getUserType(), entity.getStatus(),
                entity.getCreatedAt(), entity.getUpdatedAt()));
    }

    public UserJpaEntity toEntity(User user) {
        return UserJpaEntity.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .phone(user.getPhone())
                .role(user.getRole())
                .userType(user.getUserType())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
