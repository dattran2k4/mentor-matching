package com.mentormatching.modules.notification.infrastructure.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.mentormatching.modules.notification.infrastructure.websocket.handler.NotificationWebSocketHandler;
import com.mentormatching.modules.notification.infrastructure.websocket.interceptor.WebSocketAuthInterceptor;
import com.mentormatching.shared.security.jwt.JwtTokenProvider;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final NotificationWebSocketHandler webSocketHandler;
    private final JwtTokenProvider jwtTokenProvider;

    public WebSocketConfig(NotificationWebSocketHandler webSocketHandler, JwtTokenProvider jwtTokenProvider) {
        this.webSocketHandler = webSocketHandler;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/notifications")
                .addInterceptors(new WebSocketAuthInterceptor(jwtTokenProvider))
                .setAllowedOrigins("*");
    }
}
