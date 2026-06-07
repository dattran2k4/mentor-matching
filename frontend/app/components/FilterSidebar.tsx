import { CheckCircle2, RotateCcw, SlidersHorizontal, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

interface FilterSidebarProps {
  onClose?: () => void
  groups?: FilterGroup[]
  selectedValues?: string[]
  onToggleValue?: (value: string) => void
  onReset?: () => void
  onApply?: () => void
}

export type FilterOption = {
  label: string
  value: string
  helper?: string
}

export type FilterGroup = {
  title: string
  items: FilterOption[]
}

const defaultFilterGroups: FilterGroup[] = [
  {
    title: 'Môn học',
    items: [
      { label: 'Toán', value: 'subject:Toán' },
      { label: 'Tiếng Anh', value: 'subject:Tiếng Anh' },
      { label: 'Vật lý', value: 'subject:Vật lý' },
      { label: 'Lập trình', value: 'subject:Lập trình Python' }
    ]
  },
  {
    title: 'Cấp lớp',
    items: [
      { label: 'Lớp 8', value: 'grade:Lớp 8' },
      { label: 'Lớp 9', value: 'grade:Lớp 9' },
      { label: 'THPT', value: 'grade:THPT' },
      { label: 'IELTS Foundation', value: 'grade:IELTS Foundation' }
    ]
  },
  {
    title: 'Hình thức học',
    items: [
      { label: 'Online', value: 'meeting:ONLINE' },
      { label: 'Offline', value: 'meeting:OFFLINE' },
      { label: 'Hybrid', value: 'meeting:HYBRID' }
    ]
  },
  {
    title: 'Mức học phí mỗi giờ',
    items: [
      { label: 'Dưới 250k', value: 'price:under-250' },
      { label: '250k - 350k', value: 'price:250-350' },
      { label: '350k - 500k', value: 'price:350-500' },
      { label: 'Trên 500k', value: 'price:500-plus' }
    ]
  },
  {
    title: 'Khả dụng và tín nhiệm',
    items: [
      { label: 'Buổi tối', value: 'availability:evening' },
      { label: 'Cuối tuần', value: 'availability:weekend' },
      { label: 'Có lịch gần nhất', value: 'availability:upcoming' },
      { label: 'Phản hồi nhanh', value: 'availability:fast-response' },
      { label: 'Đã duyệt', value: 'trust:approved' },
      { label: 'Đã xác minh', value: 'trust:verified' },
      { label: 'Từ 4.5 sao', value: 'trust:rating-4.5' }
    ]
  }
]

const FilterSidebar = ({
  groups = defaultFilterGroups,
  onApply,
  onClose,
  onReset,
  onToggleValue,
  selectedValues = []
}: FilterSidebarProps) => {
  const selectedCount = selectedValues.length

  return (
    <Card className='shadow-soft flex w-full flex-col rounded-[28px] border-slate-200/80'>
      <CardContent className='flex flex-1 flex-col gap-6 p-5'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Badge className='gap-1.5' variant='info'>
                <SlidersHorizontal size={12} />
                Bộ lọc
              </Badge>
              {selectedCount ? <Badge variant='muted'>{selectedCount} đang chọn</Badge> : null}
            </div>
            <div>
              <h3 className='text-ink text-base font-semibold'>Thu hẹp danh sách mentor</h3>
              <p className='text-muted mt-1 text-sm leading-relaxed'>
                Chọn theo môn học, cấp lớp, hình thức học, học phí và mức độ sẵn sàng nhận lịch.
              </p>
            </div>
          </div>
          {onClose ? (
            <Button
              className='shrink-0 md:hidden'
              size='icon'
              type='button'
              variant='outline'
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          ) : null}
        </div>

        {groups.map((group, index) => (
          <div key={group.title}>
            {index > 0 ? <Separator className='mb-6' /> : null}
            <p className='text-ink text-sm font-semibold'>{group.title}</p>
            <div className='mt-3 space-y-2'>
              {group.items.map((item) => (
                <label
                  key={item.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${
                    selectedValues.includes(item.value)
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Checkbox
                    checked={selectedValues.includes(item.value)}
                    onChange={() => onToggleValue?.(item.value)}
                  />
                  <span>
                    <span className='block text-sm font-medium text-slate-700'>{item.label}</span>
                    {item.helper ? (
                      <span className='mt-1 block text-xs text-slate-500'>{item.helper}</span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className='rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800'>
          <div className='flex items-start gap-2'>
            <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0' />
            <p>
              Danh sách công khai hiện ưu tiên mentor đã duyệt. Các bộ lọc này giúp thu hẹp nhanh
              hơn theo nhu cầu học và mức độ sẵn sàng nhận lịch.
            </p>
          </div>
        </div>

        <div className='mt-auto flex gap-3 border-t border-slate-200 pt-4'>
          <Button className='flex-1' type='button' variant='outline' onClick={onReset}>
            <RotateCcw size={14} />
            Xóa bộ lọc
          </Button>
          <Button
            className='flex-1'
            type='button'
            onClick={() => {
              onApply?.()
              onClose?.()
            }}
          >
            Áp dụng
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterSidebar
