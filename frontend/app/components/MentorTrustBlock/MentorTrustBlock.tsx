import type { ReactNode } from 'react'
import { Award, ShieldCheck, Sparkles } from 'lucide-react'

import { StatusBadge } from '@/components/StatusBadge'
import type { Mentor } from '@/types/mentor'

type MentorTrustBlockProps = {
  mentor: Mentor
  className?: string
}

export function MentorTrustBlock({ className, mentor }: MentorTrustBlockProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white p-6 ${className ?? ''}`.trim()}
    >
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <p className='text-ink text-xl font-semibold'>Điểm tin cậy</p>
          <p className='text-muted mt-1 text-sm'>
            Phụ huynh và học viên có thể kiểm tra duyệt hồ sơ, xác minh danh tính và thế mạnh nổi
            bật trước khi gửi yêu cầu đặt lịch.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <StatusBadge kind='approval' status={mentor.approvalStatus} />
          <StatusBadge kind='verification' status={mentor.verificationStatus} />
        </div>
      </div>

      <div className='mt-5 grid gap-4 md:grid-cols-2'>
        <TrustCard
          description='Hồ sơ công khai sau khi được đội ngũ vận hành kiểm tra nội dung giảng dạy, thông tin cơ bản và khả năng nhận lịch.'
          icon={<ShieldCheck className='text-primary h-4 w-4' />}
          title='Duyệt hồ sơ mentor'
        />
        <TrustCard
          description='Trạng thái xác minh được theo dõi riêng để làm rõ danh tính, không thay thế cho trạng thái duyệt công khai.'
          icon={<Award className='text-primary h-4 w-4' />}
          title='Xác minh danh tính'
        />
      </div>

      <div className='mt-5'>
        <div className='flex items-center gap-2'>
          <Sparkles className='text-primary h-4 w-4' />
          <p className='text-ink text-sm font-semibold'>Điểm nổi bật khi ra quyết định</p>
        </div>
        <div className='mt-3 flex flex-wrap gap-2'>
          {mentor.highlights.map((highlight) => (
            <span
              key={highlight}
              className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600'
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
        <p className='text-ink text-sm font-semibold'>Cam kết và thành tích</p>
        <ul className='mt-3 space-y-2'>
          {mentor.achievements.map((achievement) => (
            <li key={achievement} className='flex items-start gap-2 text-sm text-slate-700'>
              <span className='mt-1 h-1.5 w-1.5 rounded-full bg-blue-500' />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

type TrustCardProps = {
  title: string
  description: string
  icon: ReactNode
}

function TrustCard({ description, icon, title }: TrustCardProps) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
      <div className='flex items-center gap-2'>
        {icon}
        <p className='text-ink font-semibold'>{title}</p>
      </div>
      <p className='text-muted mt-2 text-sm leading-relaxed'>{description}</p>
    </div>
  )
}
