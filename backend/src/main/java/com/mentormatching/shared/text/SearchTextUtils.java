package com.mentormatching.shared.text;

import java.text.Normalizer;
import java.util.Locale;

public final class SearchTextUtils {

    private SearchTextUtils() {
    }

    public static String normalizeForSearch(String value) {
        if (value == null) {
            return "";
        }
        String normalized = Normalizer.normalize(value.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "")
                .replace('đ', 'd')
                .replace('Đ', 'D');
        return normalized.toLowerCase(Locale.ROOT);
    }
}
