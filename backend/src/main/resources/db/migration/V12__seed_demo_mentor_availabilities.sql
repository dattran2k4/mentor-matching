-- Seed demo availability slots for approved mentors.
-- day_of_week uses 1-7 as defined by the schema check constraint.

SET NAMES utf8mb4;

INSERT INTO mentor_availabilities (
    mentor_id, availability_type, day_of_week, available_date, start_time, end_time
)
WITH RECURSIVE mentor_numbers (mentor_number) AS (
    SELECT 1
    UNION ALL
    SELECT mentor_number + 1
    FROM mentor_numbers
    WHERE mentor_number < 37
),
recurring_slots AS (
    SELECT mentor_number, MOD(mentor_number, 7) + 1 AS day_of_week, TIME('18:00:00') AS start_time, TIME('20:00:00') AS end_time
    FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 2, 7) + 1, TIME('19:30:00'), TIME('21:00:00')
    FROM mentor_numbers
    UNION ALL
    SELECT mentor_number, MOD(mentor_number + 4, 7) + 1, TIME('08:00:00'), TIME('10:00:00')
    FROM mentor_numbers
)
SELECT mp.id, 'RECURRING', slot.day_of_week, NULL, slot.start_time, slot.end_time
FROM recurring_slots slot
JOIN users u ON u.email = CONCAT('mentor', LPAD(slot.mentor_number, 2, '0'), '@mentor-matching.local')
JOIN mentor_profiles mp ON mp.user_id = u.id
WHERE mp.approval_status = 'APPROVED'
  AND NOT EXISTS (
      SELECT 1
      FROM mentor_availabilities existing
      WHERE existing.mentor_id = mp.id
        AND existing.availability_type = 'RECURRING'
        AND existing.day_of_week = slot.day_of_week
        AND existing.available_date IS NULL
        AND existing.start_time = slot.start_time
        AND existing.end_time = slot.end_time
  );

INSERT INTO mentor_availabilities (
    mentor_id, availability_type, day_of_week, available_date, start_time, end_time
)
WITH RECURSIVE mentor_numbers (mentor_number) AS (
    SELECT 1
    UNION ALL
    SELECT mentor_number + 1
    FROM mentor_numbers
    WHERE mentor_number < 12
)
SELECT
    mp.id,
    'SPECIFIC_DATE',
    NULL,
    DATE_ADD(DATE('2026-06-08'), INTERVAL mentor_numbers.mentor_number DAY),
    TIME('14:00:00'),
    TIME('16:00:00')
FROM mentor_numbers
JOIN users u ON u.email = CONCAT('mentor', LPAD(mentor_numbers.mentor_number, 2, '0'), '@mentor-matching.local')
JOIN mentor_profiles mp ON mp.user_id = u.id
WHERE mp.approval_status = 'APPROVED'
  AND NOT EXISTS (
      SELECT 1
      FROM mentor_availabilities existing
      WHERE existing.mentor_id = mp.id
        AND existing.availability_type = 'SPECIFIC_DATE'
        AND existing.day_of_week IS NULL
        AND existing.available_date = DATE_ADD(DATE('2026-06-08'), INTERVAL mentor_numbers.mentor_number DAY)
        AND existing.start_time = TIME('14:00:00')
        AND existing.end_time = TIME('16:00:00')
  );
