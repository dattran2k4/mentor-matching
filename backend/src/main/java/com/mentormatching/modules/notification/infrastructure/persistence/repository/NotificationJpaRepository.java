package com.mentormatching.modules.notification.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentormatching.modules.notification.infrastructure.persistence.entity.NotificationJpaEntity;

public interface NotificationJpaRepository extends JpaRepository<NotificationJpaEntity, Long> {

    List<NotificationJpaEntity> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<NotificationJpaEntity> findByUserIdAndReadFalseOrderByCreatedAtDesc(Long userId);
}
