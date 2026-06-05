import { Star, X } from 'lucide-react'

interface FilterSidebarProps {
  onClose?: () => void
}

const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
  return (
    <aside className='shadow-soft flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5'>
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

      <div>
        <p className='text-ink text-sm font-semibold'>Môn học</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Toán', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Lập trình'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Học phí mỗi giờ</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Dưới 250k', '250k - 350k', '350k - 500k', '500k+'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Lớp / trình độ</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['THCS', 'THPT', 'Ôn thi chuyển cấp', 'Người mới bắt đầu'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Hình thức học</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Online', 'Offline', 'Hybrid'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Tín nhiệm</p>
        <div className='text-muted mt-3 flex items-center gap-2 text-sm'>
          <Star size={16} className='fill-amber-400 text-amber-400' /> Đã duyệt, từ 4.5 sao
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
