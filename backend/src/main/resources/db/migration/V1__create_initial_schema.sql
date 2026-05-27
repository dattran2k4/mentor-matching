-- Initial schema for Mentor Matching.
-- Tables use utf8mb4 explicitly so local/dev/prod databases behave consistently.

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50),
    user_type VARCHAR(50),
    status VARCHAR(50),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT chk_users_role CHECK (role IS NULL OR role IN ('LEARNER', 'MENTOR', 'ADMIN', 'MANAGER')),
    CONSTRAINT chk_users_user_type CHECK (user_type IS NULL OR user_type IN ('STUDENT', 'PARENT', 'UNIVERSITY_STUDENT', 'WORKING_ADULT')),
    CONSTRAINT chk_users_status CHECK (status IS NULL OR status IN ('ACTIVE', 'INACTIVE', 'BANNED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE auth_refresh_tokens (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at DATETIME(6) NOT NULL,
    revoked_at DATETIME(6),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_auth_refresh_tokens PRIMARY KEY (id),
    CONSTRAINT uk_auth_refresh_tokens_token_hash UNIQUE (token_hash),
    CONSTRAINT fk_auth_refresh_tokens_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_auth_refresh_tokens_user_id ON auth_refresh_tokens (user_id);
CREATE INDEX idx_auth_refresh_tokens_expires_at ON auth_refresh_tokens (expires_at);

CREATE TABLE cities (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_cities PRIMARY KEY (id),
    CONSTRAINT uk_cities_code UNIQUE (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE districts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    city_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_districts PRIMARY KEY (id),
    CONSTRAINT fk_districts_city_id FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_districts_city_id ON districts (city_id);

CREATE TABLE categories (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_categories PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE subjects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_subjects PRIMARY KEY (id),
    CONSTRAINT fk_subjects_category_id FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_subjects_category_id ON subjects (category_id);

CREATE TABLE grades (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    level_group VARCHAR(50),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_grades PRIMARY KEY (id),
    CONSTRAINT chk_grades_level_group CHECK (level_group IS NULL OR level_group IN ('PRIMARY', 'SECONDARY', 'HIGH_SCHOOL'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE subject_grades (
    id BIGINT NOT NULL AUTO_INCREMENT,
    subject_id BIGINT NOT NULL,
    grade_id BIGINT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_subject_grades PRIMARY KEY (id),
    CONSTRAINT fk_subject_grades_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_subject_grades_grade_id FOREIGN KEY (grade_id) REFERENCES grades (id) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_subject_grades_subject_id ON subject_grades (subject_id);
CREATE INDEX idx_subject_grades_grade_id ON subject_grades (grade_id);

CREATE TABLE learner_profiles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    gender VARCHAR(50),
    birth_year INT,
    school_name VARCHAR(255),
    grade_id BIGINT,
    learning_goal TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_learner_profiles PRIMARY KEY (id),
    CONSTRAINT uk_learner_profiles_user_id UNIQUE (user_id),
    CONSTRAINT fk_learner_profiles_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_learner_profiles_grade_id FOREIGN KEY (grade_id) REFERENCES grades (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT chk_learner_profiles_gender CHECK (gender IS NULL OR gender IN ('MALE', 'FEMALE', 'OTHER'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_learner_profiles_grade_id ON learner_profiles (grade_id);

CREATE TABLE mentor_profiles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    avatar_url TEXT NOT NULL,
    gender VARCHAR(50),
    hometown_city_id BIGINT,
    current_district_id BIGINT,
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
    approval_note TEXT,
    approved_by BIGINT,
    approved_at DATETIME(6),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_profiles PRIMARY KEY (id),
    CONSTRAINT uk_mentor_profiles_user_id UNIQUE (user_id),
    CONSTRAINT fk_mentor_profiles_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_profiles_hometown_city_id FOREIGN KEY (hometown_city_id) REFERENCES cities (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_profiles_current_district_id FOREIGN KEY (current_district_id) REFERENCES districts (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_profiles_approved_by FOREIGN KEY (approved_by) REFERENCES users (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT chk_mentor_profiles_gender CHECK (gender IS NULL OR gender IN ('MALE', 'FEMALE', 'OTHER')),
    CONSTRAINT chk_mentor_profiles_meeting_type CHECK (meeting_type IS NULL OR meeting_type IN ('ONLINE', 'OFFLINE', 'HYBRID')),
    CONSTRAINT chk_mentor_profiles_approval_status CHECK (approval_status IS NULL OR approval_status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_profiles_hometown_city_id ON mentor_profiles (hometown_city_id);
CREATE INDEX idx_mentor_profiles_current_district_id ON mentor_profiles (current_district_id);
CREATE INDEX idx_mentor_profiles_approved_by ON mentor_profiles (approved_by);
CREATE INDEX idx_mentor_profiles_approval_status ON mentor_profiles (approval_status);

CREATE TABLE mentor_verifications (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    id_card_number VARCHAR(50),
    id_card_front_url TEXT NOT NULL,
    id_card_back_url TEXT NOT NULL,
    selfie_with_id_url TEXT,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    verified_by BIGINT,
    verified_at DATETIME(6),
    rejection_reason TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_verifications PRIMARY KEY (id),
    CONSTRAINT uk_mentor_verifications_mentor_id UNIQUE (mentor_id),
    CONSTRAINT fk_mentor_verifications_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_verifications_verified_by FOREIGN KEY (verified_by) REFERENCES users (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT chk_mentor_verifications_status CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_verifications_verified_by ON mentor_verifications (verified_by);
CREATE INDEX idx_mentor_verifications_status ON mentor_verifications (verification_status);

CREATE TABLE personality_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_personality_options PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE mentor_personalities (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    personality_option_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_personalities PRIMARY KEY (id),
    CONSTRAINT fk_mentor_personalities_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_personalities_personality_option_id FOREIGN KEY (personality_option_id) REFERENCES personality_options (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT uk_mentor_personalities_pair UNIQUE (mentor_id, personality_option_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_personalities_personality_option_id ON mentor_personalities (personality_option_id);

CREATE TABLE mentor_highlight_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_highlight_options PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE mentor_highlights (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    highlight_option_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_highlights PRIMARY KEY (id),
    CONSTRAINT fk_mentor_highlights_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_highlights_highlight_option_id FOREIGN KEY (highlight_option_id) REFERENCES mentor_highlight_options (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT uk_mentor_highlights_pair UNIQUE (mentor_id, highlight_option_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_highlights_highlight_option_id ON mentor_highlights (highlight_option_id);

CREATE TABLE mentor_achievements (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    achievement_type VARCHAR(50),
    issuer VARCHAR(255),
    achieved_at DATE,
    proof_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by BIGINT,
    verified_at DATETIME(6),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_achievements PRIMARY KEY (id),
    CONSTRAINT fk_mentor_achievements_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_achievements_verified_by FOREIGN KEY (verified_by) REFERENCES users (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT chk_mentor_achievements_type CHECK (achievement_type IS NULL OR achievement_type IN ('AWARD', 'CERTIFICATE', 'EXAM_SCORE', 'COMPETITION', 'PROJECT', 'WORK_EXPERIENCE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_achievements_mentor_id ON mentor_achievements (mentor_id);
CREATE INDEX idx_mentor_achievements_verified_by ON mentor_achievements (verified_by);

CREATE TABLE mentor_subjects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    subject_grade_id BIGINT NOT NULL,
    proficiency_level VARCHAR(50),
    teaching_note TEXT,
    price_per_hour DECIMAL(12, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_subjects PRIMARY KEY (id),
    CONSTRAINT fk_mentor_subjects_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_mentor_subjects_subject_grade_id FOREIGN KEY (subject_grade_id) REFERENCES subject_grades (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT chk_mentor_subjects_proficiency_level CHECK (proficiency_level IS NULL OR proficiency_level IN ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')),
    CONSTRAINT chk_mentor_subjects_price_per_hour CHECK (price_per_hour IS NULL OR price_per_hour >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_subjects_mentor_id ON mentor_subjects (mentor_id);
CREATE INDEX idx_mentor_subjects_subject_grade_id ON mentor_subjects (subject_grade_id);

CREATE TABLE mentor_availabilities (
    id BIGINT NOT NULL AUTO_INCREMENT,
    mentor_id BIGINT NOT NULL,
    availability_type VARCHAR(50) NOT NULL DEFAULT 'RECURRING',
    day_of_week INT,
    available_date DATE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_mentor_availabilities PRIMARY KEY (id),
    CONSTRAINT fk_mentor_availabilities_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT chk_mentor_availabilities_type CHECK (availability_type IN ('RECURRING', 'SPECIFIC_DATE')),
    CONSTRAINT chk_mentor_availabilities_rule CHECK (
        (availability_type = 'RECURRING' AND day_of_week IS NOT NULL AND available_date IS NULL)
        OR
        (availability_type = 'SPECIFIC_DATE' AND available_date IS NOT NULL AND day_of_week IS NULL)
    ),
    CONSTRAINT chk_mentor_availabilities_day_of_week CHECK (day_of_week IS NULL OR day_of_week BETWEEN 1 AND 7),
    CONSTRAINT chk_mentor_availabilities_time_range CHECK (start_time < end_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_mentor_availabilities_mentor_id ON mentor_availabilities (mentor_id);
CREATE INDEX idx_mentor_availabilities_recurring ON mentor_availabilities (mentor_id, availability_type, day_of_week);
CREATE INDEX idx_mentor_availabilities_specific_date ON mentor_availabilities (mentor_id, availability_type, available_date);

CREATE TABLE bookings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_user_id BIGINT NOT NULL,
    student_name VARCHAR(255),
    mentor_id BIGINT NOT NULL,
    mentor_name VARCHAR(255),
    mentor_subject_id BIGINT NOT NULL,
    subject_name VARCHAR(255),
    grade_name VARCHAR(255),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    price_per_hour DECIMAL(12, 2) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    meeting_type VARCHAR(50),
    meeting_link TEXT,
    meeting_address TEXT,
    status VARCHAR(50),
    note TEXT,
    cancelled_by BIGINT,
    cancel_reason TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_bookings PRIMARY KEY (id),
    CONSTRAINT fk_bookings_student_user_id FOREIGN KEY (student_user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_bookings_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_bookings_mentor_subject_id FOREIGN KEY (mentor_subject_id) REFERENCES mentor_subjects (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_bookings_cancelled_by FOREIGN KEY (cancelled_by) REFERENCES users (id) ON DELETE SET NULL ON UPDATE RESTRICT,
    CONSTRAINT chk_bookings_time_range CHECK (start_time < end_time),
    CONSTRAINT chk_bookings_price_per_hour CHECK (price_per_hour > 0),
    CONSTRAINT chk_bookings_total_amount CHECK (total_amount >= 0),
    CONSTRAINT chk_bookings_meeting_type CHECK (meeting_type IS NULL OR meeting_type IN ('ONLINE', 'OFFLINE')),
    CONSTRAINT chk_bookings_status CHECK (status IS NULL OR status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_bookings_student_user_id_created_at ON bookings (student_user_id, created_at);
CREATE INDEX idx_bookings_mentor_id_booking_date ON bookings (mentor_id, booking_date);
CREATE INDEX idx_bookings_mentor_subject_id ON bookings (mentor_subject_id);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_cancelled_by ON bookings (cancelled_by);

CREATE TABLE payments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    payer_user_id BIGINT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_provider VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    paid_at DATETIME(6),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_payments PRIMARY KEY (id),
    CONSTRAINT uk_payments_booking_id UNIQUE (booking_id),
    CONSTRAINT fk_payments_booking_id FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_payments_payer_user_id FOREIGN KEY (payer_user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT chk_payments_amount CHECK (amount >= 0),
    CONSTRAINT chk_payments_method CHECK (payment_method IS NULL OR payment_method IN ('CASH', 'BANK_TRANSFER', 'E_WALLET', 'CARD', 'GATEWAY')),
    CONSTRAINT chk_payments_provider CHECK (payment_provider IS NULL OR payment_provider IN ('MOMO', 'VNPAY', 'STRIPE', 'PAYPAL', 'MANUAL_BANK')),
    CONSTRAINT chk_payments_status CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_payments_payer_user_id ON payments (payer_user_id);
CREATE INDEX idx_payments_status ON payments (status);

CREATE TABLE reviews (
    id BIGINT NOT NULL AUTO_INCREMENT,
    booking_id BIGINT NOT NULL,
    student_user_id BIGINT NOT NULL,
    mentor_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_reviews PRIMARY KEY (id),
    CONSTRAINT uk_reviews_booking_id UNIQUE (booking_id),
    CONSTRAINT fk_reviews_booking_id FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_reviews_student_user_id FOREIGN KEY (student_user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_reviews_mentor_id FOREIGN KEY (mentor_id) REFERENCES mentor_profiles (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_reviews_student_user_id ON reviews (student_user_id);
CREATE INDEX idx_reviews_mentor_id ON reviews (mentor_id);

CREATE TABLE review_tag_options (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_review_tag_options PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE review_tags (
    id BIGINT NOT NULL AUTO_INCREMENT,
    review_id BIGINT NOT NULL,
    review_tag_option_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_review_tags PRIMARY KEY (id),
    CONSTRAINT fk_review_tags_review_id FOREIGN KEY (review_id) REFERENCES reviews (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT fk_review_tags_review_tag_option_id FOREIGN KEY (review_tag_option_id) REFERENCES review_tag_options (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT uk_review_tags_pair UNIQUE (review_id, review_tag_option_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_review_tags_review_tag_option_id ON review_tags (review_tag_option_id);

CREATE TABLE notifications (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT pk_notifications PRIMARY KEY (id),
    CONSTRAINT fk_notifications_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT chk_notifications_type CHECK (type IS NULL OR type IN ('BOOKING_CREATED', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'BOOKING_REJECTED', 'BOOKING_REMINDER', 'PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'PAYMENT_REFUNDED', 'MENTOR_APPROVED', 'MENTOR_REJECTED', 'SYSTEM'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_notifications_user_id_created_at ON notifications (user_id, created_at);
CREATE INDEX idx_notifications_user_id_is_read ON notifications (user_id, is_read);
