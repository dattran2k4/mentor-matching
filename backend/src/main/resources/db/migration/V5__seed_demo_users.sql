-- Seed demo users for local development and manual testing.
-- Password values are existing BCrypt hashes supplied from demo data.

SET NAMES utf8mb4;

CREATE TEMPORARY TABLE tmp_demo_users (
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50),
    user_type VARCHAR(50),
    status VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_demo_users (full_name, email, password_hash, phone, role, user_type, status)
VALUES
    ('Admin Test', 'admin@test.com', '$2a$10$f8K0p/rAvE9SrsZcahthQuKA79pIAqGt9APO14f3.czxnCPp9q6Iu', '0901100001', 'ADMIN', 'WORKING_ADULT', 'ACTIVE'),
    ('Manager Nguyen Khoa', 'manager01@mentor-matching.local', '$2a$10$OEYH9he8BWJRnCytYVcmB.W4lk6WlwAHnAgVf9aQHZch5gJ.HUiAu', '0901100002', 'MANAGER', 'WORKING_ADULT', 'ACTIVE'),
    ('Manager Thuy Duong', 'manager02@mentor-matching.local', '$2a$10$2XGuYngpcuowaqhZbvTLGuhlNg5n3sn9GdbzQGyWcMvKm3G/FOZbS', '0901100003', 'MANAGER', 'WORKING_ADULT', 'ACTIVE'),

    ('Mentor Minh Anh', 'mentor01@mentor-matching.local', '$2a$10$gYToj5teNH/bDuMaboswr.RCWyw3mnhxVw7fXYTRDVoeh/qy5eVdm', '0901100004', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Quoc Huy', 'mentor02@mentor-matching.local', '$2a$10$XDav3qdVlNkr58OGZZVm7uGdQs4D9kAeqw555rq0lo6q6NG7EB87C', '0901100005', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Ngoc Mai', 'mentor03@mentor-matching.local', '$2a$10$2/BYSYBiyru0TusrcILpHejPJXShhDUbLe4AhvAvX2Loy28hZuZzq', '0901100006', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Thanh Tung', 'mentor04@mentor-matching.local', '$2a$10$k0Pe70Q6Ng7btefKDxPI9.g6dS5L/078.eb9ykojULQHrhj6QrEaG', '0901100007', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Bao Vy', 'mentor05@mentor-matching.local', '$2a$10$RQhy/.FDwnIHKS7vUx6gBeFviqoEEfPe8dAQowIlwhBwUoanbtKJ.', '0901100008', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Hoang Yen', 'mentor06@mentor-matching.local', '$2a$10$/lnvxAHZOhbb0wjfK40LYeEyd.crr3ikTYemydilZW6JlTyDdOp9e', '0901100009', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Duc Tri', 'mentor07@mentor-matching.local', '$2a$10$V53.Yc2EmYI0byjNWMYgoOAHUCRSQrQ0D5gbwu8Kau.E8j9ajjBGG', '0901100010', 'MENTOR', 'WORKING_ADULT', 'INACTIVE'),

    ('Learner Kim Ngan', 'learner01@mentor-matching.local', '$2a$10$n8Pl2zirf/Gca5l8aTKQbuEGfol/MzgtbtXXInKkINtYbn37OX0v6', '0902200001', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner An Nhi', 'learner02@mentor-matching.local', '$2a$10$qPuhubmfya.dzZPjN7n8C.e7XkwhZEIs2NWc9duaRhJehMeJxbyT2', '0902200002', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner Hoang Long', 'learner03@mentor-matching.local', '$2a$10$xU6pg09xUTnIaiUY3EAGAO7DArkh0gGi7VXFIH7jomraEsOo4fp5q', '0902200003', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner My Linh', 'learner04@mentor-matching.local', '$2a$10$ER.uoSiYqEtSX.QmliHXHOMBFrCIGwYp6cgUxcgdAq7kSVgfZPohW', '0902200004', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner Quang Huy', 'learner05@mentor-matching.local', '$2a$10$sCOOYR47CI8tKPz0hGRceusjfeNYVcxnRnTcKsWikFPmLPy0rYWXG', '0902200005', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner Diem My', 'learner06@mentor-matching.local', '$2a$10$ymkp.wkR2qE8V9nlgYNKQe6xfFEpvlNhO3hwhryYnsqii0pqAaMpC', '0902200006', 'LEARNER', 'PARENT', 'ACTIVE'),
    ('Learner Phuoc An', 'learner07@mentor-matching.local', '$2a$10$DFYEE5OIHU3QWgGaiWXt7OTV6zRtY.GDeq4zTnx3HtZdAeCK0KsCe', '0902200007', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner Tram Lam', 'learner08@mentor-matching.local', '$2a$10$YAuhlJBlUbowaD.GhtuG3u962klwTxWWcKLthL5Xk868LXyHPepty', '0902200008', 'LEARNER', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Learner Anh Kiet', 'learner09@mentor-matching.local', '$2a$10$1g8VX1G3WNLT.iei7k2.IeWfAQcajgeWqfL95.4Y4KO8AXMONbzW2', '0902200009', 'LEARNER', 'STUDENT', 'ACTIVE'),
    ('Learner Thanh Ha', 'learner10@mentor-matching.local', '$2a$10$dZr/DYrilsusmew//sI45OQp0/CS.M10j82gkgVa8TdHMFTGhoKqq', '0902200010', 'LEARNER', 'STUDENT', 'INACTIVE'),

    ('Mentor Gia Bao', 'mentor08@mentor-matching.local', '$2a$10$f8K0p/rAvE9SrsZcahthQuKA79pIAqGt9APO14f3.czxnCPp9q6Iu', '0901100011', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Khanh Linh', 'mentor09@mentor-matching.local', '$2a$10$OEYH9he8BWJRnCytYVcmB.W4lk6WlwAHnAgVf9aQHZch5gJ.HUiAu', '0901100012', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Tuan Minh', 'mentor10@mentor-matching.local', '$2a$10$2XGuYngpcuowaqhZbvTLGuhlNg5n3sn9GdbzQGyWcMvKm3G/FOZbS', '0901100013', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Phuong Nhi', 'mentor11@mentor-matching.local', '$2a$10$gYToj5teNH/bDuMaboswr.RCWyw3mnhxVw7fXYTRDVoeh/qy5eVdm', '0901100014', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Duy Anh', 'mentor12@mentor-matching.local', '$2a$10$XDav3qdVlNkr58OGZZVm7uGdQs4D9kAeqw555rq0lo6q6NG7EB87C', '0901100015', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Ngoc Han', 'mentor13@mentor-matching.local', '$2a$10$2/BYSYBiyru0TusrcILpHejPJXShhDUbLe4AhvAvX2Loy28hZuZzq', '0901100016', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Minh Quan', 'mentor14@mentor-matching.local', '$2a$10$k0Pe70Q6Ng7btefKDxPI9.g6dS5L/078.eb9ykojULQHrhj6QrEaG', '0901100017', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Bao Chau', 'mentor15@mentor-matching.local', '$2a$10$RQhy/.FDwnIHKS7vUx6gBeFviqoEEfPe8dAQowIlwhBwUoanbtKJ.', '0901100018', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Hoang Nam', 'mentor16@mentor-matching.local', '$2a$10$/lnvxAHZOhbb0wjfK40LYeEyd.crr3ikTYemydilZW6JlTyDdOp9e', '0901100019', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Thao Nguyen', 'mentor17@mentor-matching.local', '$2a$10$V53.Yc2EmYI0byjNWMYgoOAHUCRSQrQ0D5gbwu8Kau.E8j9ajjBGG', '0901100020', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Thanh Lam', 'mentor18@mentor-matching.local', '$2a$10$n8Pl2zirf/Gca5l8aTKQbuEGfol/MzgtbtXXInKkINtYbn37OX0v6', '0901100021', 'MENTOR', 'WORKING_ADULT', 'INACTIVE'),
    ('Mentor Hai Dang', 'mentor19@mentor-matching.local', '$2a$10$qPuhubmfya.dzZPjN7n8C.e7XkwhZEIs2NWc9duaRhJehMeJxbyT2', '0901100022', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),

    ('Mentor Minh Chau', 'mentor20@mentor-matching.local', '$2a$10$xU6pg09xUTnIaiUY3EAGAO7DArkh0gGi7VXFIH7jomraEsOo4fp5q', '0901100023', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Gia Han', 'mentor21@mentor-matching.local', '$2a$10$ER.uoSiYqEtSX.QmliHXHOMBFrCIGwYp6cgUxcgdAq7kSVgfZPohW', '0901100024', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Nam Phong', 'mentor22@mentor-matching.local', '$2a$10$sCOOYR47CI8tKPz0hGRceusjfeNYVcxnRnTcKsWikFPmLPy0rYWXG', '0901100025', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Tue Lam', 'mentor23@mentor-matching.local', '$2a$10$ymkp.wkR2qE8V9nlgYNKQe6xfFEpvlNhO3hwhryYnsqii0pqAaMpC', '0901100026', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Bao Ngoc', 'mentor24@mentor-matching.local', '$2a$10$DFYEE5OIHU3QWgGaiWXt7OTV6zRtY.GDeq4zTnx3HtZdAeCK0KsCe', '0901100027', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Quynh Anh', 'mentor25@mentor-matching.local', '$2a$10$YAuhlJBlUbowaD.GhtuG3u962klwTxWWcKLthL5Xk868LXyHPepty', '0901100028', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Viet Anh', 'mentor26@mentor-matching.local', '$2a$10$1g8VX1G3WNLT.iei7k2.IeWfAQcajgeWqfL95.4Y4KO8AXMONbzW2', '0901100029', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Ha My', 'mentor27@mentor-matching.local', '$2a$10$dZr/DYrilsusmew//sI45OQp0/CS.M10j82gkgVa8TdHMFTGhoKqq', '0901100030', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Minh Khoi', 'mentor28@mentor-matching.local', '$2a$10$f8K0p/rAvE9SrsZcahthQuKA79pIAqGt9APO14f3.czxnCPp9q6Iu', '0901100031', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Khanh Vy', 'mentor29@mentor-matching.local', '$2a$10$OEYH9he8BWJRnCytYVcmB.W4lk6WlwAHnAgVf9aQHZch5gJ.HUiAu', '0901100032', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Nhat Minh', 'mentor30@mentor-matching.local', '$2a$10$2XGuYngpcuowaqhZbvTLGuhlNg5n3sn9GdbzQGyWcMvKm3G/FOZbS', '0901100033', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Phuong Linh', 'mentor31@mentor-matching.local', '$2a$10$gYToj5teNH/bDuMaboswr.RCWyw3mnhxVw7fXYTRDVoeh/qy5eVdm', '0901100034', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Bao Long', 'mentor32@mentor-matching.local', '$2a$10$XDav3qdVlNkr58OGZZVm7uGdQs4D9kAeqw555rq0lo6q6NG7EB87C', '0901100035', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Thien An', 'mentor33@mentor-matching.local', '$2a$10$2/BYSYBiyru0TusrcILpHejPJXShhDUbLe4AhvAvX2Loy28hZuZzq', '0901100036', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Ngoc Diep', 'mentor34@mentor-matching.local', '$2a$10$k0Pe70Q6Ng7btefKDxPI9.g6dS5L/078.eb9ykojULQHrhj6QrEaG', '0901100037', 'MENTOR', 'UNIVERSITY_STUDENT', 'INACTIVE'),
    ('Mentor Thanh Phuc', 'mentor35@mentor-matching.local', '$2a$10$RQhy/.FDwnIHKS7vUx6gBeFviqoEEfPe8dAQowIlwhBwUoanbtKJ.', '0901100038', 'MENTOR', 'WORKING_ADULT', 'ACTIVE'),
    ('Mentor Anh Thu', 'mentor36@mentor-matching.local', '$2a$10$/lnvxAHZOhbb0wjfK40LYeEyd.crr3ikTYemydilZW6JlTyDdOp9e', '0901100039', 'MENTOR', 'UNIVERSITY_STUDENT', 'ACTIVE'),
    ('Mentor Gia Khang', 'mentor37@mentor-matching.local', '$2a$10$V53.Yc2EmYI0byjNWMYgoOAHUCRSQrQ0D5gbwu8Kau.E8j9ajjBGG', '0901100040', 'MENTOR', 'WORKING_ADULT', 'ACTIVE');

INSERT INTO users (full_name, email, password, phone, role, user_type, status)
SELECT u.full_name, u.email, u.password_hash, u.phone, u.role, u.user_type, u.status
FROM tmp_demo_users u
WHERE NOT EXISTS (
    SELECT 1
    FROM users existing
    WHERE existing.email = u.email
);

DROP TEMPORARY TABLE tmp_demo_users;
