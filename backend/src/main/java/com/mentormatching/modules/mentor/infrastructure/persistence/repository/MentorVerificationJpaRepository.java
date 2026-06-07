package com.mentormatching.modules.mentor.infrastructure.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentormatching.modules.mentor.domain.MentorVerificationStatus;
import com.mentormatching.modules.mentor.infrastructure.persistence.entity.MentorVerificationJpaEntity;

public interface MentorVerificationJpaRepository extends JpaRepository<MentorVerificationJpaEntity, Long> {

    Optional<MentorVerificationJpaEntity> findByMentorId(Long mentorId);

    List<MentorVerificationJpaEntity> findByVerificationStatus(MentorVerificationStatus verificationStatus);

    boolean existsByMentorId(Long mentorId);

    @Query("""
            select verification.id as id,
                   verification.mentorId as mentorId,
                   mentor.userId as userId,
                   user.fullName as accountFullName,
                   user.email as accountEmail,
                   verification.verificationStatus as verificationStatus,
                   verification.createdAt as createdAt,
                   verification.updatedAt as updatedAt
            from MentorVerificationJpaEntity verification
            join MentorProfileJpaEntity mentor on mentor.id = verification.mentorId
            join UserJpaEntity user on user.id = mentor.userId
            where (:status is null or verification.verificationStatus = :status)
            """)
    Page<AdminMentorVerificationListProjection> findAdminMentorVerifications(
            @Param("status") MentorVerificationStatus status,
            Pageable pageable);

    @Query("""
            select verification.id as id,
                   verification.mentorId as mentorId,
                   mentor.userId as userId,
                   user.fullName as accountFullName,
                   user.email as accountEmail,
                   user.phone as accountPhone,
                   mentor.approvalStatus as approvalStatus,
                   mentor.approvalNote as approvalNote,
                   verification.fullName as fullName,
                   verification.idCardNumber as idCardNumber,
                   verification.idCardFrontUrl as idCardFrontUrl,
                   verification.idCardBackUrl as idCardBackUrl,
                   verification.selfieWithIdUrl as selfieWithIdUrl,
                   verification.verificationStatus as verificationStatus,
                   verification.verifiedBy as verifiedBy,
                   verification.verifiedAt as verifiedAt,
                   verification.rejectionReason as rejectionReason,
                   verification.createdAt as createdAt,
                   verification.updatedAt as updatedAt
            from MentorVerificationJpaEntity verification
            join MentorProfileJpaEntity mentor on mentor.id = verification.mentorId
            join UserJpaEntity user on user.id = mentor.userId
            where verification.id = :verificationId
            """)
    Optional<AdminMentorVerificationDetailProjection> findAdminMentorVerificationDetailById(
            @Param("verificationId") Long verificationId);
}
