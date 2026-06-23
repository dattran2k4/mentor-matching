package com.mentormatching.modules.media.application.dto;

import com.mentormatching.modules.media.domain.MediaAccessType;
import com.mentormatching.modules.media.domain.MediaPurpose;
import com.mentormatching.modules.media.domain.MediaResourceType;

public record CreateMediaUploadCommand(
        Long uploadedByUserId,
        MediaPurpose purpose,
        MediaResourceType resourceType,
        MediaAccessType accessType,
        String originalFilename,
        String mimeType,
        Long fileSizeBytes
) {
}
