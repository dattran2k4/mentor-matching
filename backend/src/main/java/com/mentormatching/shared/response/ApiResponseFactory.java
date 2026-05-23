package com.mentormatching.shared.response;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ApiResponseFactory {

    public <T> ApiResponse<T> success(T data) {
        return success(data, "Success");
    }

    public <T> ApiResponse<T> success(T data, String message) {
        return build(HttpStatus.OK, "SUCCESS", message, data);
    }

    public <T> ApiResponse<T> created(T data, String message) {
        return build(HttpStatus.CREATED, "CREATED", message, data);
    }

    private <T> ApiResponse<T> build(HttpStatus status, String code, String message, T data) {
        return ApiResponse.<T>builder()
                .status(status.value())
                .code(code)
                .success(true)
                .message(message)
                .data(data)
                .build();
    }
}
