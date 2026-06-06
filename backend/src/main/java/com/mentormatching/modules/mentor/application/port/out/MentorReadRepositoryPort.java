package com.mentormatching.modules.mentor.application.port.out;

import java.util.List;
import java.util.Optional;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorDetails;
import com.mentormatching.modules.mentor.application.dto.GetMentorsQuery;
import com.mentormatching.modules.mentor.application.dto.MentorAchievementDetail;
import com.mentormatching.modules.mentor.application.dto.MentorAvailabilityDetail;
import com.mentormatching.modules.mentor.application.dto.MentorDetail;
import com.mentormatching.modules.mentor.application.dto.MentorListItem;
import com.mentormatching.modules.mentor.application.dto.MentorSubjectDetail;
import com.mentormatching.modules.mentor.application.dto.MentorTraitsDetail;
import com.mentormatching.shared.response.PageResponse;

public interface MentorReadRepositoryPort {

    PageResponse<MentorListItem> findApprovedMentors(GetMentorsQuery query, List<Long> subjectGradeIds);

    Optional<CurrentMentorDetails> findCurrentMentorByUserId(Long userId);

    Optional<MentorDetail> findApprovedMentorDetailById(Long mentorId);

    boolean existsApprovedMentorById(Long mentorId);

    List<MentorSubjectDetail> findMentorSubjects(Long mentorId);

    MentorTraitsDetail findMentorTraits(Long mentorId);

    List<MentorAchievementDetail> findMentorAchievements(Long mentorId);

    List<MentorAvailabilityDetail> findMentorAvailabilities(Long mentorId);
}
