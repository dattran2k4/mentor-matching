package com.mentormatching.modules.notification.domain;

import java.time.LocalDateTime;

public record NotificationRestoreData(Long id, Long userId, String title, String message, NotificationType type,
                                      boolean read, LocalDateTime createdAt) {
}
