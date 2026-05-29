-- Seed base mentor profile options.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_personality_options (
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_personality_options (name, description)
VALUES
    ('Kiên nhẫn', 'Phù hợp với học sinh cần thời gian để hiểu bài, dễ mất tự tin hoặc cần được giải thích lại nhiều lần.'),
    ('Thân thiện', 'Tạo cảm giác thoải mái trong buổi học, giúp học sinh dễ đặt câu hỏi và bớt áp lực.'),
    ('Kỷ luật', 'Giữ nhịp học rõ ràng, theo sát bài tập và phù hợp với học sinh cần rèn thói quen học đều.'),
    ('Truyền cảm hứng', 'Biết khơi gợi hứng thú học tập, liên hệ kiến thức với mục tiêu và câu chuyện thực tế.'),
    ('Tỉ mỉ', 'Chú ý từng lỗi nhỏ trong cách làm bài, cách diễn đạt và quá trình luyện tập của học sinh.'),
    ('Năng động', 'Buổi học có nhiều tương tác, ví dụ thực tế và hoạt động giúp học sinh duy trì sự tập trung.'),
    ('Lắng nghe tốt', 'Quan sát phản ứng của học sinh, điều chỉnh tốc độ dạy và phản hồi theo nhu cầu cá nhân.'),
    ('Tư duy hệ thống', 'Giúp học sinh nhìn thấy cấu trúc kiến thức, mối liên hệ giữa các chủ đề và cách tự ôn tập.'),
    ('Hài hước vừa phải', 'Biết tạo không khí nhẹ nhàng mà vẫn giữ mục tiêu học tập nghiêm túc.'),
    ('Định hướng mục tiêu', 'Tập trung vào mục tiêu cụ thể như nâng điểm, ôn thi, luyện chứng chỉ hoặc xây nền kiến thức.');

INSERT INTO personality_options (name, description)
SELECT option_data.name, option_data.description
FROM tmp_personality_options option_data
WHERE NOT EXISTS (
    SELECT 1
    FROM personality_options existing
    WHERE existing.name = option_data.name
);

CREATE TEMPORARY TABLE tmp_mentor_highlight_options (
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_mentor_highlight_options (name, description)
VALUES
    ('Đã xác minh danh tính', 'Mentor đã hoàn tất bước xác minh hồ sơ cá nhân trên hệ thống.'),
    ('Được duyệt bởi admin', 'Hồ sơ mentor đã được kiểm tra và cho phép hiển thị công khai.'),
    ('Kinh nghiệm 3+ năm', 'Mentor có ít nhất ba năm kinh nghiệm dạy học, kèm cặp hoặc đào tạo.'),
    ('Kinh nghiệm 5+ năm', 'Mentor có ít nhất năm năm kinh nghiệm dạy học, phù hợp với nhu cầu học dài hạn hoặc luyện thi.'),
    ('Chuyên ôn thi', 'Có kinh nghiệm xây lộ trình, luyện đề và theo dõi tiến độ cho các kỳ thi quan trọng.'),
    ('Phù hợp học sinh mất gốc', 'Có phương pháp dạy chậm, chắc và biết xây lại nền tảng từ đầu.'),
    ('Dạy online tốt', 'Sử dụng công cụ học online hiệu quả, có tài liệu số và tương tác rõ trong buổi học từ xa.'),
    ('Có giáo án cá nhân hóa', 'Điều chỉnh nội dung học theo mục tiêu, trình độ và tốc độ tiếp thu của từng học sinh.'),
    ('Có bài tập sau buổi học', 'Cung cấp bài luyện thêm hoặc checklist ôn tập để học sinh duy trì tiến độ giữa các buổi.'),
    ('Feedback sau buổi học', 'Có nhận xét sau buổi học để học sinh hoặc phụ huynh nắm được tiến độ và điểm cần cải thiện.'),
    ('Linh hoạt lịch học', 'Có khả năng sắp xếp lịch học đa dạng, phù hợp với học sinh bận hoặc cần học ngắn hạn.'),
    ('Có chứng chỉ chuyên môn', 'Mentor có chứng chỉ, giải thưởng hoặc bằng cấp liên quan đến môn dạy.'),
    ('Giọng giảng dễ hiểu', 'Cách diễn đạt rõ ràng, chậm rãi và giúp học sinh dễ theo dõi trong suốt buổi học.'),
    ('Theo sát tiến bộ', 'Có thói quen ghi nhận lỗi sai, đánh giá tiến bộ và điều chỉnh lộ trình theo từng giai đoạn.'),
    ('Phù hợp học sinh nhỏ tuổi', 'Có kinh nghiệm giữ nhịp học, tạo tương tác và giao tiếp phù hợp với học sinh tiểu học.');

INSERT INTO mentor_highlight_options (name, description)
SELECT option_data.name, option_data.description
FROM tmp_mentor_highlight_options option_data
WHERE NOT EXISTS (
    SELECT 1
    FROM mentor_highlight_options existing
    WHERE existing.name = option_data.name
);

DROP TEMPORARY TABLE tmp_mentor_highlight_options;
DROP TEMPORARY TABLE tmp_personality_options;
