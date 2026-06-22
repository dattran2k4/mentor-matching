package com.mentormatching.modules.notification.infrastructure.websocket;

import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentormatching.modules.notification.application.dto.NotificationResponse;
import com.mentormatching.modules.notification.application.port.out.NotificationRealtimePort;
import com.mentormatching.modules.notification.domain.Notification;
import com.mentormatching.modules.notification.infrastructure.websocket.handler.NotificationWebSocketHandler;

@Component
public class NotificationRealtimeAdapter implements NotificationRealtimePort {

    private final NotificationWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    public NotificationRealtimeAdapter(NotificationWebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
        this.objectMapper = new ObjectMapper()
                .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule())
                .disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public void sendNotification(Notification notification) {
        if (notification == null || notification.getUserId() == null) {
            return;
        }

        Set<WebSocketSession> sessions = webSocketHandler.getSessions(notification.getUserId());
        if (sessions.isEmpty()) {
            return;
        }

        try {
            NotificationResponse response = NotificationResponse.from(notification);
            String jsonPayload = objectMapper.writeValueAsString(response);
            TextMessage textMessage = new TextMessage(jsonPayload);

            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(textMessage);
                }
            }
        } catch (Exception e) {
            // Log warning or exception (SLF4J is available via Lombok if needed, or System.err for simple debug fallback, but let's just ignore/print stack trace here)
            e.printStackTrace();
        }
    }
}
