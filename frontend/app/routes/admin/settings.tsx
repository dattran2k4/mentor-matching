import { AlertTriangle, Settings2 } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { adminSettingsGroups } from '@/mocks/admin-workspace'

export function meta() {
  return [{ title: 'Cài đặt | Admin' }]
}

export default function AdminSettingsPage() {
  return (
    <DashboardPage
      description='Giữ màn hình cài đặt ở mức định hướng vận hành rõ ràng: nhóm nào đã có quy ước, nhóm nào còn phải chờ backend trước khi mở chỉnh sửa trực tiếp.'
      title='Cài đặt hệ thống'
    >
      <div className='space-y-6'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Phạm vi cấu hình hiện tại'
            description='Admin cần một nơi nhìn thấy các nhóm cấu hình quan trọng, nhưng không nên bị dẫn tới cảm giác đây đã là form cấu hình hoàn chỉnh.'
          />

          <div className='mt-6 grid gap-4 xl:grid-cols-3'>
            {adminSettingsGroups.map((group) => (
              <article className='rounded-2xl border border-slate-200 p-5' key={group.id}>
                <div className='flex items-start gap-3'>
                  <div className='bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl'>
                    <Settings2 aria-hidden='true' size={18} />
                  </div>
                  <div className='space-y-1'>
                    <h2 className='text-ink font-semibold'>{group.title}</h2>
                    <p className='text-muted text-sm'>{group.description}</p>
                  </div>
                </div>

                <div className='mt-5 space-y-3'>
                  {group.items.map((item) => (
                    <div
                      className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                      key={item.label}
                    >
                      <div className='flex flex-wrap items-center gap-2'>
                        <p className='text-ink font-medium'>{item.label}</p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.supportLabel === 'Đã có quy ước'
                              ? 'bg-emerald-50 text-emerald-700'
                              : item.supportLabel === 'Cần backend'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.supportLabel}
                        </span>
                      </div>
                      <p className='text-muted mt-2 text-sm'>{item.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm'>
          <div className='flex items-start gap-3'>
            <div className='text-amber-700'>
              <AlertTriangle aria-hidden='true' size={18} />
            </div>
            <div className='space-y-2'>
              <p className='font-semibold text-amber-900'>Vì sao chưa có nút lưu cấu hình</p>
              <p className='text-sm text-amber-800'>
                Các nhóm settings này đang giúp admin nhìn đúng phạm vi hỗ trợ hiện có. Chúng chưa
                nên có submit state hoặc toggle thật cho tới khi backend định nghĩa rõ dữ liệu,
                quyền sửa và hậu quả vận hành của từng thay đổi.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
