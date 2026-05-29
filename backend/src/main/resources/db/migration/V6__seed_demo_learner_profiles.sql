-- Seed demo learner profiles for learner demo accounts.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_demo_learner_profiles (
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(50),
    birth_year INT,
    school_name VARCHAR(255),
    grade_name VARCHAR(50),
    learning_goal TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_demo_learner_profiles (email, gender, birth_year, school_name, grade_name, learning_goal)
VALUES
    ('learner01@mentor-matching.local', 'FEMALE', 2011, 'THCS Nguyễn Du', 'Lớp 9', 'Ôn thi vào lớp 10, tập trung Toán và Tiếng Anh.'),
    ('learner02@mentor-matching.local', 'FEMALE', 2013, 'THCS Trưng Vương', 'Lớp 7', 'Củng cố kiến thức Toán, Ngữ văn và rèn phương pháp học đều đặn.'),
    ('learner03@mentor-matching.local', 'MALE', 2012, 'THCS Lê Quý Đôn', 'Lớp 8', 'Nâng cao Toán và Khoa học tự nhiên, chuẩn bị học lớp 9.'),
    ('learner04@mentor-matching.local', 'FEMALE', 2010, 'THPT Phan Đình Phùng', 'Lớp 10', 'Cải thiện Tiếng Anh giao tiếp và nền tảng IELTS.'),
    ('learner05@mentor-matching.local', 'MALE', 2009, 'THPT Nguyễn Trãi', 'Lớp 11', 'Học chắc Vật lý và Toán để chuẩn bị định hướng khối A.'),
    ('learner06@mentor-matching.local', 'FEMALE', 1986, 'Phụ huynh học sinh', 'Lớp 6', 'Tìm gia sư đồng hành cho con trong giai đoạn chuyển cấp.'),
    ('learner07@mentor-matching.local', 'MALE', 2014, 'Tiểu học Lê Văn Tám', 'Lớp 5', 'Ôn Toán, Tiếng Việt và chuẩn bị vào trung học cơ sở.'),
    ('learner08@mentor-matching.local', 'FEMALE', 2005, 'Đại học Khoa học Tự nhiên', 'Lớp 12', 'Luyện thi IELTS và củng cố kỹ năng viết học thuật.'),
    ('learner09@mentor-matching.local', 'MALE', 2015, 'Tiểu học Nguyễn Huệ', 'Lớp 4', 'Xây nền Toán tư duy và thói quen tự học.'),
    ('learner10@mentor-matching.local', 'FEMALE', 2011, 'THCS Võ Trường Toản', 'Lớp 9', 'Ôn thi vào lớp 10, ưu tiên Ngữ văn và Tiếng Anh.');

INSERT INTO learner_profiles (user_id, gender, birth_year, school_name, grade_id, learning_goal)
SELECT u.id, lp.gender, lp.birth_year, lp.school_name, g.id, lp.learning_goal
FROM tmp_demo_learner_profiles lp
JOIN users u ON u.email = lp.email AND u.role = 'LEARNER'
JOIN grades g ON g.name = lp.grade_name
WHERE NOT EXISTS (
    SELECT 1
    FROM learner_profiles existing
    WHERE existing.user_id = u.id
);

DROP TEMPORARY TABLE tmp_demo_learner_profiles;
