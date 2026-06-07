package com.mentormatching.modules.catalog.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentormatching.modules.catalog.application.dto.CatalogOptions;
import com.mentormatching.modules.catalog.application.port.in.GetCatalogOptionsUseCase;
import com.mentormatching.modules.catalog.presentation.dto.response.CatalogOptionsResponse;
import com.mentormatching.shared.response.ApiResponse;
import com.mentormatching.shared.response.ApiResponseFactory;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
@RequestMapping("/api/v1/catalog")
public class CatalogController {

    private final GetCatalogOptionsUseCase getCatalogOptionsUseCase;
    private final ApiResponseFactory apiResponseFactory;

    @GetMapping("/options")
    public ApiResponse<CatalogOptionsResponse> getCatalogOptions() {
        CatalogOptions options = getCatalogOptionsUseCase.getCatalogOptions();
        return apiResponseFactory.success(CatalogOptionsResponse.from(options), "Get catalog options successfully");
    }
}
