package com.mentormatching.shared.pagination;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import java.util.Set;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.mentormatching.shared.response.PageResponse;

public final class PageableUtils {

    private PageableUtils() {
    }

    public static Pageable buildPageable(int page, int size, String sortBy, String sortDir, Set<String> sortableFields) {
        int pageNumber = page > 0 ? page - 1 : 0;
        return PageRequest.of(pageNumber, size, buildSort(sortBy, sortDir, sortableFields));
    }

    public static <T, R> PageResponse<R> toPageResponse(Page<T> page, Function<T, R> mapper) {
        return PageResponse.<R>builder()
                .page(page.getNumber() + 1)
                .pageSize(page.getSize())
                .totalPages(page.getTotalPages())
                .totalItems(page.getTotalElements())
                .data(page.getContent().stream().map(mapper).toList())
                .build();
    }

    private static Sort buildSort(String sortBy, String sortDir, Set<String> sortableFields) {
        String safeSortBy = sortBy != null && sortableFields.contains(sortBy) ? sortBy : DEFAULT_SORT_BY;
        String safeSortDir = sortDir == null || sortDir.isBlank() ? DEFAULT_SORT_DIR : sortDir;
        Sort.Direction direction = Sort.Direction.fromOptionalString(safeSortDir)
                .orElse(Sort.Direction.fromString(DEFAULT_SORT_DIR));
        return Sort.by(direction, safeSortBy);
    }
}
