package com.mentormatching.modules.media.application.port.out;

import com.mentormatching.modules.media.application.dto.ConfirmMediaUploadCommand;
import com.mentormatching.modules.media.application.dto.CreateMediaUploadCommand;
import com.mentormatching.modules.media.application.dto.MediaUploadIntent;
import com.mentormatching.modules.media.domain.MediaAsset;

public interface MediaStoragePort {

    MediaUploadIntent createUploadIntent(MediaAsset mediaAsset, CreateMediaUploadCommand command);

    void verifyUpload(MediaAsset mediaAsset, ConfirmMediaUploadCommand command);

    void delete(MediaAsset mediaAsset);
}
