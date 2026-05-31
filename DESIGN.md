# DESIGN.md

Tài liệu này là nguồn chuẩn cho UI/UX của dự án Mentor Matching. Khi triển khai frontend, mọi layout, component, luồng đặt lịch, nội dung hiển thị và trạng thái màn hình nên bám theo file này trước khi tạo mới pattern khác.

## 1. Product Definition

### 1.1 Business Goal

| Câu hỏi | Định nghĩa cho dự án |
| --- | --- |
| Sản phẩm giải quyết vấn đề gì? | Giúp học viên/phụ huynh tìm, so sánh và đặt lịch học với gia sư phù hợp một cách nhanh, rõ ràng và đáng tin cậy. |
| Ai là người dùng? | Guest, Student/Parent, Mentor, Admin. |
| User đau ở đâu? | Khó biết gia sư nào phù hợp, lịch trống không rõ, thông tin giá/kinh nghiệm/rating phân tán, quy trình đặt lịch và xác nhận mất thời gian. |
| KPI thành công? | Tăng tỷ lệ chuyển đổi từ xem hồ sơ sang đặt lịch, giảm thời gian tìm gia sư, tăng số buổi học được xác nhận, giảm booking bị hủy do thiếu thông tin. |
| MVP cần gì? | Tìm kiếm gia sư, lọc gia sư, xem hồ sơ, chọn lịch, đặt lịch, quản lý booking, dashboard cho học viên/gia sư/admin. |

### 1.2 Product Principles

- Tin cậy trước, đẹp sau: hồ sơ gia sư phải rõ năng lực, kinh nghiệm, giá, lịch rảnh và đánh giá.
- Booking phải ít bước: người dùng luôn biết đang chọn ai, học gì, lúc nào, giá bao nhiêu.
- Dễ so sánh: danh sách gia sư cần scan nhanh theo môn học, level, rating, giá, hình thức học và lịch gần nhất.
- Không giấu trạng thái: loading, empty, error, no permission, pending confirmation đều phải có UI rõ ràng.
- Mobile phải dùng được: tìm kiếm, xem hồ sơ và đặt lịch là core flow nên phải tốt trên mobile.

## 2. User Roles

### 2.1 Guest

Mục tiêu:

- Xem trang chủ.
- Tìm và lọc gia sư.
- Xem hồ sơ gia sư public.
- Đăng nhập/đăng ký khi muốn đặt lịch hoặc nhắn tin.

Menu chính:

- Home
- Discover Mentors
- Login

### 2.2 Student / Parent

Mục tiêu:

- Tìm gia sư phù hợp.
- Lưu gia sư yêu thích.
- Đặt lịch học.
- Theo dõi booking.
- Nhắn tin với gia sư.
- Đánh giá sau buổi học.

Menu chính:

- Dashboard
- Discover
- Bookings
- Messages
- Favorites
- Profile

### 2.3 Mentor

Mục tiêu:

- Quản lý hồ sơ dạy học.
- Quản lý lịch rảnh.
- Xác nhận/từ chối booking.
- Theo dõi học viên.
- Theo dõi doanh thu.

Menu chính:

- Dashboard
- Profile
- Schedule
- Students
- Earnings

### 2.4 Admin

Mục tiêu:

- Quản lý người dùng.
- Quản lý mentor.
- Theo dõi booking và báo cáo.
- Xử lý vi phạm, duyệt hồ sơ, cấu hình hệ thống.

Menu chính:

- Dashboard
- Users
- Mentors
- Reports
- Settings

## 3. Core Workflows

### 3.1 Find And Book A Mentor

1. User vào Home hoặc Discover.
2. User tìm theo môn học, level, keyword hoặc khu vực.
3. User lọc theo giá, rating, hình thức học, lịch rảnh.
4. User mở Mentor Profile.
5. User xem thông tin: kinh nghiệm, môn dạy, rating, giá, lịch rảnh, review.
6. User chọn ngày và khung giờ.
7. User nhập nhu cầu học.
8. User xác nhận booking.
9. Mentor nhận yêu cầu.
10. Mentor xác nhận hoặc đề xuất đổi lịch.
11. Student nhận trạng thái booking.

### 3.2 Mentor Manages Schedule

1. Mentor vào Schedule.
2. Mentor thêm hoặc sửa lịch rảnh theo ngày/tuần.
3. Mentor khóa các khung giờ bận.
4. Hệ thống chỉ hiển thị slot còn khả dụng cho Student.

### 3.3 Booking Lifecycle

Trạng thái booking:

- `pending`: Student đã gửi yêu cầu, chờ Mentor xác nhận.
- `confirmed`: Mentor đã xác nhận.
- `rescheduled`: Có đề xuất đổi lịch.
- `completed`: Buổi học đã hoàn thành.
- `cancelled`: Booking bị hủy.

Rule hiển thị:

- `pending`: dùng badge warning.
- `confirmed`: dùng badge success.
- `rescheduled`: dùng badge info.
- `completed`: dùng badge neutral.
- `cancelled`: dùng badge danger.

## 4. Screen List

### 4.1 Public Screens

- Home
- Discover Mentors
- Mentor Profile
- Login
- Forbidden

### 4.2 Student Screens

- Student Dashboard
- My Bookings
- Booking Detail
- Favorites
- Messages
- Student Profile

### 4.3 Mentor Screens

- Mentor Dashboard
- Mentor Profile Management
- Schedule Management
- Students
- Earnings

### 4.4 Admin Screens

- Admin Dashboard
- Users Management
- Mentors Management
- Reports
- Settings

## 5. Screen Specifications

### 5.1 Home

Goal:

- Giúp user hiểu sản phẩm và bắt đầu tìm gia sư nhanh.

Users:

- Guest, Student/Parent.

Actions:

- Search by subject/keyword.
- Chọn môn học phổ biến.
- Xem mentor nổi bật.
- Đi tới Discover.

Data:

- Featured subjects.
- Featured mentors.
- Testimonials.
- Search keyword.

States:

- Loading featured data.
- Empty featured mentors.
- Error loading public data.

UX Notes:

- First screen phải có search rõ ràng.
- Không biến Home thành landing page dài nếu core action là tìm gia sư.
- CTA chính: `Tìm gia sư`.

### 5.2 Discover Mentors

Goal:

- Cho phép user tìm, lọc và so sánh gia sư.

Users:

- Guest, Student/Parent.

Actions:

- Search.
- Filter by subject, level, price, rating, location, online/offline, availability.
- Sort by relevance, rating, price, newest.
- Open mentor profile.
- Save favorite.
- Start booking.

Data:

- Mentor avatar.
- Mentor name.
- Subjects.
- Teaching levels.
- Rating.
- Reviews count.
- Price per session/hour.
- Location or online availability.
- Next available slot.
- Verification status.

States:

- Loading skeleton cards.
- Empty result.
- Error loading mentors.
- Filter applied.
- No permission for favorite.

UX Notes:

- Desktop dùng filter sidebar + result grid/list.
- Mobile dùng filter sheet/drawer.
- Tutor/Mentor card phải scan được trong 3 giây.

### 5.3 Mentor Profile

Goal:

- Giúp user đủ tin tưởng để đặt lịch.

Users:

- Guest, Student/Parent.

Actions:

- View profile.
- Select schedule slot.
- Book session.
- Save favorite.
- Send message.
- Read reviews.

Data:

- Avatar and name.
- Verification badge.
- Bio.
- Teaching subjects.
- Teaching levels.
- Experience.
- Education/certificates.
- Price.
- Rating and reviews.
- Available time slots.
- Teaching format.

States:

- Loading profile.
- Mentor not found.
- No available slots.
- Booking requires login.
- Error loading schedule.

UX Notes:

- Booking panel nên sticky trên desktop.
- Trên mobile, CTA đặt lịch nên nằm gần cuối màn hình hoặc sticky bottom khi cần.
- Giá, lịch và hình thức học luôn phải nhìn thấy trước khi xác nhận.

### 5.4 Booking Flow

Goal:

- Đặt lịch học ít bước, ít lỗi.

Users:

- Student/Parent.

Actions:

- Select subject.
- Select date.
- Select time slot.
- Add learning goal/note.
- Confirm booking.

Data:

- Mentor summary.
- Subject.
- Date.
- Time slot.
- Duration.
- Price.
- Student note.
- Booking status.

States:

- Slot loading.
- Slot unavailable.
- Validation error.
- Booking submitting.
- Booking success.
- Booking failed.

UX Notes:

- Luồng đặt lịch tối đa 4 bước.
- Không cho confirm nếu thiếu slot hoặc subject.
- Khi slot vừa bị người khác lấy, hiển thị lỗi rõ và yêu cầu chọn slot khác.

### 5.5 Student Dashboard

Goal:

- Cho học viên/phụ huynh nhìn nhanh lịch học và việc cần làm.

Users:

- Student/Parent.

Actions:

- View upcoming bookings.
- Continue searching mentors.
- Open messages.
- Review completed sessions.

Data:

- Upcoming bookings.
- Pending confirmations.
- Favorite mentors.
- Recent messages.

States:

- Loading dashboard.
- Empty first-time dashboard.
- Error loading dashboard.

### 5.6 Mentor Dashboard

Goal:

- Cho mentor quản lý công việc dạy học trong ngày/tuần.

Users:

- Mentor.

Actions:

- Confirm booking.
- Decline booking.
- Update schedule.
- Open student profile.
- View earnings.

Data:

- Pending bookings.
- Upcoming sessions.
- Weekly schedule.
- Student count.
- Earnings summary.

States:

- Loading dashboard.
- Empty bookings.
- Error loading dashboard.

### 5.7 Admin Dashboard

Goal:

- Cho admin theo dõi sức khỏe hệ thống và xử lý dữ liệu quan trọng.

Users:

- Admin.

Actions:

- View metrics.
- Manage users.
- Review mentors.
- Open reports.

Data:

- Total users.
- Active mentors.
- Booking count.
- Revenue/earning metrics if available.
- Pending mentor approvals.

States:

- Loading metrics.
- Empty reports.
- Error loading admin data.
- No permission.

## 6. UX Rules

- Primary action trên mỗi màn hình chỉ nên có một hành động nổi bật nhất.
- Form dùng inline validation, không chỉ báo lỗi bằng toast.
- Success/error mutation dùng toast ngắn, dễ hiểu.
- Delete/cancel cần confirmation modal.
- Search/filter nên phản hồi nhanh; nếu gọi API thì có loading state nhẹ.
- Empty state phải có hành động tiếp theo, ví dụ `Tìm gia sư ngay`.
- Không hiển thị table dày trên mobile nếu card/list dễ đọc hơn.
- Không dùng màu làm tín hiệu duy nhất cho status; badge phải có text.
- Mọi route theo role phải có no-permission state hoặc redirect rõ ràng.
- Không bắt login trước khi user xem được giá trị public như mentor profile.

## 7. Responsive Strategy

### Desktop

- Ưu tiên trải nghiệm đầy đủ.
- Discover dùng filter sidebar + grid/list.
- Mentor Profile dùng content chính + booking sidebar sticky.
- Dashboard dùng sidebar navigation.

### Tablet

- Giữ navigation gọn hơn.
- Grid giảm cột.
- Filter có thể chuyển sang drawer.

### Mobile

- Core flows phải hoàn chỉnh: search, discover, profile, booking.
- Dashboard dùng stacked sections.
- Sidebar chuyển thành bottom nav hoặc drawer.
- Filter dùng sheet/drawer.
- Booking summary có thể dùng sticky bottom CTA.

Breakpoints tham chiếu:

- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `>= 1024px`

## 8. Design System

### 8.1 Visual Style

Style direction:

- Modern education SaaS.
- Clean, friendly, professional.
- Inspired by Linear clarity + Stripe polish + Notion simplicity.
- Không quá marketing, không quá trẻ con.
- Ưu tiên scanning, trust, và booking clarity.

### 8.2 Color Tokens

Token hiện tại trong `frontend/app/app.css`:

| Token | Value | Usage |
| --- | --- | --- |
| `primary` | `#3B82F6` | CTA, link, selected state |
| `primary-dark` | `#2563EB` | Hover/active primary |
| `primary-light` | `#60A5FA` | Soft highlight |
| `secondary` | `#8B5CF6` | Accent, secondary highlight |
| `base` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, panels, forms |
| `ink` | `#0F172A` | Main text |
| `muted` | `#64748B` | Secondary text |
| `line` | `#E2E8F0` | Border/divider |

Additional semantic colors to add when needed:

| Token | Suggested Value | Usage |
| --- | --- | --- |
| `success` | `#16A34A` | Confirmed, completed success |
| `warning` | `#F59E0B` | Pending |
| `danger` | `#DC2626` | Cancelled, destructive |
| `info` | `#0EA5E9` | Rescheduled, neutral guidance |

### 8.3 Typography

Current font stack:

- Sans: `Inter`, `Outfit`, system sans.
- Display: `Clash Display`, `Outfit`, `Plus Jakarta Sans`.

Rules:

- Page title: 32-40px desktop, 24-30px mobile.
- Section title: 24-30px desktop, 20-24px mobile.
- Card title: 16-20px.
- Body: 14-16px.
- Caption/meta: 12-14px.
- Letter spacing should stay normal.

### 8.4 Spacing

Spacing scale:

- `4px`: tiny gap.
- `8px`: compact gap.
- `12px`: form/control gap.
- `16px`: default component gap.
- `24px`: section inner gap.
- `32px`: page block gap.
- `48px`: major section gap.

Rules:

- Dashboard and operational UI should be dense but readable.
- Public marketing sections may be airier.
- Cards must not be nested inside cards.

### 8.5 Radius And Shadow

Current tokens:

- `radius-xl`: `1rem`.
- `radius-2xl`: `1.5rem`.
- `radius-3xl`: `2rem`.
- `shadow-soft`.
- `shadow-lift`.
- `shadow-glow`.

Rules:

- shadcn/ui components should use consistent radius, preferably `0.75rem` to `1rem` for app controls.
- Cards should stay restrained; avoid overly round decorative cards in dashboard screens.
- Use shadow for elevation only when it improves hierarchy.

## 9. Component System

### 9.1 Existing Components

Current reusable components include:

- `Button`
- `MentorCard`
- `SearchBar`
- `FilterSidebar`
- `BookingSidebar`
- `RatingStars`
- `SubjectCard`
- `DashboardShell`
- `RoleGuard`
- `Navbar`
- `Footer`

### 9.2 Components To Standardize

Base components:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Badge
- Card
- Dialog
- Sheet
- Tabs
- Dropdown Menu
- Toast
- Skeleton
- Avatar
- Calendar

Domain components:

- MentorCard
- MentorProfileHeader
- MentorAvailabilityPicker
- BookingSummary
- BookingStatusBadge
- ReviewCard
- SubjectCard
- PriceDisplay
- DashboardMetricCard
- EmptyState
- ErrorState

### 9.3 shadcn/ui Plan

When adding `shadcn/ui`, prefer installing and wrapping these components first:

- `button`
- `input`
- `textarea`
- `select`
- `checkbox`
- `radio-group`
- `switch`
- `badge`
- `card`
- `dialog`
- `sheet`
- `tabs`
- `dropdown-menu`
- `toast` or `sonner`
- `skeleton`
- `avatar`
- `calendar`

Integration rules:

- Keep domain components in `frontend/app/components`.
- Keep shadcn base UI components in a dedicated UI folder, for example `frontend/app/components/ui`.
- Do not rewrite domain components blindly; migrate gradually.
- Use `lucide-react` icons for action buttons and navigation.
- Keep imports consistent with `frontend/RULES.md`.

## 10. Data Display Rules

### 10.1 Mentor Card

Must show:

- Avatar.
- Name.
- Main subjects.
- Level/class.
- Rating and review count.
- Price.
- Online/offline or location.
- Next available slot.
- Verification badge if available.
- CTA: `Xem hồ sơ` or `Đặt lịch`.

Optional:

- Short bio.
- Total sessions.
- Favorite action.

### 10.2 Mentor Profile

Must show:

- Profile header.
- Bio.
- Subjects and levels.
- Experience.
- Education/certificates.
- Teaching format.
- Price.
- Availability.
- Reviews.
- Booking CTA.

### 10.3 Booking Summary

Must show:

- Mentor.
- Subject.
- Date.
- Time.
- Duration.
- Price.
- Status.
- Student note if available.

## 11. Content Style

Tone:

- Rõ ràng.
- Tin cậy.
- Thân thiện.
- Không cường điệu.

CTA examples:

- `Tìm gia sư`
- `Xem hồ sơ`
- `Đặt lịch học`
- `Chọn lịch trống`
- `Xác nhận đặt lịch`
- `Nhắn tin`
- `Lưu gia sư`

Validation examples:

- `Vui lòng chọn môn học.`
- `Vui lòng chọn khung giờ học.`
- `Khung giờ này vừa được đặt. Hãy chọn khung giờ khác.`
- `Bạn cần đăng nhập để đặt lịch.`

## 12. Accessibility

- Text contrast must be readable on all backgrounds.
- Interactive elements need visible focus states.
- Buttons need clear disabled/loading states.
- Form errors must be connected to fields.
- Calendar/time slot cannot rely only on color.
- Images need meaningful alt text.
- Icon-only buttons need accessible labels/tooltips.

## 13. Implementation Rules

- Follow `frontend/RULES.md`.
- Route files stay thin; reusable logic belongs in hooks/services/components.
- Use React Query for server state.
- Use Zustand only for auth/app state.
- Use `react-hook-form` + `zod` for forms.
- Use `lucide-react` for icons.
- Use Tailwind CSS tokens from `frontend/app/app.css`.
- Every screen should handle loading, empty, error and no-permission states where applicable.

## 14. Master Prompt For AI UI Generation

Use this prompt when asking AI to generate or refactor UI for this project:

```text
Design and implement a modern education SaaS UI for a mentor/tutor matching and booking platform.

Project:
Mentor Matching helps students or parents find, compare, and book sessions with qualified mentors/tutors.

Users:
- Guest
- Student/Parent
- Mentor
- Admin

Style:
- Modern education SaaS
- Clean, trustworthy, friendly, professional
- Inspired by Linear clarity, Stripe polish, and Notion simplicity
- Strong visual hierarchy
- Easy scanning
- Mobile-friendly

Core features:
- Search mentors
- Filter mentors
- Mentor profile
- Availability and booking flow
- Student dashboard
- Mentor dashboard
- Admin dashboard
- Messages
- Favorites

UX requirements:
- Every screen includes loading, empty, error, and no-permission states where relevant
- Booking flow should be short and clear
- Mentor cards must be easy to compare
- Forms use inline validation
- Mutations show success/error toast
- Responsive layout for desktop, tablet, and mobile

Tech stack:
- React
- React Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- React Query
- Zustand
- react-hook-form
- zod

Use existing project conventions from frontend/RULES.md.
Keep components reusable and domain-specific components separate from base UI components.
```

## 15. MVP UI Priority

Build in this order:

1. Design tokens and base UI components.
2. Main layout and role-based dashboard shell.
3. Home and Discover Mentors.
4. Mentor Profile and Booking Flow.
5. Student Dashboard and Bookings.
6. Mentor Schedule and Dashboard.
7. Admin Dashboard and Management screens.
8. Loading, empty, error, no-permission states.
9. Responsive polish.
10. Accessibility polish.
