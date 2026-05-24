package com.mentormatching.shared.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class PageResponse<T> {

    private int page;
    private int pageSize;
    private int totalPages;
    private long totalItems;
    private List<T> data;
}
