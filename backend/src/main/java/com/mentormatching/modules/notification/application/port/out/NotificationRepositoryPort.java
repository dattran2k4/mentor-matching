package com.mentormatching.modules.notification.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.notification.domain.Notification;

public interface NotificationRepositoryPort {

    Notification save(Notification notification);

    Optional<Notification> findById(Long id);

    List<Notification> findByUserId(Long userId);

    List<Notification> findUnreadByUserId(Long userId);
}
