-- Seed base review tag options.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_review_tag_options (
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_review_tag_options (name, description)
VALUES
    ('Dễ hiểu', 'Mentor giải thích rõ ràng, giúp học sinh nắm được nội dung chính của buổi học.'),
    ('Kiên nhẫn', 'Mentor sẵn sàng giải thích lại và hỗ trợ học sinh khi gặp phần khó.'),
    ('Đúng giờ', 'Mentor bắt đầu và kết thúc buổi học đúng thời gian đã thống nhất.'),
    ('Chuẩn bị tốt', 'Mentor có giáo án, bài tập hoặc tài liệu phù hợp trước buổi học.'),
    ('Tương tác tốt', 'Mentor đặt câu hỏi, lắng nghe phản hồi và giữ học sinh tham gia trong buổi học.'),
    ('Theo sát tiến bộ', 'Mentor ghi nhận lỗi sai, nhận xét tiến bộ và điều chỉnh nội dung học theo nhu cầu.'),
    ('Bài tập phù hợp', 'Bài tập sau buổi học vừa sức, đúng trọng tâm và hỗ trợ học sinh tự luyện.'),
    ('Tạo động lực', 'Mentor giúp học sinh tự tin hơn và có thêm động lực học tập.'),
    ('Chuyên môn tốt', 'Mentor nắm chắc kiến thức môn học và xử lý câu hỏi của học sinh thuyết phục.'),
    ('Phản hồi rõ ràng', 'Mentor đưa ra nhận xét cụ thể, dễ hiểu cho học sinh hoặc phụ huynh.'),
    ('Lộ trình rõ ràng', 'Mentor có mục tiêu học tập, kế hoạch buổi học và định hướng giai đoạn tiếp theo.'),
    ('Thân thiện', 'Mentor tạo không khí học tập thoải mái, gần gũi và dễ trao đổi.'),
    ('Cần cải thiện tốc độ', 'Buổi học có nhịp độ chưa phù hợp, quá nhanh hoặc quá chậm so với học sinh.'),
    ('Cần thêm bài tập', 'Học sinh cần nhiều bài luyện hoặc tài liệu thực hành hơn sau buổi học.'),
    ('Cần phản hồi chi tiết hơn', 'Phần nhận xét sau buổi học còn chung chung, cần cụ thể hơn về lỗi sai và hướng cải thiện.');

INSERT INTO review_tag_options (name, description)
SELECT option_data.name, option_data.description
FROM tmp_review_tag_options option_data
WHERE NOT EXISTS (
    SELECT 1
    FROM review_tag_options existing
    WHERE existing.name = option_data.name
);

DROP TEMPORARY TABLE tmp_review_tag_options;
