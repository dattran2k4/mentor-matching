package com.mentormatching.modules.mentor.application.service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentormatching.modules.mentor.application.dto.CurrentMentorTraitSelections;
import com.mentormatching.modules.mentor.application.dto.UpdateCurrentMentorTraitsCommand;
import com.mentormatching.modules.mentor.application.port.in.GetCurrentMentorTraitsUseCase;
import com.mentormatching.modules.mentor.application.port.in.UpdateCurrentMentorTraitsUseCase;
import com.mentormatching.modules.mentor.application.port.out.MentorHighlightRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorPersonalityRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorProfileRepositoryPort;
import com.mentormatching.modules.mentor.application.port.out.MentorReadRepositoryPort;
import com.mentormatching.modules.mentor.domain.MentorHighlight;
import com.mentormatching.modules.mentor.domain.MentorPersonality;
import com.mentormatching.modules.mentor.domain.MentorProfile;
import com.mentormatching.shared.exception.InvalidDataException;
import com.mentormatching.shared.exception.ResourceNotFoundException;

@Service
public class MentorTraitSelectionService implements GetCurrentMentorTraitsUseCase, UpdateCurrentMentorTraitsUseCase {

    private final MentorProfileRepositoryPort mentorProfileRepositoryPort;
    private final MentorPersonalityRepositoryPort mentorPersonalityRepositoryPort;
    private final MentorHighlightRepositoryPort mentorHighlightRepositoryPort;
    private final MentorReadRepositoryPort mentorReadRepositoryPort;

    public MentorTraitSelectionService(MentorProfileRepositoryPort mentorProfileRepositoryPort,
                                       MentorPersonalityRepositoryPort mentorPersonalityRepositoryPort,
                                       MentorHighlightRepositoryPort mentorHighlightRepositoryPort,
                                       MentorReadRepositoryPort mentorReadRepositoryPort) {
        this.mentorProfileRepositoryPort = mentorProfileRepositoryPort;
        this.mentorPersonalityRepositoryPort = mentorPersonalityRepositoryPort;
        this.mentorHighlightRepositoryPort = mentorHighlightRepositoryPort;
        this.mentorReadRepositoryPort = mentorReadRepositoryPort;
    }

    @Override
    @Transactional(readOnly = true)
    public CurrentMentorTraitSelections getCurrentMentorTraits(Long userId) {
        MentorProfile mentorProfile = getMentorProfile(userId);
        return new CurrentMentorTraitSelections(
                mentorPersonalityRepositoryPort.findByMentorId(mentorProfile.getId()).stream()
                        .map(MentorPersonality::getPersonalityOptionId)
                        .sorted()
                        .toList(),
                mentorHighlightRepositoryPort.findByMentorId(mentorProfile.getId()).stream()
                        .map(MentorHighlight::getHighlightOptionId)
                        .sorted()
                        .toList()
        );
    }

    @Override
    @Transactional
    public CurrentMentorTraitSelections updateCurrentMentorTraits(UpdateCurrentMentorTraitsCommand command) {
        MentorProfile mentorProfile = getMentorProfile(command.userId());
        List<Long> personalityOptionIds = normalizeIds(command.personalityOptionIds());
        List<Long> highlightOptionIds = normalizeIds(command.highlightOptionIds());

        validatePersonalityOptionIds(personalityOptionIds);
        validateHighlightOptionIds(highlightOptionIds);

        mentorPersonalityRepositoryPort.deleteByMentorId(mentorProfile.getId());
        mentorHighlightRepositoryPort.deleteByMentorId(mentorProfile.getId());

        if (!personalityOptionIds.isEmpty()) {
            mentorPersonalityRepositoryPort.saveAll(personalityOptionIds.stream()
                    .map(optionId -> MentorPersonality.create(mentorProfile.getId(), optionId))
                    .toList());
        }
        if (!highlightOptionIds.isEmpty()) {
            mentorHighlightRepositoryPort.saveAll(highlightOptionIds.stream()
                    .map(optionId -> MentorHighlight.create(mentorProfile.getId(), optionId))
                    .toList());
        }

        return new CurrentMentorTraitSelections(personalityOptionIds, highlightOptionIds);
    }

    private MentorProfile getMentorProfile(Long userId) {
        return mentorProfileRepositoryPort.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor profile not found"));
    }

    /**
     * Normalizes option IDs by converting null input to an empty list,
     * removing null values and duplicates, then returning the IDs in ascending order.
     * <p>
     * Chuẩn hoá danh sách option ID: đổi null thành empty
     * Loại null và trùng lặp, sx tăng dần
     */
    private List<Long> normalizeIds(List<Long> optionIds) {
        if (optionIds == null) {
            return List.of();
        }
        Set<Long> uniqueIds = new LinkedHashSet<>();
        for (Long optionId : optionIds) {
            if (optionId != null) {
                uniqueIds.add(optionId);
            }
        }
        return uniqueIds.stream().sorted().toList();
    }

    /**
     * Validates that all provided personality option IDs exist in the available option set.
     * <p>
     * Xác thực rằng tất cả personality option ID được gửi lên đều tồn tại trong danh sách hợp lệ.
     */
    private void validatePersonalityOptionIds(List<Long> personalityOptionIds) {
        Set<Long> validIds = mentorReadRepositoryPort.findPersonalityOptions().stream()
                .map(option -> option.id())
                .collect(java.util.stream.Collectors.toSet());
        if (!validIds.containsAll(personalityOptionIds)) {
            throw new InvalidDataException("One or more personality options are invalid");
        }
    }

    private void validateHighlightOptionIds(List<Long> highlightOptionIds) {
        Set<Long> validIds = mentorReadRepositoryPort.findHighlightOptions().stream()
                .map(option -> option.id())
                .collect(java.util.stream.Collectors.toSet());
        if (!validIds.containsAll(highlightOptionIds)) {
            throw new InvalidDataException("One or more highlight options are invalid");
        }
    }
}
