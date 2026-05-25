package com.mentormatching.modules.notification.infrastructure.persistence.mapper;

import org.springframework.stereotype.Component;

import com.mentormatching.modules.notification.domain.Notification;
import com.mentormatching.modules.notification.domain.NotificationRestoreData;
import com.mentormatching.modules.notification.infrastructure.persistence.entity.NotificationJpaEntity;

@Component
public class NotificationPersistenceMapper {

    public Notification toDomain(NotificationJpaEntity entity) {
        return Notification.restore(new NotificationRestoreData(entity.getId(), entity.getUserId(), entity.getTitle(),
                entity.getMessage(), entity.getType(), entity.isRead(), entity.getCreatedAt()));
    }

    public NotificationJpaEntity toEntity(Notification notification) {
        return NotificationJpaEntity.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
