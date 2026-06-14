import type {
  MentorCardData,
  MentorCardMeetingType,
  MentorCardOffering
} from '@/components/MentorCard'
import type { SubjectCardData } from '@/components/SubjectCard'
import { path } from '@/config/path'
import type { CatalogOptionsApiResponse, CatalogSubjectApiResponse } from '@/types/api/catalog'
import type { MentorAvailabilityDetailApiResponse } from '@/types/api/mentor'
import type { FeaturedMentorApiBundle } from '@/hooks/queries/mentor/useFeaturedMentorsQuery'

const SUBJECT_ICON_RULES: Array<{ icon: string; keywords: string[] }> = [
  { icon: 'Sigma', keywords: ['toán', 'math'] },
  { icon: 'BookOpen', keywords: ['anh', 'english', 'ielts'] },
  { icon: 'Atom', keywords: ['lý', 'physics'] },
  { icon: 'FlaskConical', keywords: ['hóa', 'chemistry'] },
  { icon: 'PenLine', keywords: ['văn', 'literature'] },
  { icon: 'Code2', keywords: ['lập trình', 'code', 'programming', 'tin học'] },
  { icon: 'Dna', keywords: ['sinh', 'biology'] },
  { icon: 'Globe2', keywords: ['địa', 'geography'] },
  { icon: 'Landmark', keywords: ['sử', 'history'] }
]

export function mapCatalogSubjectToHomeCard(
  subject: CatalogSubjectApiResponse,
  catalogOptions: CatalogOptionsApiResponse
): SubjectCardData {
  const category = catalogOptions.categories.find((item) => item.id === subject.categoryId)
  const params = new URLSearchParams({
    search: subject.name,
    subjectId: String(subject.id)
  })

  return {
    id: String(subject.id),
    name: subject.name,
    icon: resolveSubjectIcon(subject.name, category?.name),
    description:
      subject.description?.trim() ||
      (category?.name
        ? `Thuộc nhóm ${category.name.toLowerCase()} trong danh mục môn học hiện có.`
        : 'Danh mục môn học đang được cập nhật thêm thông tin mô tả.'),
    badgeLabel: category?.name ?? 'Danh mục môn học',
    href: `${path.discover}?${params.toString()}`
  }
}

export function mapFeaturedMentorToCard(bundle: FeaturedMentorApiBundle): MentorCardData {
  const { detail, mentor, subjects, traits, availabilities } = bundle
  const subjectNames = unique(subjects.map((item) => item.subjectName))
  const gradeNames = unique(subjects.map((item) => item.gradeName))
  const meetingTypes = unique(
    [detail?.meetingType ?? mentor.meetingType].filter((value): value is MentorCardMeetingType =>
      Boolean(value)
    )
  )
  const specificDateAvailability = availabilities
    .filter(
      (
        item
      ): item is MentorAvailabilityDetailApiResponse & {
        availableDate: string
      } => item.availabilityType === 'SPECIFIC_DATE' && Boolean(item.availableDate)
    )
    .slice(0, 2)
    .map((item) => ({
      dateLabel: formatDateLabel(item.availableDate),
      startTime: item.startTime.slice(0, 5),
      endTime: item.endTime.slice(0, 5),
      meetingTypes,
      note: undefined
    }))
  const offerings: MentorCardOffering[] = subjects.slice(0, 2).map((item) => ({
    id: String(item.id),
    subject: item.subjectName,
    grade: item.gradeName,
    proficiency: item.proficiencyLevel,
    pricePerHour: item.pricePerHour,
    active: item.active,
    teachingNote: item.teachingNote
  }))
  const highlights = unique([
    ...traits.map((item) => item.name),
    detail?.currentPosition,
    detail?.workplace,
    detail?.education
  ]).slice(0, 3)

  return {
    id: String(mentor.id),
    name: mentor.fullName,
    avatarUrl: detail?.avatarUrl || mentor.avatarUrl,
    experienceYears: detail?.experienceYears ?? mentor.experienceYears,
    headline:
      detail?.headline?.trim() ||
      [detail?.currentPosition, detail?.workplace].filter(Boolean).join(' · ') ||
      'Mentor công khai đang sẵn sàng cho học viên mới.',
    approvalStatus: 'APPROVED',
    verificationStatus: null,
    rating: null,
    reviewsCount: null,
    responseTime: null,
    activeStudentsCount: null,
    startingPrice: mentor.minPrice ?? offerings[0]?.pricePerHour ?? null,
    expertise:
      detail?.introduction?.trim() ||
      detail?.teachingStyle?.trim() ||
      detail?.headline?.trim() ||
      'Thông tin giới thiệu chi tiết đang được cập nhật trong hồ sơ mentor.',
    highlights,
    subjects: subjectNames,
    grades: gradeNames,
    meetingTypes,
    availabilitySummary: buildAvailabilitySummary(
      availabilities,
      detail?.currentLocation,
      meetingTypes
    ),
    offerings,
    specificDateAvailability
  }
}

function buildAvailabilitySummary(
  availabilities: MentorAvailabilityDetailApiResponse[],
  currentLocation:
    | {
        cityName: string | null
        districtName: string | null
      }
    | undefined,
  meetingTypes: MentorCardMeetingType[]
) {
  const recurring = availabilities.filter((item) => item.availabilityType === 'RECURRING')
  const locationLabel = [currentLocation?.districtName, currentLocation?.cityName]
    .filter(Boolean)
    .join(', ')
  const meetingLabel = meetingTypes.map(formatMeetingType).join(' / ')

  if (recurring[0]) {
    const firstWindow = recurring[0]
    const recurringLabel = `${formatDayOfWeek(firstWindow.dayOfWeek)} ${firstWindow.startTime.slice(0, 5)}-${firstWindow.endTime.slice(0, 5)}`
    return [recurringLabel, locationLabel || meetingLabel].filter(Boolean).join(' · ')
  }

  return (
    [locationLabel, meetingLabel].filter(Boolean).join(' · ') ||
    'Lịch học và khu vực sẽ hiển thị rõ hơn trong hồ sơ mentor.'
  )
}

function resolveSubjectIcon(subjectName: string, categoryName?: string) {
  const haystack = `${subjectName} ${categoryName ?? ''}`.toLowerCase()

  return (
    SUBJECT_ICON_RULES.find((rule) => rule.keywords.some((keyword) => haystack.includes(keyword)))
      ?.icon ?? 'BookOpen'
  )
}

function formatDateLabel(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(date)
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

function formatMeetingType(meetingType: MentorCardMeetingType) {
  if (meetingType === 'ONLINE') return 'Online'
  if (meetingType === 'OFFLINE') return 'Offline'

  return 'Hybrid'
}

function unique<T>(values: Array<T | null | undefined>) {
  return values.filter((value, index, items): value is T => {
    return value !== null && value !== undefined && items.indexOf(value) === index
  })
}
