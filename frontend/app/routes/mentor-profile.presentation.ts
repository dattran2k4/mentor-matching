import type { BookingMeetingTypeApiResponse } from '@/types/api/booking'
import type {
  MentorAchievementDetailApiResponse,
  MentorAchievementTypeApiResponse,
  MentorApprovalStatusApiResponse,
  MentorAvailabilityDetailApiResponse,
  MentorDetailApiResponse,
  MentorMeetingTypeApiResponse,
  MentorProficiencyLevelApiResponse,
  MentorTraitsDetailApiResponse,
  MentorVerificationStatusApiResponse
} from '@/types/api/mentor'
import type { MentorProfileApiBundle } from '@/hooks/queries/mentor/useMentorProfileQuery'

export type MentorProfileExperienceItem = {
  title: string
  company: string | null
  period: string
}

export type MentorProfileEducationItem = {
  degree: string
  school: string
}

export type MentorProfileRecurringAvailability = {
  id: string
  startTime: string
  endTime: string
  dayLabel: string
  meetingTypes: MentorMeetingTypeApiResponse[]
}

export type MentorProfileSpecificDateAvailability = {
  id: string
  bookingDate: string
  startTime: string
  endTime: string
  dateLabel: string
  meetingTypes: MentorMeetingTypeApiResponse[]
  note?: string
}

export type MentorProfileOffering = {
  id: string
  mentorSubjectId: number
  subject: string
  grade: string
  proficiency: MentorProficiencyLevelApiResponse
  pricePerHour: number
  active: boolean
  teachingNote: string
}

export type MentorProfileReview = {
  name: string
  rating: number
  text: string
  tags?: string[]
}

export type MentorProfileViewModel = {
  id: string
  mentorId: number
  name: string
  headline: string
  approvalStatus: MentorApprovalStatusApiResponse | null
  verificationStatus: MentorVerificationStatusApiResponse | null
  rating: number | null
  reviewsCount: number | null
  responseTime: string | null
  activeStudentsCount: number | null
  startingPrice: number | null
  expertise: string
  highlights: string[]
  introduction: string
  subjects: string[]
  grades: string[]
  meetingTypes: MentorMeetingTypeApiResponse[]
  availabilitySummary: string
  teachingStyle: string
  achievements: string[]
  offerings: MentorProfileOffering[]
  recurringAvailability: MentorProfileRecurringAvailability[]
  specificDateAvailability: MentorProfileSpecificDateAvailability[]
  experience: MentorProfileExperienceItem[]
  education: MentorProfileEducationItem[]
  reviews: MentorProfileReview[]
  reviewsUnavailableReason: string
  bookableMeetingType: BookingMeetingTypeApiResponse | null
}

export function mapMentorProfileToViewModel(
  bundle: MentorProfileApiBundle
): MentorProfileViewModel {
  const { achievements, availabilities, detail, subjects, traits } = bundle
  const meetingTypes = unique(
    [detail.meetingType].filter((value): value is MentorMeetingTypeApiResponse => Boolean(value))
  )
  const offerings: MentorProfileOffering[] = subjects.map((item) => ({
    id: String(item.id),
    mentorSubjectId: item.id,
    subject: item.subjectName,
    grade: item.gradeName,
    proficiency: item.proficiencyLevel,
    pricePerHour: item.pricePerHour,
    active: item.active,
    teachingNote:
      item.teachingNote?.trim() ||
      'Mentor sẽ cập nhật thêm mục tiêu và cách triển khai cho offering này.'
  }))
  const startingPrice =
    offerings.length > 0
      ? offerings.reduce(
          (lowestPrice, offering) => Math.min(lowestPrice, offering.pricePerHour),
          offerings[0].pricePerHour
        )
      : null

  return {
    id: String(detail.id),
    mentorId: detail.id,
    name: detail.fullName,
    headline:
      detail.headline?.trim() ||
      [detail.currentPosition, detail.workplace].filter(Boolean).join(' · ') ||
      'Mentor công khai đang sẵn sàng cho học viên mới.',
    approvalStatus: null,
    verificationStatus: null,
    rating: null,
    reviewsCount: null,
    responseTime: null,
    activeStudentsCount: null,
    startingPrice,
    expertise:
      detail.introduction?.trim() ||
      detail.teachingStyle?.trim() ||
      detail.headline?.trim() ||
      'Thông tin giới thiệu chi tiết đang được mentor cập nhật thêm.',
    highlights: buildHighlights(detail, traits),
    introduction:
      detail.introduction?.trim() ||
      'Mentor chưa bổ sung phần giới thiệu chi tiết cho hồ sơ công khai này.',
    subjects: unique(subjects.map((item) => item.subjectName)),
    grades: unique(subjects.map((item) => item.gradeName)),
    meetingTypes,
    availabilitySummary: buildAvailabilitySummary(availabilities, detail, meetingTypes),
    teachingStyle:
      detail.teachingStyle?.trim() ||
      'Phong cách giảng dạy đang được mentor cập nhật thêm trong hồ sơ công khai.',
    achievements: buildAchievementHighlights(achievements),
    offerings,
    recurringAvailability: buildRecurringAvailability(availabilities, meetingTypes),
    specificDateAvailability: buildSpecificDateAvailability(availabilities, meetingTypes),
    experience: buildExperience(detail, achievements),
    education: buildEducation(detail),
    reviews: [],
    reviewsUnavailableReason:
      'Backend public hiện chưa cung cấp dữ liệu đánh giá cho hồ sơ mentor này.',
    bookableMeetingType: toBookableMeetingType(detail.meetingType)
  }
}

export function formatMeetingTypeLabel(meetingType: MentorMeetingTypeApiResponse) {
  if (meetingType === 'ONLINE') return 'Online'
  if (meetingType === 'OFFLINE') return 'Offline'

  return 'Hybrid'
}

export function formatTimeLabel(value: string) {
  return value.slice(0, 5)
}

function buildHighlights(
  detail: MentorDetailApiResponse,
  traits: MentorTraitsDetailApiResponse | null
) {
  return unique([
    ...(traits?.highlights.map((item) => item.name) ?? []),
    ...(traits?.personalities.map((item) => item.name) ?? []),
    detail.major,
    detail.currentPosition,
    detail.workplace,
    detail.education
  ]).slice(0, 6)
}

function buildAchievementHighlights(achievements: MentorAchievementDetailApiResponse[]) {
  const normalized = achievements
    .map((item) => formatAchievementSummary(item))
    .filter((item): item is string => Boolean(item))

  return normalized.length
    ? normalized
    : ['Mentor chưa công khai thêm chứng chỉ hoặc thành tích trên hồ sơ này.']
}

function buildExperience(
  detail: MentorDetailApiResponse,
  achievements: MentorAchievementDetailApiResponse[]
) {
  const items: MentorProfileExperienceItem[] = []

  if (detail.currentPosition || detail.workplace || detail.experienceYears !== null) {
    items.push({
      title: detail.currentPosition?.trim() || 'Kinh nghiệm chuyên môn',
      company: detail.workplace?.trim() || null,
      period:
        detail.experienceYears !== null
          ? `${detail.experienceYears} năm kinh nghiệm`
          : 'Mentor chưa công khai thời lượng kinh nghiệm'
    })
  }

  achievements
    .filter((item) => item.achievementType === 'WORK_EXPERIENCE')
    .forEach((item) => {
      items.push({
        title: item.title,
        company: item.issuer?.trim() || null,
        period: formatAchievementDate(item.achievedAt) || 'Mốc thời gian đang cập nhật'
      })
    })

  return dedupeExperience(items)
}

function buildEducation(detail: MentorDetailApiResponse) {
  const degree = detail.education?.trim() || null
  const school = detail.major?.trim() || null

  if (!degree && !school) return []

  return [
    {
      degree: degree || school || 'Thông tin học vấn đang cập nhật',
      school:
        degree && school
          ? school
          : 'Mentor chưa công khai thêm trường học hoặc chuyên ngành chi tiết.'
    }
  ]
}

function buildRecurringAvailability(
  availabilities: MentorAvailabilityDetailApiResponse[],
  meetingTypes: MentorMeetingTypeApiResponse[]
) {
  return availabilities
    .filter((item) => item.availabilityType === 'RECURRING' && item.dayOfWeek !== null)
    .sort((left, right) => {
      if (left.dayOfWeek !== right.dayOfWeek)
        return (left.dayOfWeek ?? 99) - (right.dayOfWeek ?? 99)
      return left.startTime.localeCompare(right.startTime)
    })
    .map((item) => ({
      id: `recurring-${item.id}`,
      dayLabel: formatDayOfWeek(item.dayOfWeek),
      startTime: item.startTime,
      endTime: item.endTime,
      meetingTypes
    }))
}

function buildSpecificDateAvailability(
  availabilities: MentorAvailabilityDetailApiResponse[],
  meetingTypes: MentorMeetingTypeApiResponse[]
) {
  return availabilities
    .filter(
      (
        item
      ): item is MentorAvailabilityDetailApiResponse & {
        availableDate: string
      } => item.availabilityType === 'SPECIFIC_DATE' && Boolean(item.availableDate)
    )
    .sort((left, right) => {
      if (left.availableDate !== right.availableDate) {
        return left.availableDate.localeCompare(right.availableDate)
      }

      return left.startTime.localeCompare(right.startTime)
    })
    .map((item) => ({
      id: `specific-${item.id}`,
      bookingDate: item.availableDate,
      dateLabel: formatDateLabel(item.availableDate),
      startTime: item.startTime,
      endTime: item.endTime,
      meetingTypes
    }))
}

function buildAvailabilitySummary(
  availabilities: MentorAvailabilityDetailApiResponse[],
  detail: MentorDetailApiResponse,
  meetingTypes: MentorMeetingTypeApiResponse[]
) {
  const recurring = availabilities
    .filter((item) => item.availabilityType === 'RECURRING' && item.dayOfWeek !== null)
    .sort((left, right) => {
      if (left.dayOfWeek !== right.dayOfWeek)
        return (left.dayOfWeek ?? 99) - (right.dayOfWeek ?? 99)
      return left.startTime.localeCompare(right.startTime)
    })
  const locationLabel = [detail.currentLocation.districtName, detail.currentLocation.cityName]
    .filter(Boolean)
    .join(', ')
  const meetingLabel = meetingTypes.map(formatMeetingTypeLabel).join(' / ')

  if (recurring[0]) {
    return [
      `${formatDayOfWeek(recurring[0].dayOfWeek)} ${formatTimeLabel(recurring[0].startTime)}-${formatTimeLabel(recurring[0].endTime)}`,
      locationLabel || meetingLabel
    ]
      .filter(Boolean)
      .join(' · ')
  }

  const specific = buildSpecificDateAvailability(availabilities, meetingTypes)

  if (specific[0]) {
    return [
      specific[0].dateLabel,
      `${formatTimeLabel(specific[0].startTime)}-${formatTimeLabel(specific[0].endTime)}`,
      meetingLabel
    ]
      .filter(Boolean)
      .join(' · ')
  }

  return (
    [locationLabel, meetingLabel].filter(Boolean).join(' · ') ||
    'Lịch dạy công khai đang được cập nhật thêm.'
  )
}

function formatDateLabel(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
      }).format(date)
}

function formatDayOfWeek(dayOfWeek: number | null) {
  if (dayOfWeek === 1) return 'Thứ 2'
  if (dayOfWeek === 2) return 'Thứ 3'
  if (dayOfWeek === 3) return 'Thứ 4'
  if (dayOfWeek === 4) return 'Thứ 5'
  if (dayOfWeek === 5) return 'Thứ 6'
  if (dayOfWeek === 6) return 'Thứ 7'
  if (dayOfWeek === 7) return 'Chủ nhật'

  return 'Lịch định kỳ'
}

function formatAchievementSummary(item: MentorAchievementDetailApiResponse) {
  const dateLabel = formatAchievementDate(item.achievedAt)
  const issuer = item.issuer?.trim()
  const typeLabel = formatAchievementType(item.achievementType)

  return [item.title, issuer || typeLabel, dateLabel].filter(Boolean).join(' · ')
}

function formatAchievementDate(value: string | null) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', { month: '2-digit', year: 'numeric' }).format(date)
}

function formatAchievementType(value: MentorAchievementTypeApiResponse) {
  if (value === 'AWARD') return 'Giải thưởng'
  if (value === 'CERTIFICATE') return 'Chứng chỉ'
  if (value === 'EXAM_SCORE') return 'Thành tích học tập'
  if (value === 'COMPETITION') return 'Cuộc thi'
  if (value === 'PROJECT') return 'Dự án'

  return 'Kinh nghiệm thực tế'
}

function dedupeExperience(items: MentorProfileExperienceItem[]) {
  return items.filter((item, index, allItems) => {
    return (
      allItems.findIndex(
        (candidate) =>
          candidate.title === item.title &&
          candidate.company === item.company &&
          candidate.period === item.period
      ) === index
    )
  })
}

function toBookableMeetingType(
  meetingType: MentorMeetingTypeApiResponse | null
): BookingMeetingTypeApiResponse | null {
  if (meetingType === 'ONLINE' || meetingType === 'OFFLINE') return meetingType

  return null
}

function unique<T>(values: Array<T | null | undefined>) {
  return values.filter((value, index, items): value is T => {
    return value !== null && value !== undefined && items.indexOf(value) === index
  })
}
