import { CheckCircle2, RotateCcw, SlidersHorizontal, X } from 'lucide-react'

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
  return (
    <aside className='shadow-soft flex w-full flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-5'>
      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-ink text-base font-semibold'>Bộ lọc</h3>
        <button
          className='rounded-full border border-slate-200 p-2 text-slate-600'
          onClick={onClose}
          type='button'
        >
          <X size={16} />
        </button>
      </div>

      <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
        <div className='flex items-center gap-2'>
          <SlidersHorizontal className='text-primary h-4 w-4' />
          <p className='text-ink text-sm font-semibold'>Lọc theo tiêu chí học tập</p>
        </div>
        <p className='text-muted mt-2 text-sm'>
          Thu hẹp danh sách theo môn học, cấp lớp, hình thức học, học phí và tín nhiệm của mentor.
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.title}>
          <p className='text-ink text-sm font-semibold'>{group.title}</p>
          <div className='mt-3 space-y-2'>
            {group.items.map((item) => (
              <label
                key={item.value}
                className='flex cursor-pointer items-start gap-3 rounded-2xl border border-transparent px-2 py-2 transition hover:border-slate-200 hover:bg-slate-50'
              >
                <input
                  type='checkbox'
                  className='accent-primary mt-0.5'
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
            Danh sách công khai hiện ưu tiên mentor đã duyệt. Các bộ lọc này giúp thu hẹp nhanh hơn
            theo nhu cầu học và mức độ sẵn sàng nhận lịch.
          </p>
        </div>
      </div>

      <div className='mt-auto flex gap-3 border-t border-slate-200 pt-4'>
        <button
          type='button'
          onClick={onReset}
          className='flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50'
        >
          <RotateCcw size={14} className='mr-2 inline-flex' />
          Xóa bộ lọc
        </button>
        <button
          type='button'
          onClick={() => {
            onApply?.()
            onClose?.()
          }}
          className='bg-primary flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          Áp dụng
        </button>
      </div>
    </aside>
  )
}

export default FilterSidebar
