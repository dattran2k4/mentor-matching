-- Seed demo mentor subjects and hourly prices.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_demo_mentor_subjects (
    mentor_email VARCHAR(255) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    grade_name VARCHAR(50),
    proficiency_level VARCHAR(50),
    teaching_note TEXT,
    price_per_hour DECIMAL(12, 2),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_demo_mentor_subjects (
    mentor_email, subject_name, grade_name, proficiency_level, teaching_note, price_per_hour, is_active
)
VALUES
    ('mentor01@mentor-matching.local', 'Toán', 'Lớp 9', 'ADVANCED', 'Dạy Toán Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor01@mentor-matching.local', 'Đại số', 'Lớp 9', 'ADVANCED', 'Dạy Đại số Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor01@mentor-matching.local', 'Hình học', 'Lớp 9', 'ADVANCED', 'Dạy Hình học Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor01@mentor-matching.local', 'Ôn thi vào lớp 10', 'Lớp 9', 'EXPERT', 'Dạy Ôn thi vào lớp 10 Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor02@mentor-matching.local', 'Vật lý', 'Lớp 10', 'ADVANCED', 'Dạy Vật lý Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 250000.00, TRUE),
    ('mentor02@mentor-matching.local', 'Vật lý', 'Lớp 11', 'ADVANCED', 'Dạy Vật lý Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor02@mentor-matching.local', 'Vật lý', 'Lớp 12', 'EXPERT', 'Dạy Vật lý Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor03@mentor-matching.local', 'Tiếng Anh', 'Lớp 10', 'ADVANCED', 'Dạy Tiếng Anh Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor03@mentor-matching.local', 'Tiếng Anh', 'Lớp 11', 'ADVANCED', 'Dạy Tiếng Anh Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 250000.00, TRUE),
    ('mentor03@mentor-matching.local', 'IELTS', NULL, 'EXPERT', 'Dạy IELTS theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 350000.00, TRUE),
    ('mentor04@mentor-matching.local', 'Lập trình Python', 'Lớp 8', 'ADVANCED', 'Dạy Lập trình Python Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 280000.00, TRUE),
    ('mentor04@mentor-matching.local', 'Lập trình Python', 'Lớp 10', 'ADVANCED', 'Dạy Lập trình Python Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor04@mentor-matching.local', 'Lập trình Web', 'Lớp 10', 'INTERMEDIATE', 'Dạy Lập trình Web Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 280000.00, TRUE),
    ('mentor05@mentor-matching.local', 'Ngữ văn', 'Lớp 9', 'ADVANCED', 'Dạy Ngữ văn Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor05@mentor-matching.local', 'Ngữ văn', 'Lớp 12', 'EXPERT', 'Dạy Ngữ văn Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 280000.00, TRUE),
    ('mentor05@mentor-matching.local', 'Viết sáng tạo', 'Lớp 8', 'ADVANCED', 'Dạy Viết sáng tạo Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor06@mentor-matching.local', 'Hóa học', 'Lớp 9', 'ADVANCED', 'Dạy Hóa học Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor06@mentor-matching.local', 'Sinh học', 'Lớp 9', 'ADVANCED', 'Dạy Sinh học Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor06@mentor-matching.local', 'Khoa học tự nhiên', 'Lớp 8', 'ADVANCED', 'Dạy Khoa học tự nhiên Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor07@mentor-matching.local', 'Toán', 'Lớp 10', 'EXPERT', 'Dạy Toán Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, FALSE),
    ('mentor07@mentor-matching.local', 'Đại số', 'Lớp 11', 'EXPERT', 'Dạy Đại số Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 330000.00, FALSE),
    ('mentor07@mentor-matching.local', 'Hình học', 'Lớp 12', 'EXPERT', 'Dạy Hình học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 340000.00, FALSE),
    ('mentor08@mentor-matching.local', 'Tin học', 'Lớp 5', 'INTERMEDIATE', 'Dạy Tin học Lớp 5 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor08@mentor-matching.local', 'Lập trình Scratch', 'Lớp 4', 'ADVANCED', 'Dạy Lập trình Scratch Lớp 4 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor08@mentor-matching.local', 'Lập trình Scratch', 'Lớp 6', 'ADVANCED', 'Dạy Lập trình Scratch Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor09@mentor-matching.local', 'Tiếng Anh', 'Lớp 6', 'INTERMEDIATE', 'Dạy Tiếng Anh Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor09@mentor-matching.local', 'Tiếng Anh', 'Lớp 8', 'ADVANCED', 'Dạy Tiếng Anh Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor09@mentor-matching.local', 'Tiếng Anh', 'Lớp 9', 'ADVANCED', 'Dạy Tiếng Anh Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor10@mentor-matching.local', 'Toán', 'Lớp 10', 'ADVANCED', 'Dạy Toán Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 250000.00, TRUE),
    ('mentor10@mentor-matching.local', 'Vật lý', 'Lớp 11', 'ADVANCED', 'Dạy Vật lý Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 270000.00, TRUE),
    ('mentor10@mentor-matching.local', 'Vật lý', 'Lớp 12', 'ADVANCED', 'Dạy Vật lý Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 290000.00, TRUE),
    ('mentor11@mentor-matching.local', 'Lịch sử', 'Lớp 8', 'ADVANCED', 'Dạy Lịch sử Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor11@mentor-matching.local', 'Địa lý', 'Lớp 9', 'ADVANCED', 'Dạy Địa lý Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor11@mentor-matching.local', 'Lịch sử và Địa lý', 'Lớp 7', 'ADVANCED', 'Dạy Lịch sử và Địa lý Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor12@mentor-matching.local', 'Lập trình Web', 'Lớp 10', 'ADVANCED', 'Dạy Lập trình Web Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor12@mentor-matching.local', 'Lập trình Web', 'Lớp 12', 'ADVANCED', 'Dạy Lập trình Web Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, TRUE),
    ('mentor12@mentor-matching.local', 'Tin học', 'Lớp 11', 'ADVANCED', 'Dạy Tin học Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor13@mentor-matching.local', 'Tiếng Việt', 'Lớp 2', 'ADVANCED', 'Dạy Tiếng Việt Lớp 2 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 170000.00, TRUE),
    ('mentor13@mentor-matching.local', 'Tiếng Việt', 'Lớp 4', 'ADVANCED', 'Dạy Tiếng Việt Lớp 4 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor13@mentor-matching.local', 'Viết sáng tạo', 'Lớp 5', 'INTERMEDIATE', 'Dạy Viết sáng tạo Lớp 5 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor14@mentor-matching.local', 'SAT', NULL, 'EXPERT', 'Dạy SAT theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 420000.00, TRUE),
    ('mentor14@mentor-matching.local', 'Toán', 'Lớp 11', 'EXPERT', 'Dạy Toán Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, TRUE),
    ('mentor14@mentor-matching.local', 'Xác suất - Thống kê', 'Lớp 12', 'ADVANCED', 'Dạy Xác suất - Thống kê Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 330000.00, TRUE),
    ('mentor15@mentor-matching.local', 'Sinh học', 'Lớp 9', 'ADVANCED', 'Dạy Sinh học Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor15@mentor-matching.local', 'Sinh học', 'Lớp 11', 'ADVANCED', 'Dạy Sinh học Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 270000.00, TRUE),
    ('mentor15@mentor-matching.local', 'Sinh học', 'Lớp 12', 'EXPERT', 'Dạy Sinh học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor16@mentor-matching.local', 'Toán', 'Lớp 3', 'ADVANCED', 'Dạy Toán Lớp 3 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 170000.00, TRUE),
    ('mentor16@mentor-matching.local', 'Toán', 'Lớp 5', 'ADVANCED', 'Dạy Toán Lớp 5 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor16@mentor-matching.local', 'Toán tư duy', 'Lớp 4', 'ADVANCED', 'Dạy Toán tư duy Lớp 4 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor17@mentor-matching.local', 'TOEIC', NULL, 'EXPERT', 'Dạy TOEIC theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 320000.00, TRUE),
    ('mentor17@mentor-matching.local', 'Tiếng Anh', 'Lớp 12', 'ADVANCED', 'Dạy Tiếng Anh Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor17@mentor-matching.local', 'IELTS', NULL, 'ADVANCED', 'Dạy IELTS theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 340000.00, TRUE),
    ('mentor18@mentor-matching.local', 'Hóa học', 'Lớp 10', 'ADVANCED', 'Dạy Hóa học Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, FALSE),
    ('mentor18@mentor-matching.local', 'Hóa học', 'Lớp 11', 'ADVANCED', 'Dạy Hóa học Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 280000.00, FALSE),
    ('mentor18@mentor-matching.local', 'Hóa học', 'Lớp 12', 'EXPERT', 'Dạy Hóa học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, FALSE),
    ('mentor19@mentor-matching.local', 'Địa lý', 'Lớp 9', 'ADVANCED', 'Dạy Địa lý Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor19@mentor-matching.local', 'Địa lý', 'Lớp 12', 'EXPERT', 'Dạy Địa lý Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 250000.00, TRUE),
    ('mentor19@mentor-matching.local', 'Lịch sử và Địa lý', 'Lớp 8', 'ADVANCED', 'Dạy Lịch sử và Địa lý Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor20@mentor-matching.local', 'IELTS', NULL, 'EXPERT', 'Dạy IELTS theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 380000.00, TRUE),
    ('mentor20@mentor-matching.local', 'Tiếng Anh', 'Lớp 11', 'ADVANCED', 'Dạy Tiếng Anh Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor20@mentor-matching.local', 'Tiếng Anh', 'Lớp 12', 'ADVANCED', 'Dạy Tiếng Anh Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 270000.00, TRUE),
    ('mentor21@mentor-matching.local', 'Toán', 'Lớp 6', 'ADVANCED', 'Dạy Toán Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 200000.00, TRUE),
    ('mentor21@mentor-matching.local', 'Toán', 'Lớp 7', 'ADVANCED', 'Dạy Toán Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor21@mentor-matching.local', 'Toán', 'Lớp 8', 'ADVANCED', 'Dạy Toán Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor22@mentor-matching.local', 'Khoa học tự nhiên', 'Lớp 6', 'ADVANCED', 'Dạy Khoa học tự nhiên Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor22@mentor-matching.local', 'Khoa học tự nhiên', 'Lớp 7', 'ADVANCED', 'Dạy Khoa học tự nhiên Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 200000.00, TRUE),
    ('mentor22@mentor-matching.local', 'Khoa học tự nhiên', 'Lớp 8', 'ADVANCED', 'Dạy Khoa học tự nhiên Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor23@mentor-matching.local', 'Tiếng Trung', NULL, 'ADVANCED', 'Dạy Tiếng Trung theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 260000.00, TRUE),
    ('mentor23@mentor-matching.local', 'Tiếng Anh', 'Lớp 8', 'INTERMEDIATE', 'Dạy Tiếng Anh Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor24@mentor-matching.local', 'Phương pháp học tập', NULL, 'EXPERT', 'Dạy Phương pháp học tập theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 260000.00, TRUE),
    ('mentor24@mentor-matching.local', 'Quản lý thời gian', NULL, 'EXPERT', 'Dạy Quản lý thời gian theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 260000.00, TRUE),
    ('mentor24@mentor-matching.local', 'Thuyết trình', NULL, 'ADVANCED', 'Dạy Thuyết trình theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 240000.00, TRUE),
    ('mentor25@mentor-matching.local', 'Tiếng Nhật', NULL, 'ADVANCED', 'Dạy Tiếng Nhật theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 280000.00, TRUE),
    ('mentor25@mentor-matching.local', 'Tiếng Anh', 'Lớp 10', 'INTERMEDIATE', 'Dạy Tiếng Anh Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor26@mentor-matching.local', 'Đại số', 'Lớp 10', 'EXPERT', 'Dạy Đại số Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor26@mentor-matching.local', 'Hình học', 'Lớp 11', 'EXPERT', 'Dạy Hình học Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, TRUE),
    ('mentor26@mentor-matching.local', 'Toán', 'Lớp 12', 'EXPERT', 'Dạy Toán Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 350000.00, TRUE),
    ('mentor27@mentor-matching.local', 'Toán', 'Lớp 5', 'ADVANCED', 'Dạy Toán Lớp 5 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor27@mentor-matching.local', 'Tiếng Việt', 'Lớp 5', 'ADVANCED', 'Dạy Tiếng Việt Lớp 5 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor27@mentor-matching.local', 'Phương pháp học tập', NULL, 'ADVANCED', 'Dạy Phương pháp học tập theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 210000.00, TRUE),
    ('mentor28@mentor-matching.local', 'Lập trình Python', 'Lớp 9', 'ADVANCED', 'Dạy Lập trình Python Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 290000.00, TRUE),
    ('mentor28@mentor-matching.local', 'Lập trình Python', 'Lớp 11', 'EXPERT', 'Dạy Lập trình Python Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 330000.00, TRUE),
    ('mentor28@mentor-matching.local', 'Tin học', 'Lớp 12', 'ADVANCED', 'Dạy Tin học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor29@mentor-matching.local', 'Thuyết trình', NULL, 'EXPERT', 'Dạy Thuyết trình theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 260000.00, TRUE),
    ('mentor29@mentor-matching.local', 'Viết sáng tạo', 'Lớp 7', 'ADVANCED', 'Dạy Viết sáng tạo Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor29@mentor-matching.local', 'Viết sáng tạo', 'Lớp 10', 'ADVANCED', 'Dạy Viết sáng tạo Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor30@mentor-matching.local', 'Hóa học', 'Lớp 12', 'EXPERT', 'Dạy Hóa học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 340000.00, TRUE),
    ('mentor30@mentor-matching.local', 'Sinh học', 'Lớp 12', 'EXPERT', 'Dạy Sinh học Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 340000.00, TRUE),
    ('mentor30@mentor-matching.local', 'Sinh học', 'Lớp 11', 'ADVANCED', 'Dạy Sinh học Lớp 11 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor31@mentor-matching.local', 'Ngữ văn', 'Lớp 12', 'EXPERT', 'Dạy Ngữ văn Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 300000.00, TRUE),
    ('mentor31@mentor-matching.local', 'Ôn thi tốt nghiệp THPT', 'Lớp 12', 'EXPERT', 'Dạy Ôn thi tốt nghiệp THPT Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 320000.00, TRUE),
    ('mentor31@mentor-matching.local', 'Viết sáng tạo', 'Lớp 12', 'ADVANCED', 'Dạy Viết sáng tạo Lớp 12 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor32@mentor-matching.local', 'Tin học', 'Lớp 7', 'ADVANCED', 'Dạy Tin học Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 200000.00, TRUE),
    ('mentor32@mentor-matching.local', 'Tin học', 'Lớp 10', 'ADVANCED', 'Dạy Tin học Lớp 10 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 230000.00, TRUE),
    ('mentor32@mentor-matching.local', 'Thuyết trình', NULL, 'INTERMEDIATE', 'Dạy Thuyết trình theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 220000.00, TRUE),
    ('mentor33@mentor-matching.local', 'Tiếng Hàn', NULL, 'ADVANCED', 'Dạy Tiếng Hàn theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 280000.00, TRUE),
    ('mentor33@mentor-matching.local', 'Tiếng Anh', 'Lớp 9', 'INTERMEDIATE', 'Dạy Tiếng Anh Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor34@mentor-matching.local', 'Toán', 'Lớp 2', 'ADVANCED', 'Dạy Toán Lớp 2 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 170000.00, TRUE),
    ('mentor34@mentor-matching.local', 'Tiếng Anh', 'Lớp 3', 'ADVANCED', 'Dạy Tiếng Anh Lớp 3 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 180000.00, TRUE),
    ('mentor34@mentor-matching.local', 'Tiếng Việt', 'Lớp 3', 'ADVANCED', 'Dạy Tiếng Việt Lớp 3 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 170000.00, TRUE),
    ('mentor35@mentor-matching.local', 'Ôn thi vào lớp 10', 'Lớp 9', 'EXPERT', 'Dạy Ôn thi vào lớp 10 Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 280000.00, TRUE),
    ('mentor35@mentor-matching.local', 'Toán', 'Lớp 9', 'EXPERT', 'Dạy Toán Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 260000.00, TRUE),
    ('mentor35@mentor-matching.local', 'Đại số', 'Lớp 9', 'ADVANCED', 'Dạy Đại số Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor35@mentor-matching.local', 'Hình học', 'Lớp 9', 'ADVANCED', 'Dạy Hình học Lớp 9 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor36@mentor-matching.local', 'Tiếng Anh', 'Lớp 6', 'ADVANCED', 'Dạy Tiếng Anh Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 190000.00, TRUE),
    ('mentor36@mentor-matching.local', 'Tiếng Anh', 'Lớp 7', 'ADVANCED', 'Dạy Tiếng Anh Lớp 7 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 200000.00, TRUE),
    ('mentor36@mentor-matching.local', 'Tiếng Anh', 'Lớp 8', 'ADVANCED', 'Dạy Tiếng Anh Lớp 8 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 210000.00, TRUE),
    ('mentor37@mentor-matching.local', 'Toán tư duy', 'Lớp 3', 'ADVANCED', 'Dạy Toán tư duy Lớp 3 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 220000.00, TRUE),
    ('mentor37@mentor-matching.local', 'Toán tư duy', 'Lớp 6', 'ADVANCED', 'Dạy Toán tư duy Lớp 6 theo lộ trình cá nhân hóa, có kiểm tra nền tảng và bài luyện sau buổi học.', 240000.00, TRUE),
    ('mentor37@mentor-matching.local', 'Phương pháp học tập', NULL, 'ADVANCED', 'Dạy Phương pháp học tập theo mục tiêu cá nhân, có lộ trình rõ ràng và theo dõi tiến bộ qua từng giai đoạn.', 220000.00, TRUE);

INSERT INTO mentor_subjects (
    mentor_id, subject_grade_id, proficiency_level, teaching_note, price_per_hour, is_active
)
SELECT mp.id, sg.id, ms.proficiency_level, ms.teaching_note, ms.price_per_hour, ms.is_active
FROM tmp_demo_mentor_subjects ms
JOIN users u ON u.email = ms.mentor_email AND u.role = 'MENTOR'
JOIN mentor_profiles mp ON mp.user_id = u.id
JOIN subjects s ON s.name = ms.subject_name
JOIN subject_grades sg ON sg.subject_id = s.id
LEFT JOIN grades g ON g.id = sg.grade_id
WHERE (
        (ms.grade_name IS NULL AND sg.grade_id IS NULL)
        OR g.name = ms.grade_name
    )
  AND NOT EXISTS (
      SELECT 1
      FROM mentor_subjects existing
      WHERE existing.mentor_id = mp.id
        AND existing.subject_grade_id = sg.id
  );

DROP TEMPORARY TABLE tmp_demo_mentor_subjects;
