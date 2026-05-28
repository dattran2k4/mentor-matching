-- Seed demo mentor profiles for mentor demo accounts.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_demo_mentor_profiles (
    email VARCHAR(255) NOT NULL,
    avatar_url TEXT NOT NULL,
    gender VARCHAR(50),
    hometown_city_code VARCHAR(50) NOT NULL,
    current_district_code VARCHAR(50) NOT NULL,
    headline VARCHAR(255),
    introduction TEXT,
    teaching_style TEXT,
    experience_years INT,
    current_position VARCHAR(255),
    workplace VARCHAR(255),
    education VARCHAR(255),
    major VARCHAR(255),
    meeting_type VARCHAR(50),
    approval_status VARCHAR(50),
    approval_note TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_demo_mentor_profiles (
    email, avatar_url, gender, hometown_city_code, current_district_code,
    headline, introduction, teaching_style, experience_years,
    current_position, workplace, education, major,
    meeting_type, approval_status, approval_note
)
VALUES
    ('mentor01@mentor-matching.local', 'https://i.pravatar.cc/300?img=1', 'FEMALE', '01', '00166',
     'Gia sư Toán THCS, đồng hành ôn thi vào lớp 10',
     'Mình có kinh nghiệm kèm học sinh THCS, đặc biệt là các bạn bị mất gốc Toán hoặc thiếu tự tin khi làm bài. Mình từng hỗ trợ học sinh cải thiện từ mức trung bình lên khá bằng cách xây lại nền tảng đại số, hình học và kỹ năng trình bày. Mình phù hợp với học sinh cần một lộ trình rõ ràng và có người theo sát tiến bộ.',
     'Buổi đầu mình kiểm tra nhanh lỗ hổng kiến thức để biết học sinh đang vướng ở đâu. Sau đó mình chia bài học thành từng phần nhỏ: nhắc lại kiến thức, làm ví dụ mẫu, luyện bài cùng mentor và giao bài tự luyện. Mỗi vài buổi mình sẽ tổng kết lỗi thường gặp để học sinh thấy được tiến bộ thật.',
     3, 'Sinh viên ngành Sư phạm Toán', 'Đại học Sư phạm Hà Nội', 'Đại học', 'Sư phạm Toán', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor02@mentor-matching.local', 'https://i.pravatar.cc/300?img=2', 'MALE', '79', '26740',
     'Mentor Vật lý định hướng thi THPT',
     'Mình xuất phát từ nền tảng kỹ thuật nên luôn cố gắng giúp học sinh hiểu bản chất công thức thay vì học thuộc máy móc. Mình có kinh nghiệm dạy Vật lý cho học sinh lớp 10 đến lớp 12, từ mức cơ bản đến luyện đề vận dụng. Điểm mạnh của mình là biến các bài toán dài thành từng bước xử lý rõ ràng.',
     'Mình thường bắt đầu bằng hiện tượng thực tế, sau đó mới đi vào công thức và dạng bài. Học sinh sẽ được luyện theo từng nhóm kỹ năng: đọc đề, chọn công thức, đổi đơn vị, trình bày lời giải và kiểm tra đáp án. Sau mỗi buổi mình ghi lại lỗi sai chính để buổi sau không lặp lại.',
     5, 'Kỹ sư phần mềm', 'Công ty công nghệ tại TP.HCM', 'Đại học', 'Kỹ thuật máy tính', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor03@mentor-matching.local', 'https://i.pravatar.cc/300?img=3', 'FEMALE', '48', '20263',
     'Mentor Tiếng Anh và IELTS nền tảng cho học sinh cấp 3',
     'Mình hỗ trợ học sinh xây nền tiếng Anh vững trước khi bước vào luyện đề. Với các bạn mới bắt đầu IELTS, mình ưu tiên ngữ pháp, từ vựng học thuật, phát âm và kỹ năng đọc hiểu thay vì ép làm đề quá sớm. Mình phù hợp với học sinh muốn học có lộ trình và cần người chữa lỗi kỹ.',
     'Mình dạy theo từng kỹ năng, có bài tập ngắn sau mỗi buổi và phần chữa lỗi chi tiết. Khi học Writing hoặc Speaking, mình không chỉ sửa câu mà còn giải thích vì sao cách diễn đạt đó tự nhiên hoặc chưa tự nhiên. Mỗi tháng mình review mục tiêu để điều chỉnh tốc độ học phù hợp.',
     4, 'IELTS Tutor', 'Trung tâm Anh ngữ', 'Đại học', 'Ngôn ngữ Anh', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor04@mentor-matching.local', 'https://i.pravatar.cc/300?img=4', 'MALE', '01', '00367',
     'Mentor Python và tư duy lập trình cho học sinh mới bắt đầu',
     'Mình dạy lập trình cho học sinh từ cấp 2 đến cấp 3, đặc biệt là các bạn chưa từng viết code. Mục tiêu của mình là giúp học sinh hiểu tư duy giải quyết vấn đề, biết chia nhỏ bài toán và tự tin tự viết chương trình đầu tiên. Mình cũng hỗ trợ các bạn muốn chuẩn bị nền tảng cho ngành công nghệ thông tin.',
     'Mình ưu tiên học qua bài tập nhỏ, trực quan và có sản phẩm sau mỗi giai đoạn. Học sinh sẽ được hướng dẫn cách đọc lỗi, debug từng bước và giải thích lại ý tưởng bằng lời của mình. Khi học tốt nền tảng, mình mới tăng dần độ khó với bài toán dữ liệu, game nhỏ hoặc web đơn giản.',
     4, 'Backend Developer', 'Startup giáo dục', 'Đại học', 'Khoa học máy tính', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor05@mentor-matching.local', 'https://i.pravatar.cc/300?img=5', 'FEMALE', '79', '26929',
     'Gia sư Ngữ văn giúp học sinh biết lập ý và viết rõ',
     'Mình đồng hành với học sinh THCS và THPT trong môn Ngữ văn, nhất là các bạn sợ viết dài hoặc chưa biết triển khai ý. Mình không bắt học sinh học thuộc văn mẫu mà hướng dẫn cách đọc đề, tìm luận điểm và dùng dẫn chứng phù hợp. Mình tin rằng viết tốt bắt đầu từ việc hiểu mình muốn nói gì.',
     'Mỗi buổi học có phần đọc hiểu ngắn, phân tích cấu trúc bài và luyện viết theo từng đoạn. Mình chữa bài bằng cách chỉ ra điểm mạnh trước, sau đó mới sửa lỗi diễn đạt, bố cục và dẫn chứng. Học sinh sẽ có sổ lỗi cá nhân để theo dõi những điểm cần cải thiện qua từng tuần.',
     6, 'Giáo viên Ngữ văn', 'Trường THPT tư thục', 'Đại học', 'Sư phạm Ngữ văn', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor06@mentor-matching.local', 'https://i.pravatar.cc/300?img=6', 'FEMALE', '92', '31153',
     'Mentor Hóa học và Sinh học cho học sinh THCS, THPT',
     'Mình có kinh nghiệm hỗ trợ học sinh học Hóa và Sinh từ nền tảng đến luyện đề. Với các bạn mới làm quen Hóa học, mình tập trung vào bản chất phản ứng, cách cân bằng phương trình và phương pháp ghi nhớ hệ thống. Với Sinh học, mình giúp học sinh liên kết kiến thức thay vì học rời rạc.',
     'Mình dạy bằng sơ đồ, bảng so sánh và câu hỏi gợi mở để học sinh tự giải thích lại bài. Bài tập được chia theo mức: nhận biết, thông hiểu, vận dụng và bài tổng hợp. Sau mỗi chủ đề mình có một buổi ôn nhanh để học sinh tự kiểm tra xem phần nào còn lỏng.',
     5, 'Gia sư Khoa học tự nhiên', 'Tự do', 'Đại học', 'Công nghệ sinh học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor07@mentor-matching.local', 'https://i.pravatar.cc/300?img=7', 'MALE', '75', '26068',
     'Mentor Toán nâng cao cho học sinh khá giỏi',
     'Mình từng tham gia đội tuyển Toán và có kinh nghiệm hướng dẫn học sinh khá giỏi luyện chuyên đề. Mình phù hợp với học sinh đã có nền tảng ổn, muốn thử sức với bài toán khó hơn hoặc chuẩn bị cho kỳ thi chọn lớp, chọn đội tuyển. Mình chú trọng tư duy phân tích thay vì mẹo giải nhanh thiếu nền.',
     'Mình thường yêu cầu học sinh trình bày hướng nghĩ trước khi xem lời giải. Sau đó mình cùng học sinh so sánh nhiều cách tiếp cận để chọn cách gọn và chắc nhất. Với bài khó, mình chia thành các gợi ý nhỏ để học sinh vẫn là người tự đi tới lời giải.',
     2, 'Sinh viên ngành Toán ứng dụng', 'Đại học Bách khoa', 'Đại học', 'Toán ứng dụng', 'ONLINE', 'SUSPENDED', 'Demo mentor tạm khóa để test trạng thái.'),

    ('mentor08@mentor-matching.local', 'https://i.pravatar.cc/300?img=8', 'MALE', '66', '22303',
     'Mentor Tin học phổ thông và Scratch cho học sinh nhỏ tuổi',
     'Mình thích dạy học sinh nhỏ tuổi tiếp cận máy tính một cách vui vẻ nhưng có cấu trúc. Với Scratch và Tin học cơ bản, mình giúp học sinh làm quen tư duy thuật toán, vòng lặp, điều kiện và cách biến ý tưởng thành sản phẩm nhỏ. Phụ huynh có thể theo dõi kết quả qua từng dự án học sinh làm được.',
     'Mỗi buổi học có một mục tiêu cụ thể như làm trò chơi, hoạt cảnh hoặc bài tập tương tác. Mình hướng dẫn từng bước nhưng luôn để học sinh tự chọn chi tiết sáng tạo. Khi có lỗi, mình biến lỗi thành câu hỏi để học sinh học cách quan sát và sửa vấn đề.',
     3, 'Giảng viên câu lạc bộ STEM', 'Trung tâm STEM địa phương', 'Cao đẳng', 'Tin học ứng dụng', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor09@mentor-matching.local', 'https://i.pravatar.cc/300?img=9', 'FEMALE', '56', '22516',
     'Gia sư Tiếng Anh giao tiếp và ngữ pháp căn bản',
     'Mình làm việc tốt với học sinh mất gốc tiếng Anh hoặc ngại nói. Mình giúp các bạn xây lại từ phát âm, cấu trúc câu cơ bản, từ vựng theo chủ đề và phản xạ giao tiếp hằng ngày. Mục tiêu của mình là để học sinh thấy tiếng Anh có thể học từng chút một, không phải một khối kiến thức quá đáng sợ.',
     'Mình kết hợp luyện nói ngắn, bài tập ngữ pháp vừa sức và hoạt động nghe lặp lại. Mỗi buổi học đều có phần sửa lỗi phát âm hoặc dùng từ, nhưng mình giữ nhịp học nhẹ để học sinh không bị áp lực. Cuối tuần mình gửi checklist nhỏ để học sinh tự ôn.',
     4, 'English Teaching Assistant', 'Trung tâm ngoại ngữ', 'Đại học', 'Ngôn ngữ Anh', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor10@mentor-matching.local', 'https://i.pravatar.cc/300?img=10', 'MALE', '68', '25000',
     'Mentor Toán và Lý cho học sinh cần kỷ luật học tập',
     'Mình phù hợp với học sinh cần một người kèm sát, nhắc tiến độ và rèn thói quen làm bài đều. Mình đã hỗ trợ nhiều bạn cải thiện điểm kiểm tra bằng cách chia nhỏ mục tiêu từng tuần, không để dồn bài tới sát ngày thi. Ngoài kiến thức Toán Lý, mình chú ý cả cách ghi vở và tự ôn.',
     'Mình đặt mục tiêu rõ cho từng buổi và có bài kiểm tra nhanh đầu hoặc cuối buổi. Khi học sinh sai, mình không chỉ chữa đáp án mà truy lại bước tư duy dẫn đến lỗi. Phụ huynh có thể nhận nhận xét ngắn sau buổi nếu cần theo dõi tiến độ.',
     6, 'Kỹ sư điện', 'Công ty năng lượng', 'Đại học', 'Kỹ thuật điện', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor11@mentor-matching.local', 'https://i.pravatar.cc/300?img=11', 'FEMALE', '86', '29254',
     'Mentor Lịch sử và Địa lý theo hướng kể chuyện dễ nhớ',
     'Mình giúp học sinh học các môn xã hội bằng cách kết nối sự kiện, nhân vật, bản đồ và bối cảnh thay vì học thuộc từng đoạn rời rạc. Mình phù hợp với học sinh cần cải thiện kỹ năng ghi nhớ, trình bày ý và trả lời câu hỏi tự luận. Mình tin các môn xã hội sẽ dễ hơn nhiều khi học sinh nhìn thấy câu chuyện phía sau dữ kiện.',
     'Mình dùng timeline, sơ đồ tư duy và câu hỏi gợi mở trong mỗi buổi học. Sau phần kiến thức, học sinh luyện trả lời ngắn rồi mở rộng thành đoạn văn hoàn chỉnh. Mình cũng hướng dẫn cách tự tạo flashcard và cách ôn trước kiểm tra để giảm học vẹt.',
     3, 'Sinh viên ngành Sư phạm Lịch sử', 'Đại học Cần Thơ', 'Đại học', 'Sư phạm Lịch sử', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor12@mentor-matching.local', 'https://i.pravatar.cc/300?img=12', 'MALE', '48', '20194',
     'Mentor Lập trình Web cho học sinh cấp 3',
     'Mình hướng dẫn học sinh cấp 3 làm quen với HTML, CSS, JavaScript và cách xây một trang web hoàn chỉnh. Mình không chỉ dạy cú pháp mà còn giải thích cách tổ chức file, cách đọc tài liệu và cách biến một ý tưởng nhỏ thành sản phẩm có thể chạy được. Mình phù hợp với học sinh muốn thử ngành công nghệ trước khi chọn đại học.',
     'Mình dạy theo dự án nhỏ, mỗi giai đoạn có sản phẩm nhìn thấy được. Học sinh sẽ được tự chỉnh giao diện, thêm tương tác và học cách debug bằng trình duyệt. Khi nền tảng ổn, mình giới thiệu thêm Git, API đơn giản và tư duy chia component.',
     4, 'Frontend Developer', 'Công ty sản phẩm số', 'Đại học', 'Công nghệ phần mềm', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor13@mentor-matching.local', 'https://i.pravatar.cc/300?img=13', 'FEMALE', '01', '00004',
     'Gia sư Tiếng Việt tiểu học kiên nhẫn và sát sao',
     'Mình có kinh nghiệm kèm học sinh tiểu học luyện đọc, chính tả, tập làm văn và kỹ năng trình bày bài. Mình đặc biệt kiên nhẫn với các bạn nhỏ thiếu tập trung hoặc chưa có thói quen học ở nhà. Mục tiêu của mình là giúp học sinh tiến bộ từng chút mà vẫn giữ cảm giác vui khi học.',
     'Mình chia buổi học thành nhiều hoạt động ngắn để học sinh không bị mệt. Các phần đọc, viết và luyện từ được xen kẽ với câu hỏi gợi mở hoặc trò chơi nhỏ. Sau mỗi buổi mình ghi lại điểm cần luyện thêm để phụ huynh có thể hỗ trợ con ở nhà.',
     5, 'Giáo viên tiểu học', 'Trường tiểu học tư thục', 'Đại học', 'Giáo dục tiểu học', 'OFFLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor14@mentor-matching.local', 'https://i.pravatar.cc/300?img=14', 'MALE', '79', '26824',
     'Mentor SAT Math và Toán tiếng Anh',
     'Mình hỗ trợ học sinh làm quen với SAT Math, toán bằng tiếng Anh và kỹ năng xử lý đề chuẩn hóa. Mình phù hợp với học sinh đã có nền Toán ổn nhưng chưa quen cách đọc đề tiếng Anh hoặc áp lực thời gian. Mình tập trung vào chiến lược làm bài, quản lý thời gian và nhận diện dạng câu hỏi.',
     'Mình bắt đầu bằng diagnostic test để xác định nhóm lỗi chính. Sau đó học sinh luyện theo từng chủ đề, từ đại số, hàm số, hình học đến dữ liệu và xác suất. Mỗi buổi đều có phần timing ngắn để học sinh quen nhịp thi thật.',
     4, 'SAT Math Mentor', 'Tự do', 'Đại học', 'Tài chính định lượng', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor15@mentor-matching.local', 'https://i.pravatar.cc/300?img=15', 'FEMALE', '79', '27073',
     'Mentor Sinh học giúp học sinh hiểu hệ thống kiến thức',
     'Mình yêu thích Sinh học vì môn này có nhiều liên kết thú vị giữa cơ thể, môi trường và đời sống. Mình giúp học sinh học theo hệ thống thay vì ghi nhớ từng đoạn sách giáo khoa. Với học sinh lớp 9 đến lớp 12, mình tập trung vào khái niệm cốt lõi, sơ đồ hóa kiến thức và luyện câu hỏi vận dụng.',
     'Mình thường dùng hình vẽ, bảng so sánh và câu hỏi vì sao để học sinh tự giải thích hiện tượng. Mỗi chủ đề có phần tổng kết bằng sơ đồ, sau đó luyện câu hỏi từ dễ đến khó. Khi học sinh sai, mình truy ngược lại khái niệm gốc để sửa tận nơi.',
     3, 'Sinh viên Y khoa', 'Đại học Y Dược', 'Đại học', 'Y đa khoa', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor16@mentor-matching.local', 'https://i.pravatar.cc/300?img=16', 'MALE', '75', '26041',
     'Gia sư Toán tiểu học và Toán tư duy',
     'Mình dạy Toán cho học sinh tiểu học theo hướng nhẹ nhàng, nhiều ví dụ gần với đời sống. Mình giúp các bạn nhỏ hiểu phép tính, bài toán có lời văn và các dạng tư duy logic thay vì chỉ làm theo mẫu. Mình phù hợp với học sinh cần xây nền tự tin từ sớm.',
     'Mình dùng câu hỏi, hình minh họa và bài tập ngắn để giữ nhịp học. Với bài toán khó, mình hướng dẫn học sinh kể lại đề bằng lời của mình trước khi giải. Mình luôn khuyến khích học sinh giải thích cách nghĩ, vì đó là dấu hiệu quan trọng hơn đáp án đúng một lần.',
     2, 'Gia sư tiểu học', 'Tự do', 'Đại học', 'Giáo dục học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor17@mentor-matching.local', 'https://i.pravatar.cc/300?img=17', 'FEMALE', '01', '00235',
     'Mentor TOEIC và tiếng Anh công việc',
     'Mình hỗ trợ học viên lớn hơn hoặc học sinh cuối cấp cần TOEIC, tiếng Anh công việc và kỹ năng đọc hiểu tài liệu. Mình có kinh nghiệm xây lộ trình cho người bận rộn, cần học đều nhưng không có quá nhiều thời gian mỗi ngày. Mình tập trung vào điểm số thực tế nhưng vẫn giữ nền ngôn ngữ chắc.',
     'Mình chia mục tiêu theo tuần với lượng bài vừa phải. Trong buổi học, học viên luyện nghe đọc theo dạng câu hỏi, phân tích bẫy thường gặp và học từ vựng theo ngữ cảnh. Mỗi giai đoạn có bài mini test để xem phần nào cần tăng tốc.',
     7, 'Chuyên viên đào tạo tiếng Anh', 'Doanh nghiệp giáo dục', 'Đại học', 'Ngôn ngữ Anh', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor18@mentor-matching.local', 'https://i.pravatar.cc/300?img=18', 'MALE', '79', '27004',
     'Mentor Hóa học luyện nền tảng và bài tập tính toán',
     'Mình giúp học sinh học Hóa từ những phần nền như mol, phương trình phản ứng, dung dịch đến bài tập tính toán tổng hợp. Mình hiểu nhiều bạn sợ Hóa vì có quá nhiều công thức, nên mình ưu tiên cách phân loại bài và nhận biết dữ kiện. Khi học sinh nắm được khung xử lý, môn Hóa sẽ bớt rối hơn nhiều.',
     'Mình dạy theo dạng bài, mỗi dạng có công thức nền, ví dụ mẫu và bài tự luyện tăng dần. Học sinh được yêu cầu ghi rõ giả thiết, đổi đơn vị và kiểm tra kết quả. Mình cũng có các bảng tóm tắt phản ứng quan trọng để học sinh ôn nhanh trước kiểm tra.',
     5, 'Kỹ thuật viên phòng thí nghiệm', 'Viện nghiên cứu ứng dụng', 'Đại học', 'Hóa học', 'ONLINE', 'SUSPENDED', 'Demo mentor tạm khóa để test trạng thái.'),

    ('mentor19@mentor-matching.local', 'https://i.pravatar.cc/300?img=19', 'MALE', '92', '31153',
     'Mentor Địa lý và kỹ năng đọc Atlat',
     'Mình hướng dẫn học sinh học Địa lý bằng bản đồ, số liệu và cách đọc Atlat hiệu quả. Mình phù hợp với học sinh lớp 9 đến lớp 12 cần cải thiện điểm kiểm tra hoặc ôn thi tốt nghiệp. Mục tiêu của mình là giúp học sinh biết cách lấy thông tin, so sánh và trình bày câu trả lời mạch lạc.',
     'Mỗi buổi mình chọn một nhóm kỹ năng cụ thể như đọc biểu đồ, phân tích bảng số liệu hoặc xác định vùng trên bản đồ. Học sinh luyện trả lời theo khung ý để tránh lan man. Sau vài buổi, mình cho bài tổng hợp để kiểm tra khả năng liên kết kiến thức.',
     4, 'Gia sư Địa lý', 'Tự do', 'Đại học', 'Địa lý học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor20@mentor-matching.local', 'https://i.pravatar.cc/300?img=20', 'FEMALE', '01', '00166',
     'Mentor IELTS Writing chữa bài kỹ và có lộ trình',
     'Mình chuyên hỗ trợ học sinh và sinh viên luyện IELTS Writing từ band nền tảng lên mức sử dụng câu chữ rõ ràng hơn. Mình không khuyến khích học thuộc bài mẫu mà tập trung vào cách phân tích đề, lập dàn ý và phát triển luận điểm. Học viên phù hợp là người muốn được chữa lỗi chi tiết và biết vì sao mình sai.',
     'Mình chữa bài theo ba lớp: ý tưởng, bố cục và ngôn ngữ. Sau mỗi bài viết, học viên nhận được nhận xét cụ thể kèm phiên bản gợi ý để học lại cách diễn đạt. Mình cũng giao bài ngắn giữa tuần để duy trì nhịp viết thay vì chỉ học trong buổi chính.',
     4, 'IELTS Writing Coach', 'Trung tâm luyện thi', 'Đại học', 'Ngôn ngữ Anh', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor21@mentor-matching.local', 'https://i.pravatar.cc/300?img=21', 'FEMALE', '79', '26743',
     'Gia sư Toán lớp 6 đến lớp 8 cho học sinh mất gốc',
     'Mình thường làm việc với học sinh chuyển cấp từ tiểu học lên THCS, khi chương trình Toán bắt đầu nhiều khái niệm mới. Mình giúp học sinh lấy lại nền phân số, số nguyên, phương trình cơ bản và hình học đầu cấp. Mình kiên nhẫn và không tạo áp lực điểm số ngay từ đầu.',
     'Mình kiểm tra nền trước, sau đó thiết kế bài học theo từng lỗ hổng cụ thể. Bài tập không quá nhiều nhưng được chọn để học sinh hiểu đúng bản chất. Khi học sinh tiến bộ, mình tăng dần bài tổng hợp để các bạn quen với đề kiểm tra trên lớp.',
     3, 'Sinh viên ngành Toán', 'Đại học Khoa học Tự nhiên', 'Đại học', 'Toán học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor22@mentor-matching.local', 'https://i.pravatar.cc/300?img=22', 'MALE', '48', '20263',
     'Mentor Khoa học tự nhiên tích hợp bậc THCS',
     'Mình hỗ trợ học sinh THCS học môn Khoa học tự nhiên tích hợp, nơi các phần Lý, Hóa, Sinh thường đan xen khiến nhiều bạn bối rối. Mình giúp học sinh nhìn thấy mối liên hệ giữa hiện tượng, thí nghiệm và lý thuyết trong sách. Cách học của mình phù hợp với các bạn cần hiểu tổng thể trước khi luyện bài.',
     'Mình dùng sơ đồ chủ đề và câu hỏi thực tế để mở bài. Sau phần lý thuyết, học sinh làm bài kiểm tra ngắn theo từng mức độ để biết mình đã hiểu đến đâu. Mình cũng hướng dẫn cách ghi chú theo bảng để không lẫn kiến thức giữa các phân môn.',
     5, 'Giáo viên Khoa học tự nhiên', 'Trường THCS liên cấp', 'Đại học', 'Sư phạm Khoa học tự nhiên', 'OFFLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor23@mentor-matching.local', 'https://i.pravatar.cc/300?img=23', 'FEMALE', '75', '26068',
     'Mentor Tiếng Trung cơ bản và HSK nhập môn',
     'Mình dạy Tiếng Trung cho người mới bắt đầu, từ phát âm, pinyin, chữ Hán cơ bản đến hội thoại đời sống. Mình phù hợp với học sinh muốn học thêm ngoại ngữ thứ hai hoặc người mới cần nền tảng để luyện HSK sau này. Mình chú trọng phát âm đúng ngay từ đầu để học viên không phải sửa quá nhiều về sau.',
     'Mình kết hợp luyện nghe nói ngắn với nhận diện mặt chữ và viết từ theo bộ thủ. Mỗi buổi có phần ôn từ vựng cũ, mẫu câu mới và hội thoại ứng dụng. Học viên được giao bài nghe ngắn để giữ cảm giác với âm thanh tiếng Trung mỗi ngày.',
     3, 'Gia sư Tiếng Trung', 'Tự do', 'Đại học', 'Ngôn ngữ Trung Quốc', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor24@mentor-matching.local', 'https://i.pravatar.cc/300?img=24', 'MALE', '79', '26884',
     'Mentor quản lý thời gian và phương pháp học tập',
     'Mình hỗ trợ học sinh xây lịch học, chia mục tiêu và duy trì thói quen tự học. Nhiều bạn không yếu kiến thức nhưng dễ trì hoãn hoặc học dồn sát ngày kiểm tra, nên mình tập trung vào cách tổ chức công việc học tập. Mình phù hợp với học sinh cấp 2, cấp 3 cần một người đồng hành định hướng.',
     'Mình bắt đầu bằng việc nhìn lại lịch học hiện tại và các điểm hay bị vỡ kế hoạch. Sau đó học sinh cùng mình thiết kế lịch tuần, checklist môn học và cách tự đánh giá cuối ngày. Các buổi sau sẽ điều chỉnh kế hoạch dựa trên dữ liệu thật, không ép theo khuôn cứng.',
     6, 'Academic Coach', 'Trung tâm kỹ năng học tập', 'Đại học', 'Tâm lý giáo dục', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor25@mentor-matching.local', 'https://i.pravatar.cc/300?img=25', 'FEMALE', '56', '22516',
     'Mentor Tiếng Nhật sơ cấp và JLPT N5 N4',
     'Mình dạy Tiếng Nhật cho người mới bắt đầu, ưu tiên phát âm, bảng chữ, mẫu câu nền và thói quen ôn từ vựng đều. Với học viên hướng đến JLPT N5 hoặc N4, mình giúp xây nền ngữ pháp và luyện đọc câu ngắn trước khi làm đề. Mình thích dạy chậm mà chắc để học viên không bỏ cuộc giữa chừng.',
     'Mỗi buổi có phần ôn chữ, từ vựng, mẫu câu và hội thoại ngắn. Mình thường dùng ví dụ gần với đời sống để học viên nhớ cách dùng thay vì chỉ thuộc công thức. Khi luyện đề, mình hướng dẫn cách đọc câu hỏi và loại đáp án gây nhiễu.',
     4, 'Japanese Tutor', 'Trung tâm ngoại ngữ', 'Đại học', 'Nhật Bản học', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor26@mentor-matching.local', 'https://i.pravatar.cc/300?img=26', 'MALE', '01', '00367',
     'Mentor Đại số và Hình học lớp 9 đến lớp 12',
     'Mình tập trung vào các chuyên đề Toán quan trọng ở cuối cấp THCS và THPT như phương trình, bất đẳng thức, hình học tọa độ và hình học không gian. Mình phù hợp với học sinh muốn tăng điểm kiểm tra hoặc chuẩn bị nền cho thi tốt nghiệp. Mình thích giải thích bài toán bằng nhiều góc nhìn để học sinh chọn cách hợp với mình.',
     'Mình yêu cầu học sinh nắm định nghĩa và điều kiện áp dụng trước khi luyện công thức. Bài tập được xếp theo chuỗi tăng dần, từ nhận diện dạng đến bài phối hợp nhiều ý. Sau mỗi chuyên đề, mình cho bài tổng hợp và cùng học sinh phân tích chiến lược làm bài.',
     8, 'Giáo viên Toán', 'Trường THPT chuyên', 'Thạc sĩ', 'Toán học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor27@mentor-matching.local', 'https://i.pravatar.cc/300?img=27', 'FEMALE', '92', '31153',
     'Gia sư lớp 5 chuẩn bị chuyển cấp',
     'Mình hỗ trợ học sinh lớp 5 củng cố Toán, Tiếng Việt và kỹ năng học tập trước khi bước vào THCS. Đây là giai đoạn nhiều bạn bắt đầu cần tự học hơn, nên mình không chỉ dạy kiến thức mà còn rèn cách ghi bài, làm bài và kiểm tra lại đáp án. Mình làm việc tốt với học sinh cần sự động viên nhẹ nhàng.',
     'Mình chia buổi học thành phần kiến thức chính, bài luyện và phần tự giải có hướng dẫn. Với Tiếng Việt, mình chú trọng đọc hiểu và diễn đạt câu rõ ràng. Với Toán, mình hướng dẫn học sinh tự tóm tắt đề trước khi chọn phép tính.',
     4, 'Giáo viên tiểu học', 'Trường tiểu học song ngữ', 'Đại học', 'Giáo dục tiểu học', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor28@mentor-matching.local', 'https://i.pravatar.cc/300?img=28', 'MALE', '79', '26740',
     'Mentor Python ứng dụng cho học sinh yêu công nghệ',
     'Mình dạy Python theo hướng ứng dụng, giúp học sinh làm được công cụ nhỏ, xử lý dữ liệu đơn giản hoặc trò chơi console. Mình phù hợp với học sinh đã biết chút lập trình hoặc muốn học nghiêm túc hơn sau Scratch. Mình luôn nhấn mạnh cách đặt câu hỏi và tự tìm lỗi, vì đó là kỹ năng rất quan trọng khi học công nghệ.',
     'Mình dạy bằng bài tập có ngữ cảnh thay vì chỉ liệt kê cú pháp. Học sinh sẽ viết code trong buổi, chạy thử, đọc lỗi và cải tiến chương trình. Sau vài buổi, mình giao mini project để học sinh có cảm giác hoàn thành một sản phẩm thật.',
     5, 'Data Engineer', 'Công ty phân tích dữ liệu', 'Đại học', 'Khoa học dữ liệu', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor29@mentor-matching.local', 'https://i.pravatar.cc/300?img=29', 'FEMALE', '75', '26080',
     'Mentor Thuyết trình và viết sáng tạo',
     'Mình giúp học sinh cải thiện khả năng diễn đạt ý tưởng, viết đoạn văn rõ và thuyết trình tự tin hơn. Môn này đặc biệt phù hợp với học sinh ngại nói, ngại viết hoặc có nhiều ý nhưng chưa biết sắp xếp. Mình kết hợp kỹ năng ngôn ngữ với sự tự tin khi trình bày trước người khác.',
     'Mình bắt đầu từ bài nói hoặc bài viết rất ngắn để học sinh không bị áp lực. Sau đó mình hướng dẫn cách mở ý, chọn ví dụ, dùng giọng nói và ngôn ngữ cơ thể. Mỗi buổi học sinh đều có một phần trình bày nhỏ và nhận feedback cụ thể.',
     3, 'Huấn luyện viên kỹ năng mềm', 'Câu lạc bộ tranh biện', 'Đại học', 'Truyền thông', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor30@mentor-matching.local', 'https://i.pravatar.cc/300?img=30', 'MALE', '66', '22303',
     'Mentor Hóa Sinh cho học sinh định hướng khối B',
     'Mình hỗ trợ học sinh định hướng khối B học Hóa và Sinh theo lộ trình dài hơi. Mình giúp các bạn nắm nền trước, sau đó mới chuyển sang luyện đề và kỹ thuật làm bài nhanh. Mình phù hợp với học sinh có mục tiêu y dược, sinh học hoặc các ngành khoa học sức khỏe.',
     'Mình lập kế hoạch theo chủ đề lớn và gắn mỗi chủ đề với dạng câu hỏi thường gặp. Học sinh luyện bài theo mức độ tăng dần và có phần tự giải thích lại khái niệm sau mỗi buổi. Với bài sai, mình phân loại lỗi do kiến thức, đọc đề hay tính toán để sửa đúng điểm.',
     6, 'Sinh viên Y khoa năm cuối', 'Đại học Y Dược', 'Đại học', 'Y đa khoa', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor31@mentor-matching.local', 'https://i.pravatar.cc/300?img=31', 'FEMALE', '01', '00070',
     'Mentor Ngữ văn ôn thi tốt nghiệp THPT',
     'Mình hỗ trợ học sinh lớp 12 ôn Ngữ văn theo hướng nắm chắc tác phẩm, biết triển khai nghị luận và tránh học thuộc máy móc. Mình giúp học sinh xây bộ ý chính, cách mở bài kết bài và cách dùng dẫn chứng linh hoạt. Mục tiêu là bài viết đủ ý, rõ mạch và có giọng văn tự nhiên.',
     'Mình dạy theo từng dạng đề, sau đó luyện viết từng phần trước khi viết cả bài. Học sinh được chữa lỗi về luận điểm, bố cục, dẫn chứng và diễn đạt. Mỗi tuần mình có phần ôn nhanh tác phẩm để giữ kiến thức không bị rơi.',
     7, 'Giáo viên Ngữ văn', 'Trung tâm luyện thi', 'Đại học', 'Sư phạm Ngữ văn', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor32@mentor-matching.local', 'https://i.pravatar.cc/300?img=32', 'MALE', '79', '27094',
     'Mentor Tin học văn phòng và kỹ năng số',
     'Mình hướng dẫn học sinh và người mới sử dụng máy tính các kỹ năng tin học cơ bản, soạn thảo văn bản, bảng tính và trình bày slide. Mình phù hợp với học viên cần học thực tế để dùng ngay trong học tập hoặc công việc. Mình cũng hỗ trợ tư duy tổ chức file, tìm kiếm thông tin và an toàn số cơ bản.',
     'Mình dạy theo tình huống thực hành, ví dụ tạo bảng điểm, làm bài thuyết trình hoặc định dạng báo cáo. Học viên thao tác trực tiếp trong buổi và được sửa từng bước. Sau mỗi buổi có bài thực hành ngắn để củng cố kỹ năng vừa học.',
     5, 'IT Support Specialist', 'Doanh nghiệp dịch vụ', 'Cao đẳng', 'Hệ thống thông tin', 'OFFLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor33@mentor-matching.local', 'https://i.pravatar.cc/300?img=33', 'FEMALE', '48', '20194',
     'Mentor Tiếng Hàn sơ cấp và TOPIK nhập môn',
     'Mình dạy Tiếng Hàn cho người mới bắt đầu, từ bảng chữ Hangeul, phát âm, mẫu câu cơ bản đến giao tiếp đời sống. Mình phù hợp với học sinh hoặc sinh viên muốn học ngoại ngữ thứ hai theo nhịp nhẹ nhưng đều. Với TOPIK nhập môn, mình giúp học viên xây nền từ vựng và ngữ pháp trước khi luyện đề.',
     'Mình kết hợp luyện đọc, nghe, nói ngắn và viết câu đơn giản trong mỗi buổi. Học viên được ôn lại bằng flashcard và đoạn hội thoại ngắn. Khi học viên phát âm sai, mình sửa ngay bằng cách tách âm và luyện lặp có kiểm soát.',
     3, 'Korean Tutor', 'Tự do', 'Đại học', 'Hàn Quốc học', 'ONLINE', 'PENDING', 'Chờ admin duyệt hồ sơ demo.'),

    ('mentor34@mentor-matching.local', 'https://i.pravatar.cc/300?img=34', 'FEMALE', '79', '27058',
     'Gia sư Toán và Tiếng Anh cho học sinh tiểu học',
     'Mình thích làm việc với học sinh nhỏ tuổi và giúp các bạn xây cảm giác học tập tích cực. Với Toán, mình tập trung vào hiểu đề, tính toán cẩn thận và tư duy logic. Với Tiếng Anh, mình ưu tiên từ vựng đời sống, phát âm và mẫu câu ngắn dễ dùng.',
     'Mình tổ chức buổi học thành nhiều hoạt động nhỏ để học sinh không mất tập trung. Các bài luyện được chọn vừa sức nhưng có một chút thử thách để học sinh thấy mình tiến bộ. Mình thường gửi nhận xét ngắn cho phụ huynh sau buổi học để cùng theo dõi thói quen học.',
     2, 'Sinh viên ngành Giáo dục tiểu học', 'Đại học Sư phạm', 'Đại học', 'Giáo dục tiểu học', 'HYBRID', 'PENDING', 'Chờ admin duyệt hồ sơ demo.'),

    ('mentor35@mentor-matching.local', 'https://i.pravatar.cc/300?img=35', 'MALE', '75', '26020',
     'Mentor luyện thi vào lớp 10 môn Toán',
     'Mình chuyên kèm học sinh lớp 9 chuẩn bị thi vào lớp 10, đặc biệt là các bạn cần tăng tốc trong 3 đến 6 tháng cuối. Mình giúp học sinh hệ thống lại các chuyên đề trọng tâm, luyện đề theo cấu trúc và xử lý lỗi sai có kế hoạch. Mình phù hợp với học sinh cần mục tiêu rõ và lịch học nghiêm túc.',
     'Mình chia lộ trình thành ba giai đoạn: vá nền, luyện dạng và luyện đề tổng hợp. Sau mỗi đề, học sinh không chỉ biết điểm mà còn biết mất điểm ở dạng nào. Mình giữ bảng theo dõi lỗi sai để các buổi sau tập trung đúng phần cần cải thiện.',
     6, 'Giáo viên Toán luyện thi', 'Trung tâm luyện thi lớp 10', 'Đại học', 'Sư phạm Toán', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor36@mentor-matching.local', 'https://i.pravatar.cc/300?img=36', 'FEMALE', '92', '31153',
     'Mentor tiếng Anh cho học sinh mất gốc cấp 2',
     'Mình hỗ trợ học sinh cấp 2 lấy lại nền tiếng Anh từ phát âm, từ vựng cơ bản và cấu trúc câu thường gặp. Mình hiểu nhiều bạn sợ tiếng Anh vì học lâu nhưng không biết bắt đầu lại từ đâu. Mình giúp học sinh học từng phần nhỏ và có cảm giác kiểm soát được tiến độ.',
     'Mỗi buổi học có phần ôn cũ, kiến thức mới và luyện bài ngắn ngay tại lớp. Mình sửa lỗi bằng ví dụ đơn giản và cho học sinh lặp lại nhiều lần trong ngữ cảnh khác nhau. Sau vài tuần, học sinh sẽ có bộ ghi chú riêng để tự ôn trước kiểm tra.',
     4, 'Gia sư Tiếng Anh THCS', 'Tự do', 'Đại học', 'Ngôn ngữ Anh', 'HYBRID', 'APPROVED', 'Demo mentor đã duyệt.'),

    ('mentor37@mentor-matching.local', 'https://i.pravatar.cc/300?img=37', 'MALE', '79', '26944',
     'Mentor tư duy logic và giải quyết vấn đề',
     'Mình dạy các chủ đề tư duy logic, toán vui và kỹ năng giải quyết vấn đề cho học sinh tiểu học lớn và THCS. Mục tiêu không chỉ là làm đúng bài, mà là biết đặt câu hỏi, thử cách tiếp cận và không sợ bài lạ. Mình phù hợp với học sinh thích khám phá hoặc cần rèn khả năng suy luận.',
     'Mình dùng bài toán ngắn, trò chơi logic và thử thách theo cấp độ. Học sinh được khuyến khích giải thích cách nghĩ, kể cả khi đáp án chưa đúng. Sau mỗi buổi mình tổng kết một chiến thuật tư duy nhỏ để học sinh áp dụng vào bài học sau.',
     3, 'Mentor tư duy logic', 'Câu lạc bộ học thuật', 'Đại học', 'Khoa học máy tính', 'ONLINE', 'APPROVED', 'Demo mentor đã duyệt.');

INSERT INTO mentor_profiles (
    user_id,
    avatar_url,
    gender,
    hometown_city_id,
    current_district_id,
    headline,
    introduction,
    teaching_style,
    experience_years,
    current_position,
    workplace,
    education,
    major,
    meeting_type,
    approval_status,
    approval_note
)
SELECT
    u.id,
    mp.avatar_url,
    mp.gender,
    c.id,
    d.id,
    mp.headline,
    mp.introduction,
    mp.teaching_style,
    mp.experience_years,
    mp.current_position,
    mp.workplace,
    mp.education,
    mp.major,
    mp.meeting_type,
    mp.approval_status,
    mp.approval_note
FROM tmp_demo_mentor_profiles mp
JOIN users u ON u.email = mp.email AND u.role = 'MENTOR'
JOIN cities c ON c.code = mp.hometown_city_code
JOIN districts d ON d.code = mp.current_district_code AND d.city_id = c.id
WHERE NOT EXISTS (
    SELECT 1
    FROM mentor_profiles existing
    WHERE existing.user_id = u.id
);

DROP TEMPORARY TABLE tmp_demo_mentor_profiles;
