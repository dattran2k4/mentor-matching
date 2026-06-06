import type { Booking, BookingStatus, PaymentStatus } from '@/types/booking'

type LearnerBookingAction = {
  label: string
  variant: 'primary' | 'secondary'
}

export type LearnerBookingItem = Booking & {
  summary: string
  primaryAction: LearnerBookingAction
  secondaryAction: LearnerBookingAction
}

export type LearnerConversationMessage = {
  id: string
  author: 'learner' | 'mentor'
  text: string
  sentAt: string
}

export type LearnerConversation = {
  id: string
  mentorName: string
  mentorHeadline: string
  bookingContext: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  statusLabel: string
  messages: LearnerConversationMessage[]
}

export type LearnerProfileDraft = {
  fullName: string
  email: string
  phone: string
  gender: string
  birthYear: string
  schoolName: string
  grade: string
  learningGoal: string
}

export const learnerBookings: LearnerBookingItem[] = [
  {
    id: 'booking-1',
    snapshot: {
      learnerName: 'Minh Khôi',
      mentorName: 'Nguyễn Minh Anh',
      subjectName: 'Toán',
      gradeName: 'Lớp 9',
      pricePerHour: 280000
    },
    bookingDate: '2026-06-11',
    startTime: '14:00',
    endTime: '15:30',
    meetingType: 'ONLINE',
    bookingStatus: 'CONFIRMED' satisfies BookingStatus,
    paymentStatus: 'PAID' satisfies PaymentStatus,
    totalAmount: 420000,
    meetingLink: 'https://meet.google.com/example',
    summary: 'Ôn hệ phương trình và luyện đề kiểm tra 45 phút.',
    primaryAction: { label: 'Vào buổi học', variant: 'primary' },
    secondaryAction: { label: 'Xem chi tiết', variant: 'secondary' }
  },
  {
    id: 'booking-2',
    snapshot: {
      learnerName: 'Minh Khôi',
      mentorName: 'Trần Quốc Huy',
      subjectName: 'IELTS',
      gradeName: 'Foundation',
      pricePerHour: 320000
    },
    bookingDate: '2026-06-12',
    startTime: '19:30',
    endTime: '20:30',
    meetingType: 'ONLINE',
    bookingStatus: 'PENDING' satisfies BookingStatus,
    paymentStatus: 'PENDING' satisfies PaymentStatus,
    totalAmount: 320000,
    meetingLink: 'https://zoom.us/example',
    summary: 'Chờ thanh toán để mentor giữ chỗ speaking foundation.',
    primaryAction: { label: 'Thanh toán', variant: 'primary' },
    secondaryAction: { label: 'Xem chi tiết', variant: 'secondary' }
  },
  {
    id: 'booking-3',
    snapshot: {
      learnerName: 'Minh Khôi',
      mentorName: 'Lê Thu Hà',
      subjectName: 'Vật lý',
      gradeName: 'Lớp 11',
      pricePerHour: 260000
    },
    bookingDate: '2026-06-02',
    startTime: '09:00',
    endTime: '10:30',
    meetingType: 'HYBRID',
    bookingStatus: 'COMPLETED' satisfies BookingStatus,
    paymentStatus: 'PAID' satisfies PaymentStatus,
    totalAmount: 390000,
    meetingAddress: 'Quận 7, TP.HCM',
    summary: 'Buổi học hoàn tất, có thể để lại đánh giá cho mentor.',
    primaryAction: { label: 'Đánh giá buổi học', variant: 'primary' },
    secondaryAction: { label: 'Xem chi tiết', variant: 'secondary' }
  },
  {
    id: 'booking-4',
    snapshot: {
      learnerName: 'Minh Khôi',
      mentorName: 'Nguyễn Minh Anh',
      subjectName: 'Toán',
      gradeName: 'Lớp 8',
      pricePerHour: 240000
    },
    bookingDate: '2026-05-28',
    startTime: '18:00',
    endTime: '19:00',
    meetingType: 'ONLINE',
    bookingStatus: 'CANCELLED' satisfies BookingStatus,
    paymentStatus: 'REFUNDED' satisfies PaymentStatus,
    totalAmount: 240000,
    summary: 'Buổi học đã được hủy và học phí đã hoàn lại.',
    primaryAction: { label: 'Đặt lại buổi học', variant: 'secondary' },
    secondaryAction: { label: 'Xem chi tiết', variant: 'secondary' }
  },
  {
    id: 'booking-5',
    snapshot: {
      learnerName: 'Minh Khôi',
      mentorName: 'Trần Quốc Huy',
      subjectName: 'Tiếng Anh',
      gradeName: 'Lớp 12',
      pricePerHour: 300000
    },
    bookingDate: '2026-05-24',
    startTime: '20:00',
    endTime: '21:30',
    meetingType: 'ONLINE',
    bookingStatus: 'NO_SHOW' satisfies BookingStatus,
    paymentStatus: 'PAID' satisfies PaymentStatus,
    totalAmount: 450000,
    summary: 'Buổi học không diễn ra như dự kiến, cần xem lại ghi chú với mentor.',
    primaryAction: { label: 'Xem ghi chú', variant: 'secondary' },
    secondaryAction: { label: 'Liên hệ mentor', variant: 'secondary' }
  }
]

export const learnerConversations: LearnerConversation[] = [
  {
    id: 'conversation-1',
    mentorName: 'Nguyễn Minh Anh',
    mentorHeadline: 'Mentor Toán THCS',
    bookingContext: 'Toán lớp 9 · Buổi học 11/06 lúc 14:00',
    lastMessage: 'Mình đã gửi lại đề luyện, em xem trước câu 3 và 4 nhé.',
    lastMessageAt: '10 phút trước',
    unreadCount: 1,
    statusLabel: 'Liên quan buổi học sắp tới',
    messages: [
      {
        id: 'msg-1',
        author: 'mentor',
        text: 'Chị đã gửi lại đề luyện. Em xem trước câu 3 và 4 để buổi tới mình vào nhanh hơn nhé.',
        sentAt: '14:10'
      },
      {
        id: 'msg-2',
        author: 'learner',
        text: 'Dạ em xem rồi ạ. Em đang hơi vướng phần hình học, buổi tới mình ưu tiên phần đó giúp em nhé.',
        sentAt: '14:14'
      },
      {
        id: 'msg-3',
        author: 'mentor',
        text: 'Được em, chị sẽ dành 20 phút đầu để xử lý phần hình học trước.',
        sentAt: '14:18'
      }
    ]
  },
  {
    id: 'conversation-2',
    mentorName: 'Trần Quốc Huy',
    mentorHeadline: 'Mentor IELTS Foundation',
    bookingContext: 'IELTS Foundation · Chờ thanh toán',
    lastMessage: 'Khi thanh toán xong mình sẽ chốt lại mục tiêu speaking đầu vào.',
    lastMessageAt: 'Hôm qua',
    unreadCount: 0,
    statusLabel: 'Chờ xác nhận buổi học',
    messages: [
      {
        id: 'msg-4',
        author: 'mentor',
        text: 'Sau khi em thanh toán xong, anh sẽ gửi checklist đầu vào để mình chốt mục tiêu speaking.',
        sentAt: '19:40'
      },
      {
        id: 'msg-5',
        author: 'learner',
        text: 'Dạ anh, tối nay em sẽ hoàn tất thanh toán.',
        sentAt: '19:52'
      }
    ]
  }
]

export const learnerProfileDraft: LearnerProfileDraft = {
  fullName: 'Minh Khôi',
  email: 'minhkhoi@example.com',
  phone: '0901 234 567',
  gender: 'Nam',
  birthYear: '2009',
  schoolName: 'THCS Nguyễn Du',
  grade: 'Lớp 9',
  learningGoal:
    'Củng cố nền tảng Toán để tự tin hơn trước kỳ thi vào lớp 10, đồng thời duy trì lịch học tiếng Anh đều mỗi tuần.'
}
