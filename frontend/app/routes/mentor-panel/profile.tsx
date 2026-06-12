import axios from 'axios'
import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { BookOpenText, CheckCircle2, ClipboardList, Clock3, ShieldCheck, Star } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCurrentMentorProfileQuery } from '@/hooks/queries/mentor/useCurrentMentorProfileQuery'
import { useUpdateCurrentMentorMutation } from '@/hooks/queries/mentor/useUpdateCurrentMentorMutation'
import { formatMeetingTypeLabel } from '@/routes/mentor-profile.presentation'
import type { ErrorResponse } from '@/types/api/common'
import type {
  CurrentMentorApiResponse,
  CurrentMentorTraitsApiResponse,
  CurrentMentorVerificationApiResponse,
  MentorAchievementDetailApiResponse,
  MentorAchievementTypeApiResponse,
  MentorOptionDetailApiResponse,
  MentorProficiencyLevelApiResponse
} from '@/types/api/mentor'
import { formatPrice } from '@/utils/format'

type MentorProfileDraft = {
  headline: string
  introduction: string
  teachingStyle: string
}

const emptyDraft: MentorProfileDraft = {
  headline: '',
  introduction: '',
  teachingStyle: ''
}

const proficiencyLabelMap: Record<MentorProficiencyLevelApiResponse, string> = {
  BASIC: 'Cơ bản',
  INTERMEDIATE: 'Trung bình',
  ADVANCED: 'Nâng cao',
  EXPERT: 'Chuyên sâu'
}

function mapMentorToFormValues(currentMentor: CurrentMentorApiResponse): MentorProfileDraft {
  return {
    headline: currentMentor.headline ?? '',
    introduction: currentMentor.introduction ?? '',
    teachingStyle: currentMentor.teachingStyle ?? ''
  }
}

function areFormValuesEqual(left: MentorProfileDraft, right: MentorProfileDraft) {
  return (
    left.headline === right.headline &&
    left.introduction === right.introduction &&
    left.teachingStyle === right.teachingStyle
  )
}

function getProfileSaveErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (!error.response) return 'Không kết nối được máy chủ.'
    return error.response.data?.message || 'Không thể lưu hồ sơ mentor lúc này.'
  }

  return 'Không thể lưu hồ sơ mentor lúc này.'
}

function uniqueStrings(items: Array<string | null | undefined>) {
  return items
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item))
    .filter((item, index, values) => values.indexOf(item) === index)
}

function mapTraitLabels(
  traits: CurrentMentorTraitsApiResponse | null,
  personalityOptions: MentorOptionDetailApiResponse[],
  highlightOptions: MentorOptionDetailApiResponse[]
) {
  if (!traits) return []

  const optionsById = new Map<number, string>(
    [...personalityOptions, ...highlightOptions].map((option) => [option.id, option.name])
  )

  return uniqueStrings([
    ...traits.personalityOptionIds.map((id) => optionsById.get(id) ?? null),
    ...traits.highlightOptionIds.map((id) => optionsById.get(id) ?? null)
  ])
}

function formatAchievementType(value: MentorAchievementTypeApiResponse) {
  if (value === 'AWARD') return 'Giải thưởng'
  if (value === 'CERTIFICATE') return 'Chứng chỉ'
  if (value === 'EXAM_SCORE') return 'Thành tích học tập'
  if (value === 'COMPETITION') return 'Cuộc thi'
  if (value === 'PROJECT') return 'Dự án'

  return 'Kinh nghiệm thực tế'
}

function formatAchievementDate(value: string | null) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', { month: '2-digit', year: 'numeric' }).format(date)
}

function formatAchievementSummary(item: MentorAchievementDetailApiResponse) {
  return uniqueStrings([
    item.title,
    item.issuer?.trim() || formatAchievementType(item.achievementType),
    formatAchievementDate(item.achievedAt)
  ]).join(' · ')
}

function formatVerificationDate(value: string | null) {
  if (!value) return null

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
}

function buildProfileExpertise(currentMentor: CurrentMentorApiResponse) {
  const value = uniqueStrings([
    currentMentor.currentPosition,
    currentMentor.workplace,
    currentMentor.major,
    currentMentor.education
  ]).join(' · ')

  return value || 'Bổ sung vị trí hiện tại, học vấn hoặc chuyên môn để hồ sơ rõ hơn.'
}

function buildProfileMeta(currentMentor: CurrentMentorApiResponse) {
  const location =
    currentMentor.currentLocation.districtName || currentMentor.currentLocation.cityName || null
  const value = uniqueStrings([
    currentMentor.meetingType ? formatMeetingTypeLabel(currentMentor.meetingType) : null,
    currentMentor.experienceYears !== null
      ? `${currentMentor.experienceYears} năm kinh nghiệm`
      : null,
    location
  ]).join(' · ')

  return (
    value ||
    'Hoàn thiện thêm hình thức học, kinh nghiệm hoặc khu vực dạy học để phụ huynh dễ đánh giá hơn.'
  )
}

function buildVerificationSummary(
  currentMentor: CurrentMentorApiResponse,
  verification: CurrentMentorVerificationApiResponse | null
) {
  if (verification?.rejectionReason?.trim()) {
    return `Xác minh cần bổ sung: ${verification.rejectionReason.trim()}`
  }

  if (verification?.verifiedAt) {
    return `Giấy tờ đã được xác minh vào ${formatVerificationDate(verification.verifiedAt)}.`
  }

  if (currentMentor.verificationStatus === 'PENDING') {
    return 'Hồ sơ xác minh đang được đội ngũ kiểm tra.'
  }

  if (currentMentor.verificationStatus === 'UNVERIFIED') {
    return 'Bạn chưa gửi đủ thông tin xác minh cho hồ sơ hiện tại.'
  }

  return 'Trạng thái xác minh đang được đồng bộ từ hồ sơ mentor hiện tại.'
}

function buildApprovalSummary(currentMentor: CurrentMentorApiResponse) {
  if (currentMentor.approvalNote?.trim()) {
    return `Ghi chú duyệt: ${currentMentor.approvalNote.trim()}`
  }

  if (currentMentor.approvalStatus === 'APPROVED') {
    return 'Hồ sơ đã qua bước duyệt để có thể hiển thị công khai cho học viên.'
  }

  if (currentMentor.approvalStatus === 'PENDING') {
    return 'Hồ sơ đang chờ duyệt, nên giữ phần giới thiệu và offerings thật rõ ràng.'
  }

  if (currentMentor.approvalStatus === 'REJECTED') {
    return 'Hồ sơ từng bị từ chối duyệt. Hãy rà soát lại nội dung công khai trước khi gửi lại.'
  }

  return 'Hồ sơ đang ở trạng thái tạm dừng hiển thị công khai.'
}

function buildTrustItems(
  currentMentor: CurrentMentorApiResponse,
  verification: CurrentMentorVerificationApiResponse | null,
  achievementSummaries: string[],
  traitLabels: string[]
) {
  return [
    buildApprovalSummary(currentMentor),
    buildVerificationSummary(currentMentor, verification),
    achievementSummaries.length
      ? `Thành tích công khai: ${achievementSummaries.slice(0, 2).join(' | ')}`
      : 'Bạn chưa công khai thêm chứng chỉ hoặc thành tích trên hồ sơ hiện tại.',
    traitLabels.length
      ? `Điểm nhấn hồ sơ: ${traitLabels.slice(0, 4).join(', ')}`
      : 'Traits/highlights hiện chưa có dữ liệu đủ để hiển thị rõ trên màn này.'
  ]
}

function ProfileFormSkeleton() {
  return (
    <div className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
      <div className='space-y-6'>
        {['Trạng thái công khai', 'Giới thiệu công khai', 'Offerings đang mở'].map((title) => (
          <WorkspacePanel key={title} title={title}>
            <div className='animate-pulse space-y-4'>
              <div className='h-6 w-48 rounded-xl bg-slate-100' />
              <div className='h-24 rounded-2xl bg-slate-100' />
              <div className='h-28 rounded-2xl bg-slate-100' />
            </div>
          </WorkspacePanel>
        ))}
      </div>

      <aside className='space-y-6'>
        {['Mức độ sẵn sàng', 'Teaching content', 'Trust và đánh giá'].map((title) => (
          <WorkspacePanel key={title} title={title}>
            <div className='animate-pulse space-y-3'>
              <div className='h-8 w-24 rounded-xl bg-slate-100' />
              <div className='h-16 rounded-2xl bg-slate-100' />
              <div className='h-16 rounded-2xl bg-slate-100' />
              <div className='h-16 rounded-2xl bg-slate-100' />
            </div>
          </WorkspacePanel>
        ))}
      </aside>
    </div>
  )
}

export function meta() {
  return [{ title: 'Hồ sơ mentor | Mentor' }]
}

export default function MentorProfilePage() {
  const {
    data: profileBundle,
    isLoading,
    isError,
    refetch: refetchProfile
  } = useCurrentMentorProfileQuery()
  const updateCurrentMentorMutation = useUpdateCurrentMentorMutation()

  const [draftFormValues, setDraftFormValues] = useState<MentorProfileDraft | null>(null)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null)
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)

  const currentMentor = profileBundle?.currentMentor
  const sourceFormValues = currentMentor ? mapMentorToFormValues(currentMentor) : emptyDraft
  const formValues = draftFormValues ?? sourceFormValues
  const isSubmitting = updateCurrentMentorMutation.isPending
  const hasUnsavedChanges = !areFormValuesEqual(formValues, sourceFormValues)

  const offeringSummaries = useMemo(
    () =>
      (profileBundle?.subjects ?? []).map((subject) => ({
        ...subject,
        label: `${subject.subjectName} · ${subject.gradeName}`
      })),
    [profileBundle?.subjects]
  )

  const traitLabels = useMemo(
    () =>
      mapTraitLabels(
        profileBundle?.traits ?? null,
        profileBundle?.personalityOptions ?? [],
        profileBundle?.highlightOptions ?? []
      ),
    [profileBundle?.highlightOptions, profileBundle?.personalityOptions, profileBundle?.traits]
  )

  const achievementSummaries = useMemo(
    () =>
      (profileBundle?.achievements ?? [])
        .map(formatAchievementSummary)
        .filter((item) => item.length > 0),
    [profileBundle?.achievements]
  )

  const completionItems = useMemo(
    () => [
      {
        label: 'Giới thiệu và phong cách dạy',
        done: Boolean(
          formValues.headline.trim() &&
          formValues.introduction.trim() &&
          formValues.teachingStyle.trim()
        ),
        helper: 'Headline, introduction và teaching style giúp phụ huynh hiểu nhanh độ phù hợp.'
      },
      {
        label: 'Offerings theo môn và lớp',
        done: offeringSummaries.some((offering) => offering.active),
        helper: 'Ưu tiên subject, grade, mức độ, giá và trạng thái nhận lịch thật rõ ràng.'
      },
      {
        label: 'Xác minh và duyệt hồ sơ',
        done:
          currentMentor?.approvalStatus === 'APPROVED' &&
          currentMentor.verificationStatus === 'VERIFIED',
        helper: 'Giữ approval và verification trung thực để học viên yên tâm đặt lịch.'
      }
    ],
    [
      currentMentor,
      formValues.headline,
      formValues.introduction,
      formValues.teachingStyle,
      offeringSummaries
    ]
  )

  const publicContentCards = useMemo(
    () =>
      currentMentor
        ? [
            {
              title: 'Giới thiệu hiện tại',
              description:
                currentMentor.introduction?.trim() ||
                'Bạn chưa có phần giới thiệu công khai trên hồ sơ mentor.'
            },
            {
              title: 'Phong cách dạy',
              description:
                currentMentor.teachingStyle?.trim() ||
                'Bạn chưa mô tả phong cách dạy học trên hồ sơ hiện tại.'
            },
            {
              title: 'Bối cảnh chuyên môn',
              description: uniqueStrings([
                currentMentor.currentPosition,
                currentMentor.workplace,
                currentMentor.major,
                currentMentor.meetingType ? formatMeetingTypeLabel(currentMentor.meetingType) : null
              ]).join(' · ')
            }
          ]
        : [],
    [currentMentor]
  )

  const trustItems = useMemo(
    () =>
      currentMentor
        ? buildTrustItems(
            currentMentor,
            profileBundle?.verification ?? null,
            achievementSummaries,
            traitLabels
          )
        : [],
    [achievementSummaries, currentMentor, profileBundle?.verification, traitLabels]
  )

  const completedCount = completionItems.filter((item) => item.done).length
  const reviewSummaryText = achievementSummaries.length
    ? `${achievementSummaries.length} thành tích đã được công khai trên hồ sơ.`
    : 'Backend current mentor hiện chưa trả về rating/review hoặc số học viên đang hoạt động.'

  const handleFieldChange =
    (field: keyof MentorProfileDraft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSaveSuccessMessage(null)
      setSubmitErrorMessage(null)
      setDraftFormValues((currentValues) => ({
        ...(currentValues ?? sourceFormValues),
        [field]: event.target.value
      }))
    }

  const handleRetry = () => {
    setDraftFormValues(null)
    setSaveSuccessMessage(null)
    setSubmitErrorMessage(null)
    void refetchProfile()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!currentMentor) return

    setSaveSuccessMessage(null)
    setSubmitErrorMessage(null)

    updateCurrentMentorMutation.mutate(
      {
        avatarUrl: currentMentor.avatarUrl,
        gender: currentMentor.gender,
        hometownCityId: currentMentor.hometown.cityId,
        currentDistrictId: currentMentor.currentLocation.districtId,
        headline: formValues.headline.trim() || null,
        introduction: formValues.introduction.trim() || null,
        teachingStyle: formValues.teachingStyle.trim() || null,
        experienceYears: currentMentor.experienceYears,
        currentPosition: currentMentor.currentPosition,
        workplace: currentMentor.workplace,
        education: currentMentor.education,
        major: currentMentor.major,
        meetingType: currentMentor.meetingType
      },
      {
        onSuccess: ({ currentMentor: updatedCurrentMentor, message }) => {
          setDraftFormValues(mapMentorToFormValues(updatedCurrentMentor))
          setSaveSuccessMessage(message || 'Hồ sơ mentor đã được cập nhật thành công.')
        },
        onError: (error) => {
          setSubmitErrorMessage(getProfileSaveErrorMessage(error))
        }
      }
    )
  }

  if (isLoading && !profileBundle) {
    return (
      <DashboardPage
        description='Ưu tiên offerings, nội dung dạy học, duyệt hồ sơ và tín hiệu tin cậy để phụ huynh có thể đặt lịch với đủ ngữ cảnh.'
        title='Hồ sơ mentor'
      >
        <ProfileFormSkeleton />
      </DashboardPage>
    )
  }

  if (isError || !profileBundle || !currentMentor) {
    return (
      <DashboardPage
        description='Ưu tiên offerings, nội dung dạy học, duyệt hồ sơ và tín hiệu tin cậy để phụ huynh có thể đặt lịch với đủ ngữ cảnh.'
        title='Hồ sơ mentor'
      >
        <ScreenErrorState
          description='Không thể tải hồ sơ mentor hiện tại hoặc các dữ liệu offerings/xác minh liên quan. Vui lòng thử lại để tiếp tục.'
          onRetry={handleRetry}
          retryLabel='Tải lại hồ sơ'
          title='Không tải được hồ sơ mentor'
        />
      </DashboardPage>
    )
  }

  return (
    <DashboardPage
      description='Ưu tiên offerings, nội dung dạy học, duyệt hồ sơ và tín hiệu tin cậy để phụ huynh có thể đặt lịch với đủ ngữ cảnh.'
      title='Hồ sơ mentor'
    >
      <div className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
        <div className='space-y-6'>
          <WorkspacePanel
            title='Trạng thái công khai'
            description='Hiển thị riêng approval và verification để học viên hiểu hồ sơ đã sẵn sàng ở mức nào.'
          >
            <div className='flex flex-wrap items-center gap-3'>
              <StatusBadge kind='approval' status={currentMentor.approvalStatus} />
              <StatusBadge kind='verification' status={currentMentor.verificationStatus} />
              <span className='text-muted text-sm'>{reviewSummaryText}</span>
            </div>
            <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
              <CardContent className='space-y-3 p-4'>
                <div>
                  <p className='text-ink text-lg font-semibold'>{currentMentor.fullName}</p>
                  <p className='text-muted mt-1 text-sm'>{buildProfileExpertise(currentMentor)}</p>
                </div>
                <p className='text-muted text-sm'>{buildProfileMeta(currentMentor)}</p>
              </CardContent>
            </Card>
          </WorkspacePanel>

          <form className='space-y-6' onSubmit={handleSubmit}>
            <WorkspacePanel
              title='Giới thiệu công khai'
              description='Giữ headline ngắn, intro rõ đối tượng học viên và teaching style đủ cụ thể để phụ huynh hiểu cách bạn dạy.'
            >
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-headline'>Headline</Label>
                  <Input
                    disabled={isSubmitting}
                    id='mentor-headline'
                    onChange={handleFieldChange('headline')}
                    value={formValues.headline}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-introduction'>Giới thiệu</Label>
                  <Textarea
                    className='min-h-32'
                    disabled={isSubmitting}
                    id='mentor-introduction'
                    onChange={handleFieldChange('introduction')}
                    value={formValues.introduction}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-teaching-style'>Phong cách dạy</Label>
                  <Textarea
                    className='min-h-32'
                    disabled={isSubmitting}
                    id='mentor-teaching-style'
                    onChange={handleFieldChange('teachingStyle')}
                    value={formValues.teachingStyle}
                  />
                </div>
              </div>

              {submitErrorMessage ? (
                <div
                  aria-live='polite'
                  className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
                  role='alert'
                >
                  {submitErrorMessage}
                </div>
              ) : null}
            </WorkspacePanel>

            <WorkspacePanel
              title='Offerings đang mở'
              description='Pricing, subject và grade là phần học viên dùng để so sánh nhanh trước khi đặt lịch.'
            >
              <div className='space-y-3'>
                {offeringSummaries.length ? (
                  offeringSummaries.map((offering) => (
                    <Card className='rounded-2xl shadow-none' key={offering.id}>
                      <CardContent className='flex flex-col gap-3 p-4 lg:flex-row lg:items-start lg:justify-between'>
                        <div className='space-y-2'>
                          <div className='flex flex-wrap items-center gap-2'>
                            <p className='text-ink font-semibold'>{offering.label}</p>
                            <Badge variant='info'>
                              {proficiencyLabelMap[offering.proficiencyLevel]}
                            </Badge>
                            <Badge variant={offering.active ? 'success' : 'muted'}>
                              {offering.active ? 'Đang nhận lịch' : 'Tạm ẩn'}
                            </Badge>
                          </div>
                          <p className='text-muted text-sm'>
                            {offering.teachingNote?.trim() ||
                              'Offering này chưa có teaching note công khai.'}
                          </p>
                        </div>
                        <p className='text-ink text-lg font-semibold'>
                          {formatPrice(offering.pricePerHour)}/giờ
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
                    <CardContent className='p-4 text-sm text-slate-700'>
                      Bạn chưa có offering nào được trả về từ `getCurrentMentorSubjects()`. Màn này
                      hiện render read-only trung thực theo dữ liệu backend.
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className='flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='space-y-1'>
                  <p className='text-muted text-sm'>
                    Offerings đang dùng dữ liệu thật từ backend. Chỉnh sửa offering chưa được bật
                    trên màn này để tránh gửi thiếu `subjectGradeId` hoặc làm lệch contract hiện có.
                  </p>
                  {saveSuccessMessage ? (
                    <p
                      aria-live='polite'
                      className='text-sm font-medium text-emerald-700'
                      role='status'
                    >
                      {saveSuccessMessage}
                    </p>
                  ) : null}
                </div>
                <Button disabled={!hasUnsavedChanges} isLoading={isSubmitting} type='submit'>
                  {hasUnsavedChanges ? 'Lưu giới thiệu' : 'Đã đồng bộ'}
                </Button>
              </div>
            </WorkspacePanel>
          </form>
        </div>

        <aside className='space-y-6'>
          <WorkspacePanel
            title='Mức độ sẵn sàng'
            description='Checklist này giữ profile tập trung vào đúng phần ảnh hưởng đến việc đặt lịch.'
          >
            <p className='text-ink text-3xl font-semibold'>
              {completedCount}/{completionItems.length}
            </p>
            <div className='space-y-3'>
              {completionItems.map((item) => (
                <div
                  className='flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <div className='space-y-1'>
                    <p className='text-sm font-medium text-slate-800'>{item.label}</p>
                    <p className='text-muted text-xs'>{item.helper}</p>
                  </div>
                  <Badge variant={item.done ? 'success' : 'warning'}>
                    {item.done ? 'Đã có' : 'Cần bổ sung'}
                  </Badge>
                </div>
              ))}
            </div>
            {saveSuccessMessage ? (
              <WorkspaceNotice
                className='rounded-2xl'
                description={saveSuccessMessage}
                icon={CheckCircle2}
                title='Đã lưu thành công'
              />
            ) : null}
          </WorkspacePanel>

          <WorkspacePanel
            title='Teaching content'
            description='Giữ kỳ vọng học viên rõ ràng bằng chính nội dung hồ sơ công khai hiện tại.'
          >
            <div className='space-y-3'>
              {publicContentCards.map((item, index) => {
                const icons = [BookOpenText, Clock3, CheckCircle2] as const
                const Icon = icons[index] ?? BookOpenText

                return (
                  <Card
                    className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'
                    key={item.title}
                  >
                    <CardContent className='flex items-start gap-3 p-4'>
                      <div className='bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl'>
                        <Icon aria-hidden='true' size={18} />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-ink font-semibold'>{item.title}</p>
                        <p className='text-muted text-sm'>
                          {item.description || 'Nội dung này đang được cập nhật thêm trên hồ sơ.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Trust và đánh giá'
            description='Giữ tín hiệu tin cậy luôn gần khu vực chỉnh sửa hồ sơ để tránh bỏ quên.'
          >
            <div className='flex flex-wrap items-center gap-2'>
              <Badge variant='warning'>
                <Star aria-hidden='true' size={14} />
                Chưa có rating/review
              </Badge>
              <Badge variant='info'>
                <ShieldCheck aria-hidden='true' size={14} />
                {achievementSummaries.length} thành tích công khai
              </Badge>
            </div>
            <div className='space-y-2'>
              {trustItems.map((item) => (
                <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none' key={item}>
                  <CardContent className='p-4 text-sm text-slate-700'>{item}</CardContent>
                </Card>
              ))}
            </div>
          </WorkspacePanel>

          <WorkspaceNotice
            description='Màn này đã dùng dữ liệu current mentor, subjects, traits, achievements và verification. Rating/review và số học viên vẫn đang fallback trung thực vì current mentor API hiện chưa trả về.'
            icon={ClipboardList}
            title='Kết nối API thật'
            tone='neutral'
          />
        </aside>
      </div>
    </DashboardPage>
  )
}
