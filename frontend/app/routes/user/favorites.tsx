import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Heart, Search, Trash2 } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { path } from '@/config/path'
import { mentors } from '@/constants/mentors'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format'

export function meta() {
  return [{ title: 'Yêu thích | Học viên' }]
}

export default function UserFavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hiddenMentorIds, setHiddenMentorIds] = useState<string[]>([])

  const favoriteMentors = useMemo(
    () =>
      mentors
        .filter((mentor) => mentor.approvalStatus === 'APPROVED')
        .slice(0, 4)
        .filter((mentor) => !hiddenMentorIds.includes(mentor.id)),
    [hiddenMentorIds]
  )

  const filteredMentors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (normalizedQuery.length === 0) {
      return favoriteMentors
    }

    return favoriteMentors.filter((mentor) =>
      [mentor.name, mentor.headline, mentor.subjects.join(' '), mentor.grades.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [favoriteMentors, searchQuery])

  return (
    <DashboardPage
      description='Lưu lại các mentor phù hợp để quay lại so sánh, xem lịch phù hợp và tiếp tục đặt buổi học.'
      title='Mentor yêu thích'
    >
      <div className='space-y-6'>
        <WorkspacePanel
          title='Danh sách đã lưu'
          description='Bản Milestone 3 dùng dữ liệu tĩnh để chốt cấu trúc; thao tác bỏ lưu hiện chỉ áp dụng trên giao diện.'
        >
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='relative max-w-md flex-1'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-4 -translate-y-1/2'
                size={18}
              />
              <Input
                className='pl-12'
                id='favorite-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo tên mentor, môn học hoặc lớp'
                type='search'
                value={searchQuery}
              />
            </div>
            <Badge variant='info'>Đang hiển thị {filteredMentors.length} mentor</Badge>
          </div>
        </WorkspacePanel>

        <WorkspaceNotice
          description='Danh sách này ưu tiên mentor đã duyệt để việc so sánh tiếp tục bám sát marketplace công khai. Bỏ lưu hiện chỉ là thao tác cục bộ.'
          icon={Heart}
          title='Danh sách lưu tạm thời'
          tone='neutral'
        />

        {filteredMentors.length === 0 ? (
          <EmptyState
            actionHref={path.discover}
            actionLabel='Khám phá mentor'
            description='Hãy thử tìm theo môn học khác hoặc quay lại trang khám phá để lưu thêm mentor phù hợp.'
            icon={<Heart aria-hidden='true' size={24} />}
            title='Chưa có mentor phù hợp trong danh sách lưu'
          />
        ) : (
          <div className='grid gap-5 lg:grid-cols-2'>
            {filteredMentors.map((mentor) => {
              const firstOffering = mentor.offerings[0]

              return (
                <Card className='rounded-3xl' key={mentor.id}>
                  <CardContent className='space-y-5 p-5'>
                    <div className='flex items-start justify-between gap-4'>
                      <div className='space-y-3'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <h2 className='text-ink text-lg font-semibold'>{mentor.name}</h2>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                        <p className='text-muted text-sm'>{mentor.headline}</p>
                      </div>
                      <Button
                        onClick={() =>
                          setHiddenMentorIds((currentIds) => [...currentIds, mentor.id])
                        }
                        size='icon'
                        variant='outline'
                      >
                        <Trash2 aria-hidden='true' size={16} />
                        <span className='sr-only'>Bỏ lưu mentor {mentor.name}</span>
                      </Button>
                    </div>

                    <div className='grid gap-3 text-sm text-slate-700 sm:grid-cols-2'>
                      <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
                        <CardContent className='p-4'>
                          <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                            Môn học phù hợp
                          </p>
                          <p className='mt-2 font-semibold'>
                            {firstOffering.subject} · {firstOffering.grade}
                          </p>
                          <p className='text-muted mt-1'>{firstOffering.teachingNote}</p>
                        </CardContent>
                      </Card>
                      <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
                        <CardContent className='p-4'>
                          <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                            Học phí từ
                          </p>
                          <p className='text-ink mt-2 font-semibold'>
                            {formatPrice(mentor.startingPrice)} / giờ
                          </p>
                          <p className='text-muted mt-1'>{mentor.availabilitySummary}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {mentor.highlights.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant='muted'>
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      <Link
                        className={buttonVariants({ variant: 'outline' })}
                        to={path.mentorProfile(mentor.id)}
                      >
                        Xem hồ sơ
                      </Link>
                      <Link className={cn(buttonVariants())} to={path.mentorProfile(mentor.id)}>
                        Tiếp tục đặt lịch
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardPage>
  )
}
