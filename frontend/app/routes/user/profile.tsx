import axios from 'axios'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { CheckCircle2, ClipboardList } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCurrentUserQuery } from '@/hooks/queries/auth/useCurrentUserQuery'
import { useCatalogGradesQuery } from '@/hooks/queries/catalog/useCatalogOptionsQuery'
import { useCurrentLearnerProfileQuery } from '@/hooks/queries/user/useCurrentLearnerProfileQuery'
import { useUpdateCurrentUserProfileMutation } from '@/hooks/queries/user/useUpdateCurrentUserProfileMutation'
import type { ErrorResponse } from '@/types/api/common'
import type { LearnerGenderApiResponse, LearnerProfileApiResponse } from '@/types/api/user'
import type { CurrentUser, UserType } from '@/types/models/user'

type ProfileFormValues = {
  fullName: string
  email: string
  phone: string
  userType: UserType | ''
  gender: LearnerGenderApiResponse | ''
  birthYear: string
  schoolName: string
  gradeId: string
  learningGoal: string
}

const DEFAULT_USER_TYPE: UserType = 'STUDENT'

const emptyFormValues: ProfileFormValues = {
  fullName: '',
  email: '',
  phone: '',
  userType: '',
  gender: '',
  birthYear: '',
  schoolName: '',
  gradeId: '',
  learningGoal: ''
}

const userTypeOptions: Array<{ label: string; value: UserType }> = [
  { label: 'Học sinh', value: 'STUDENT' },
  { label: 'Phụ huynh', value: 'PARENT' },
  { label: 'Sinh viên', value: 'UNIVERSITY_STUDENT' },
  { label: 'Người đi làm', value: 'WORKING_ADULT' }
]

const genderOptions: Array<{ label: string; value: LearnerGenderApiResponse }> = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
  { label: 'Khác', value: 'OTHER' }
]

function formatGradeLabel(name: string) {
  return name.replace(/^Lop\s+/i, 'Lớp ')
}

function mapProfileToFormValues(
  currentUser: CurrentUser,
  learnerProfile: LearnerProfileApiResponse
): ProfileFormValues {
  return {
    fullName: currentUser.fullName,
    email: currentUser.email,
    phone: currentUser.phone,
    userType: currentUser.userType ?? '',
    gender: learnerProfile.gender ?? '',
    birthYear: learnerProfile.birthYear ? String(learnerProfile.birthYear) : '',
    schoolName: learnerProfile.schoolName ?? '',
    gradeId: learnerProfile.gradeId ? String(learnerProfile.gradeId) : '',
    learningGoal: learnerProfile.learningGoal ?? ''
  }
}

function parseBirthYear(value: string): number | null {
  const normalizedValue = value.trim()

  if (!normalizedValue) return null

  const parsedValue = Number(normalizedValue)
  return Number.isInteger(parsedValue) ? parsedValue : null
}

function isValidBirthYear(value: string) {
  const parsedValue = parseBirthYear(value)

  if (parsedValue === null) return true

  const currentYear = new Date().getFullYear()
  return parsedValue >= 1900 && parsedValue <= currentYear
}

function areFormValuesEqual(left: ProfileFormValues, right: ProfileFormValues) {
  return (
    left.fullName === right.fullName &&
    left.email === right.email &&
    left.phone === right.phone &&
    left.userType === right.userType &&
    left.gender === right.gender &&
    left.birthYear === right.birthYear &&
    left.schoolName === right.schoolName &&
    left.gradeId === right.gradeId &&
    left.learningGoal === right.learningGoal
  )
}

function getProfileSaveErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (!error.response) return 'Không kết nối được máy chủ.'
    return error.response.data?.message || 'Không thể lưu hồ sơ lúc này.'
  }

  return 'Không thể lưu hồ sơ lúc này.'
}

function ProfileFormSkeleton() {
  return (
    <div className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
      <div className='space-y-6'>
        {['Tài khoản', 'Hồ sơ học viên', 'Mục tiêu học tập'].map((title) => (
          <WorkspacePanel key={title} title={title}>
            <div className='animate-pulse space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='h-11 rounded-xl bg-slate-100' />
                <div className='h-11 rounded-xl bg-slate-100' />
                <div className='h-11 rounded-xl bg-slate-100' />
                <div className='h-11 rounded-xl bg-slate-100' />
              </div>
              <div className='h-28 rounded-2xl bg-slate-100' />
            </div>
          </WorkspacePanel>
        ))}
      </div>

      <aside className='space-y-6'>
        <WorkspacePanel title='Mức độ hoàn thiện'>
          <div className='animate-pulse space-y-3'>
            <div className='h-8 w-24 rounded-xl bg-slate-100' />
            <div className='h-16 rounded-2xl bg-slate-100' />
            <div className='h-16 rounded-2xl bg-slate-100' />
            <div className='h-16 rounded-2xl bg-slate-100' />
          </div>
        </WorkspacePanel>

        <WorkspacePanel title='Ghi chú hồ sơ'>
          <div className='animate-pulse space-y-3'>
            <div className='h-16 rounded-2xl bg-slate-100' />
            <div className='h-16 rounded-2xl bg-slate-100' />
            <div className='h-16 rounded-2xl bg-slate-100' />
          </div>
        </WorkspacePanel>
      </aside>
    </div>
  )
}

export function meta() {
  return [{ title: 'Hồ sơ | Học viên' }]
}

export default function UserProfilePage() {
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    refetch: refetchCurrentUser
  } = useCurrentUserQuery()
  const {
    data: learnerProfile,
    isLoading: isLearnerProfileLoading,
    isError: isLearnerProfileError,
    refetch: refetchLearnerProfile
  } = useCurrentLearnerProfileQuery()
  const {
    data: grades,
    isLoading: isGradesLoading,
    isError: isGradesError,
    refetch: refetchGrades
  } = useCatalogGradesQuery()
  const updateCurrentUserProfileMutation = useUpdateCurrentUserProfileMutation()

  const [draftFormValues, setDraftFormValues] = useState<ProfileFormValues | null>(null)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null)
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)

  const sourceFormValues =
    currentUser && learnerProfile
      ? mapProfileToFormValues(currentUser, learnerProfile)
      : emptyFormValues
  const formValues = draftFormValues ?? sourceFormValues

  const completionItems = [
    {
      label: 'Thông tin liên hệ',
      done: Boolean(formValues.fullName && formValues.phone && formValues.userType)
    },
    { label: 'Bối cảnh học tập', done: Boolean(formValues.schoolName && formValues.gradeId) },
    { label: 'Mục tiêu học tập', done: formValues.learningGoal.trim().length > 0 }
  ]

  const completedCount = completionItems.filter((item) => item.done).length
  const isPageLoading =
    (!currentUser || !learnerProfile || !grades) &&
    (isCurrentUserLoading || isLearnerProfileLoading || isGradesLoading)
  const hasPageError = isCurrentUserError || isLearnerProfileError || isGradesError
  const isSubmitting = updateCurrentUserProfileMutation.isPending
  const hasUnsavedChanges = !areFormValuesEqual(formValues, sourceFormValues)

  const handleFieldChange =
    (field: keyof ProfileFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    void refetchCurrentUser()
    void refetchLearnerProfile()
    void refetchGrades()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!currentUser) return

    setSaveSuccessMessage(null)
    setSubmitErrorMessage(null)

    if (!formValues.userType) {
      setSubmitErrorMessage('Vui lòng chọn vai trò học tập để hoàn thiện hồ sơ.')
      return
    }

    if (!isValidBirthYear(formValues.birthYear)) {
      setSubmitErrorMessage('Năm sinh không hợp lệ. Vui lòng nhập năm trong khoảng hợp lý.')
      return
    }

    updateCurrentUserProfileMutation.mutate(
      {
        user: {
          fullName: formValues.fullName.trim(),
          phone: formValues.phone.trim(),
          userType: formValues.userType || currentUser.userType || DEFAULT_USER_TYPE
        },
        learnerProfile: {
          gender: formValues.gender || null,
          birthYear: parseBirthYear(formValues.birthYear),
          schoolName: formValues.schoolName.trim() || null,
          gradeId: formValues.gradeId ? Number(formValues.gradeId) : null,
          learningGoal: formValues.learningGoal.trim() || null
        }
      },
      {
        onSuccess: ({
          currentUser: updatedCurrentUser,
          learnerProfile: updatedLearnerProfile,
          message
        }) => {
          setDraftFormValues(mapProfileToFormValues(updatedCurrentUser, updatedLearnerProfile))
          setSaveSuccessMessage(message || 'Hồ sơ đã được cập nhật thành công.')
        },
        onError: (error) => {
          setSubmitErrorMessage(getProfileSaveErrorMessage(error))
        }
      }
    )
  }

  if (isPageLoading) {
    return (
      <DashboardPage
        description='Giữ hồ sơ học viên rõ ràng để việc ghép mentor, đặt lịch và theo dõi mục tiêu học tập dễ hơn.'
        title='Hồ sơ học viên'
      >
        <ProfileFormSkeleton />
      </DashboardPage>
    )
  }

  if (hasPageError || !currentUser || !learnerProfile || !grades) {
    return (
      <DashboardPage
        description='Giữ hồ sơ học viên rõ ràng để việc ghép mentor, đặt lịch và theo dõi mục tiêu học tập dễ hơn.'
        title='Hồ sơ học viên'
      >
        <ScreenErrorState
          description='Không thể tải hồ sơ học viên hoặc dữ liệu lớp học lúc này. Vui lòng thử lại để tiếp tục.'
          onRetry={handleRetry}
          retryLabel='Tải lại hồ sơ'
          title='Không tải được hồ sơ'
        />
      </DashboardPage>
    )
  }

  return (
    <DashboardPage
      description='Giữ hồ sơ học viên rõ ràng để việc ghép mentor, đặt lịch và theo dõi mục tiêu học tập dễ hơn.'
      title='Hồ sơ học viên'
    >
      <form className='grid gap-6 xl:grid-cols-[1.6fr_1fr]' onSubmit={handleSubmit}>
        <div className='space-y-6'>
          <WorkspacePanel
            title='Tài khoản'
            description='Thông tin cơ bản để mentor và hệ thống liên hệ khi có thay đổi về buổi học.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='learner-full-name'>Họ và tên</Label>
                <Input
                  disabled={isSubmitting}
                  id='learner-full-name'
                  onChange={handleFieldChange('fullName')}
                  value={formValues.fullName}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-email'>Email</Label>
                <Input
                  disabled={isSubmitting}
                  id='learner-email'
                  readOnly
                  type='email'
                  value={formValues.email}
                />
                <p className='text-muted text-xs'>
                  Email hiện được quản lý từ tài khoản đăng nhập.
                </p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-phone'>Số điện thoại</Label>
                <Input
                  disabled={isSubmitting}
                  id='learner-phone'
                  onChange={handleFieldChange('phone')}
                  type='tel'
                  value={formValues.phone}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-gender'>Giới tính</Label>
                <Select
                  disabled={isSubmitting}
                  id='learner-gender'
                  onChange={handleFieldChange('gender')}
                  value={formValues.gender}
                >
                  <option value=''>Chọn giới tính</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='learner-user-type'>Vai trò học tập</Label>
                <Select
                  disabled={isSubmitting}
                  id='learner-user-type'
                  onChange={handleFieldChange('userType')}
                  value={formValues.userType}
                >
                  <option value=''>Chọn vai trò học tập</option>
                  {userTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Hồ sơ học viên'
            description='Bối cảnh trường lớp giúp mentor chuẩn bị nội dung đúng trình độ và mục tiêu.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='learner-birth-year'>Năm sinh</Label>
                <Input
                  disabled={isSubmitting}
                  id='learner-birth-year'
                  inputMode='numeric'
                  onChange={handleFieldChange('birthYear')}
                  placeholder='Ví dụ: 2009'
                  value={formValues.birthYear}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-grade'>Lớp hiện tại</Label>
                <Select
                  disabled={isSubmitting}
                  id='learner-grade'
                  onChange={handleFieldChange('gradeId')}
                  value={formValues.gradeId}
                >
                  <option value=''>Chọn lớp hiện tại</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={String(grade.id)}>
                      {formatGradeLabel(grade.name)}
                    </option>
                  ))}
                </Select>
              </div>
              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='learner-school'>Trường / trung tâm</Label>
                <Input
                  disabled={isSubmitting}
                  id='learner-school'
                  onChange={handleFieldChange('schoolName')}
                  value={formValues.schoolName}
                />
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Mục tiêu học tập'
            description='Mô tả ngắn mục tiêu hiện tại để mentor hiểu rõ vì sao bạn đặt buổi học.'
          >
            <div className='space-y-2'>
              <Label htmlFor='learner-goal'>Mục tiêu</Label>
              <Textarea
                className='min-h-36'
                disabled={isSubmitting}
                id='learner-goal'
                onChange={handleFieldChange('learningGoal')}
                value={formValues.learningGoal}
              />
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

            <div className='flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='space-y-1'>
                <p className='text-muted text-sm'>
                  Thông tin sẽ được đồng bộ vào hồ sơ hiện tại để hỗ trợ ghép mentor và đặt lịch
                  học.
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
                {hasUnsavedChanges ? 'Lưu thông tin' : 'Đã đồng bộ'}
              </Button>
            </div>
          </WorkspacePanel>
        </div>

        <aside className='space-y-6'>
          <WorkspacePanel
            title='Mức độ hoàn thiện'
            description='Hồ sơ càng rõ thì mentor càng dễ chuẩn bị nội dung và lịch phù hợp.'
          >
            <p className='text-ink text-3xl font-semibold'>
              {completedCount}/{completionItems.length}
            </p>
            <div className='space-y-3'>
              {completionItems.map((item) => (
                <div
                  className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <span className='text-sm font-medium text-slate-700'>{item.label}</span>
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
            title='Ghi chú hồ sơ'
            description='Một vài lưu ý để dữ liệu hiện tại khớp tốt hơn với luồng booking và matching.'
          >
            <div className='space-y-3 text-sm text-slate-700'>
              {[
                'Email được hiển thị từ users/me nhưng chưa hỗ trợ chỉnh sửa trong màn hình này.',
                'Lớp hiện tại lấy từ catalog options để lưu đúng gradeId mà backend yêu cầu.',
                'Thông tin tài khoản và learner profile được lưu qua hai endpoint hiện có rồi đồng bộ lại cache.'
              ].map((item) => (
                <div
                  className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </WorkspacePanel>

          <WorkspaceNotice
            description='Các trường hiện tại ưu tiên đúng ngữ cảnh booking, học tập và ghép mentor trước khi mở rộng thêm workflow tài khoản.'
            icon={ClipboardList}
            title='Kết nối API thật'
            tone='neutral'
          />
        </aside>
      </form>
    </DashboardPage>
  )
}
