package com.mentormatching.shared.security.handler;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.mentormatching.shared.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tools.jackson.databind.ObjectMapper;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final String AUTH_ERROR_CODE_ATTR = "auth_error_code";
    private static final String AUTH_ERROR_MESSAGE_ATTR = "auth_error_message";

    private final ObjectMapper objectMapper;

    public CustomAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Trả về lỗi 401 theo chuẩn ErrorResponse khi xác thực thất bại.
     */
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        String code = readAsString(request.getAttribute(AUTH_ERROR_CODE_ATTR), "UNAUTHORIZED");
        String message = readAsString(request.getAttribute(AUTH_ERROR_MESSAGE_ATTR), authException.getMessage());

        ErrorResponse body = ErrorResponse.builder()
                .code(code)
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(message)
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), body);
    }

    /**
     * Đọc request attribute theo kiểu String, fallback nếu không tồn tại.
     */
    private String readAsString(Object value, String fallback) {
        return value instanceof String str ? str : fallback;
    }
}
