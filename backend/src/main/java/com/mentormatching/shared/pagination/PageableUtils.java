package com.mentormatching.shared.pagination;

import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_BY;
import static com.mentormatching.shared.response.PageQueryDefaults.DEFAULT_SORT_DIR;

import java.util.Set;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public final class PageableUtils {

    private PageableUtils() {
    }

    public static Pageable buildPageable(int page, int size, String sortBy, String sortDir, Set<String> sortableFields) {
        int pageNumber = page > 0 ? page - 1 : 0;
        return PageRequest.of(pageNumber, size, buildSort(sortBy, sortDir, sortableFields));
    }

    private static Sort buildSort(String sortBy, String sortDir, Set<String> sortableFields) {
        String safeSortBy = sortBy != null && sortableFields.contains(sortBy) ? sortBy : DEFAULT_SORT_BY;
        String safeSortDir = sortDir == null || sortDir.isBlank() ? DEFAULT_SORT_DIR : sortDir;
        Sort.Direction direction = Sort.Direction.fromOptionalString(safeSortDir)
                .orElse(Sort.Direction.fromString(DEFAULT_SORT_DIR));
        return Sort.by(direction, safeSortBy);
    }
}
