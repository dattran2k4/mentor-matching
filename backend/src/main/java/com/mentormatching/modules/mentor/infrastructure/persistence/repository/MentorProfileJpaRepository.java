package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.mentor.domain.Gender;
import com.mentormatching.modules.mentor.domain.MeetingType;
import com.mentormatching.modules.mentor.domain.MentorApprovalStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorProfileJpaEntity;

public interface MentorProfileJpaRepository extends JpaRepository<MentorProfileJpaEntity, Long> {

    Optional<MentorProfileJpaEntity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @Query("""
            select mentor.id as id,
                   mentor.userId as userId,
                   user.fullName as fullName,
                   mentor.avatarUrl as avatarUrl,
                   mentor.gender as gender,
                   mentor.headline as headline,
                   mentor.experienceYears as experienceYears,
                   mentor.currentPosition as currentPosition,
                   mentor.workplace as workplace,
                   mentor.education as education,
                   mentor.major as major,
                   mentor.meetingType as meetingType,
                   mentor.createdAt as createdAt
            from MentorProfileJpaEntity mentor
            join UserJpaEntity user on user.id = mentor.userId
            left join DistrictJpaEntity district on district.id = mentor.currentDistrictId
            where mentor.approvalStatus = :approvalStatus
              and (:gender is null or mentor.gender = :gender)
              and (:meetingType is null or mentor.meetingType = :meetingType)
              and (:cityId is null or district.cityId = :cityId)
              and (:districtId is null or mentor.currentDistrictId = :districtId)
              and (:search is null
                   or lower(user.fullName) like :search
                   or lower(mentor.headline) like :search
                   or lower(mentor.currentPosition) like :search
                   or lower(mentor.workplace) like :search
                   or lower(mentor.education) like :search
                   or lower(mentor.major) like :search)
            """)
    Page<MentorListItemProjection> findApprovedMentors(@Param("approvalStatus") MentorApprovalStatus approvalStatus,
                                                       @Param("search") String search,
                                                       @Param("gender") Gender gender,
                                                       @Param("meetingType") MeetingType meetingType,
                                                       @Param("cityId") Long cityId,
                                                       @Param("districtId") Long districtId,
                                                       Pageable pageable);
}

