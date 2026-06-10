import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

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
import { useCurrentUserQuery } from '@/hooks/queries/auth/use-current-user-query'
import { useLearnerProfileQuery } from '@/hooks/queries/user/use-learner-profile-query'
import { useUpdateCurrentUserMutation } from '@/hooks/queries/user/use-update-current-user-mutation'
import { useUpdateLearnerProfileMutation } from '@/hooks/queries/user/use-update-learner-profile-mutation'
import type { CurrentUser, LearnerGender, LearnerProfile, UserType } from '@/types/user'

type ProfileFormValues = {
  fullName: string
  email: string
  phone: string
  userType: UserType
  gender: LearnerGender | ''
  birthYear: string
  schoolName: string
  gradeId: string
  learningGoal: string
}

const gradeOptions = [
  { value: '1', label: 'Lớp 1' },
  { value: '2', label: 'Lớp 2' },
  { value: '3', label: 'Lớp 3' },
  { value: '4', label: 'Lớp 4' },
  { value: '5', label: 'Lớp 5' },
  { value: '6', label: 'Lớp 6' },
  { value: '7', label: 'Lớp 7' },
  { value: '8', label: 'Lớp 8' },
  { value: '9', label: 'Lớp 9' },
  { value: '10', label: 'Lớp 10' },
  { value: '11', label: 'Lớp 11' },
  { value: '12', label: 'Lớp 12' }
] as const

const userTypeLabels: Record<UserType, string> = {
  STUDENT: 'Học sinh',
  PARENT: 'Phụ huynh',
  UNIVERSITY_STUDENT: 'Sinh viên',
  WORKING_ADULT: 'Người đi làm'
}

const genderLabels: Record<LearnerGender, string> = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác'
}

function getInitialFormValues(
  currentUser: CurrentUser,
  learnerProfile?: LearnerProfile
): ProfileFormValues {
  return {
    fullName: currentUser.fullName ?? '',
    email: currentUser.email ?? '',
    phone: currentUser.phone ?? '',
    userType: currentUser.userType ?? 'STUDENT',
    gender: learnerProfile?.gender ?? '',
    birthYear: learnerProfile?.birthYear ? String(learnerProfile.birthYear) : '',
    schoolName: learnerProfile?.schoolName ?? '',
    gradeId: learnerProfile?.gradeId ? String(learnerProfile.gradeId) : '',
    learningGoal: learnerProfile?.learningGoal ?? ''
  }
}

type UserProfileFormProps = {
  initialValues: ProfileFormValues
}

function UserProfileForm({ initialValues }: UserProfileFormProps) {
  const updateCurrentUserMutation = useUpdateCurrentUserMutation()
  const updateLearnerProfileMutation = useUpdateLearnerProfileMutation()
  const [formValues, setFormValues] = useState<ProfileFormValues>(initialValues)
  const [isSaved, setIsSaved] = useState(false)

  const completionItems = useMemo(
    () => [
      { label: 'Thông tin liên hệ', done: Boolean(formValues.fullName && formValues.phone) },
      { label: 'Bối cảnh học tập', done: Boolean(formValues.schoolName && formValues.gradeId) },
      { label: 'Mục tiêu học tập', done: formValues.learningGoal.trim().length > 0 }
    ],
    [formValues]
  )

  const completedCount = completionItems.filter((item) => item.done).length
  const isSaving = updateCurrentUserMutation.isPending || updateLearnerProfileMutation.isPending

  const handleFieldChange =
    (field: keyof ProfileFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setIsSaved(false)
      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value
      }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await updateCurrentUserMutation.mutateAsync({
      fullName: formValues.fullName.trim(),
      phone: formValues.phone.trim(),
      userType: formValues.userType
    })

    await updateLearnerProfileMutation.mutateAsync({
      gender: formValues.gender || null,
      birthYear: formValues.birthYear ? Number(formValues.birthYear) : null,
      schoolName: formValues.schoolName.trim(),
      gradeId: formValues.gradeId ? Number(formValues.gradeId) : null,
      learningGoal: formValues.learningGoal.trim()
    })

    setIsSaved(true)
  }

  return (
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
                id='learner-full-name'
                onChange={handleFieldChange('fullName')}
                required
                value={formValues.fullName}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-email'>Email</Label>
              <Input disabled id='learner-email' readOnly type='email' value={formValues.email} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-phone'>Số điện thoại</Label>
              <Input
                id='learner-phone'
                maxLength={20}
                onChange={handleFieldChange('phone')}
                required
                type='tel'
                value={formValues.phone}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-user-type'>Loại tài khoản</Label>
              <Select
                id='learner-user-type'
                onChange={handleFieldChange('userType')}
                value={formValues.userType}
              >
                {Object.entries(userTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
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
              <Label htmlFor='learner-gender'>Giới tính</Label>
              <Select
                id='learner-gender'
                onChange={handleFieldChange('gender')}
                value={formValues.gender}
              >
                <option value=''>Chưa chọn</option>
                {Object.entries(genderLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-birth-year'>Năm sinh</Label>
              <Input
                id='learner-birth-year'
                max={2100}
                min={1900}
                onChange={handleFieldChange('birthYear')}
                type='number'
                value={formValues.birthYear}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-grade'>Lớp hiện tại</Label>
              <Select
                id='learner-grade'
                onChange={handleFieldChange('gradeId')}
                value={formValues.gradeId}
              >
                <option value=''>Chưa chọn</option>
                {gradeOptions.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='learner-school'>Trường / trung tâm</Label>
              <Input
                id='learner-school'
                maxLength={255}
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
              id='learner-goal'
              maxLength={2000}
              onChange={handleFieldChange('learningGoal')}
              value={formValues.learningGoal}
            />
          </div>
          <div className='flex justify-end border-t border-slate-100 pt-4'>
            <Button isLoading={isSaving} type='submit'>
              Lưu thông tin
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
          {isSaved ? (
            <WorkspaceNotice
              className='rounded-2xl'
              description='Thông tin hồ sơ đã được lưu về backend.'
              icon={CheckCircle2}
              title='Đã lưu'
            />
          ) : null}
        </WorkspacePanel>

      </aside>
    </form>
  )
}

export function meta() {
  return [{ title: 'Hồ sơ | Học viên' }]
}

export default function UserProfilePage() {
  const currentUserQuery = useCurrentUserQuery()
  const learnerProfileQuery = useLearnerProfileQuery()

  const isInitialLoading = currentUserQuery.isLoading || learnerProfileQuery.isLoading
  const isScreenError = currentUserQuery.isError || learnerProfileQuery.isError

  const handleRetry = () => {
    currentUserQuery.refetch()
    learnerProfileQuery.refetch()
  }

  if (isScreenError) {
    return (
      <DashboardPage
        description='Không thể tải hồ sơ học viên từ backend lúc này.'
        title='Hồ sơ học viên'
      >
        <ScreenErrorState
          description='Kiểm tra backend, token đăng nhập hoặc cấu hình VITE_API_BASE_URL rồi thử lại.'
          onRetry={handleRetry}
        />
      </DashboardPage>
    )
  }

  if (isInitialLoading || !currentUserQuery.data) {
    return (
      <DashboardPage description='Đang tải hồ sơ học viên từ backend.' title='Hồ sơ học viên'>
        <WorkspacePanel
          title='Đang tải dữ liệu'
          description='Hệ thống đang lấy thông tin tài khoản và hồ sơ học viên.'
        >
          <div className='grid gap-4 md:grid-cols-2'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div className='h-20 animate-pulse rounded-2xl bg-slate-100' key={index} />
            ))}
          </div>
        </WorkspacePanel>
      </DashboardPage>
    )
  }

  return (
    <DashboardPage
      description='Giữ hồ sơ học viên rõ ràng để việc ghép mentor, đặt lịch và theo dõi mục tiêu học tập dễ hơn.'
      title='Hồ sơ học viên'
    >
      <UserProfileForm
        key={`${currentUserQuery.data.id}-${learnerProfileQuery.data?.updatedAt ?? 'profile'}`}
        initialValues={getInitialFormValues(currentUserQuery.data, learnerProfileQuery.data)}
      />
    </DashboardPage>
  )
}
