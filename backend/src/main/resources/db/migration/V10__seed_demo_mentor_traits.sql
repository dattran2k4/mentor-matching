-- Seed demo mentor personality and highlight tags.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_mentor_trait_options (
    trait_group INT NOT NULL,
    personality_name VARCHAR(255) NOT NULL,
    highlight_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_mentor_trait_options (trait_group, personality_name, highlight_name)
VALUES
    (0, 'Kiên nhẫn', 'Phù hợp học sinh mất gốc'),
    (1, 'Thân thiện', 'Giọng giảng dễ hiểu'),
    (2, 'Kỷ luật', 'Theo sát tiến bộ'),
    (3, 'Truyền cảm hứng', 'Chuyên ôn thi'),
    (4, 'Tỉ mỉ', 'Có bài tập sau buổi học'),
    (5, 'Năng động', 'Dạy online tốt'),
    (6, 'Lắng nghe tốt', 'Có giáo án cá nhân hóa'),
    (7, 'Tư duy hệ thống', 'Kinh nghiệm 3+ năm'),
    (8, 'Hài hước vừa phải', 'Phù hợp học sinh nhỏ tuổi'),
    (9, 'Định hướng mục tiêu', 'Feedback sau buổi học');

INSERT INTO mentor_personalities (mentor_id, personality_option_id)
WITH RECURSIVE mentor_numbers (mentor_number) AS (
    SELECT 1
    UNION ALL
    SELECT mentor_number + 1
    FROM mentor_numbers
    WHERE mentor_number < 37
),
mentor_trait_names AS (
    SELECT mentor_number, MOD(mentor_number, 10) AS trait_group FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 3, 10) FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 6, 10) FROM mentor_numbers
)
SELECT mp.id, po.id
FROM mentor_trait_names trait
JOIN users u ON u.email = CONCAT('mentor', LPAD(trait.mentor_number, 2, '0'), '@mentor-matching.local')
JOIN mentor_profiles mp ON mp.user_id = u.id
JOIN tmp_mentor_trait_options option_data ON option_data.trait_group = trait.trait_group
JOIN personality_options po ON po.name = option_data.personality_name
WHERE NOT EXISTS (
    SELECT 1
    FROM mentor_personalities existing
    WHERE existing.mentor_id = mp.id
      AND existing.personality_option_id = po.id
);

INSERT INTO mentor_highlights (mentor_id, highlight_option_id)
WITH RECURSIVE mentor_numbers (mentor_number) AS (
    SELECT 1
    UNION ALL
    SELECT mentor_number + 1
    FROM mentor_numbers
    WHERE mentor_number < 37
),
mentor_highlight_names AS (
    SELECT mentor_number, MOD(mentor_number, 10) AS trait_group FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 2, 10) FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 5, 10) FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 8, 10) FROM mentor_numbers
),
base_highlights AS (
    SELECT mp.id AS mentor_id, ho.id AS highlight_option_id
    FROM mentor_highlight_names trait
    JOIN users u ON u.email = CONCAT('mentor', LPAD(trait.mentor_number, 2, '0'), '@mentor-matching.local')
    JOIN mentor_profiles mp ON mp.user_id = u.id
    JOIN tmp_mentor_trait_options option_data ON option_data.trait_group = trait.trait_group
    JOIN mentor_highlight_options ho ON ho.name = option_data.highlight_name
    UNION
    SELECT mp.id, ho.id
    FROM users u
    JOIN mentor_profiles mp ON mp.user_id = u.id
    JOIN mentor_highlight_options ho ON ho.name = 'Được duyệt bởi admin'
    WHERE u.email LIKE 'mentor%@mentor-matching.local'
      AND mp.approval_status = 'APPROVED'
)
SELECT h.mentor_id, h.highlight_option_id
FROM base_highlights h
WHERE NOT EXISTS (
    SELECT 1
    FROM mentor_highlights existing
    WHERE existing.mentor_id = h.mentor_id
      AND existing.highlight_option_id = h.highlight_option_id
);

DROP TEMPORARY TABLE tmp_mentor_trait_options;
