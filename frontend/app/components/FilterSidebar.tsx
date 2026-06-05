import { SlidersHorizontal, Star, X } from 'lucide-react'

interface FilterSidebarProps {
  onClose?: () => void
}

const filterGroups = [
  {
    title: 'Môn học',
    items: ['Toán', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Lập trình']
  },
  {
    title: 'Lớp / mục tiêu',
    items: ['Lớp 8', 'Lớp 9', 'THPT', 'Ôn thi chuyển cấp', 'IELTS Foundation']
  },
  {
    title: 'Hình thức học',
    items: ['Online', 'Offline', 'Hybrid']
  },
  {
    title: 'Mức học phí mỗi giờ',
    items: ['Dưới 250k', '250k - 350k', '350k - 500k', 'Trên 500k']
  },
  {
    title: 'Khả dụng',
    items: ['Buổi tối', 'Cuối tuần', 'Phản hồi nhanh', 'Có lịch gần nhất']
  }
] as const

const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
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
          Thu hẹp danh sách theo môn học, cấp lớp, hình thức học và mức độ phù hợp.
        </p>
      </div>

      {filterGroups.map((group) => (
        <div key={group.title}>
          <p className='text-ink text-sm font-semibold'>{group.title}</p>
          <div className='text-muted mt-3 space-y-2 text-sm'>
            {group.items.map((item) => (
              <label key={item} className='flex items-center gap-2'>
                <input type='checkbox' className='accent-primary' /> {item}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <p className='text-ink text-sm font-semibold'>Tín nhiệm</p>
        <div className='mt-3 space-y-2 text-sm text-slate-600'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='accent-primary' defaultChecked /> Mentor đã duyệt
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='accent-primary' defaultChecked /> Đã xác minh danh
            tính
          </label>
          <div className='flex items-center gap-2 pt-1 text-amber-600'>
            <Star size={16} className='fill-amber-400 text-amber-400' /> Từ 4.5 sao trở lên
          </div>
        </div>
      </div>

      <div className='mt-auto flex gap-3 border-t border-slate-200 pt-4'>
        <button
          type='button'
          className='flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50'
        >
          Xóa bộ lọc
        </button>
        <button
          type='button'
          className='bg-primary flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700'
        >
          Áp dụng
        </button>
      </div>
    </aside>
  )
}

export default FilterSidebar
