import { Star, X } from 'lucide-react'

interface FilterSidebarProps {
  onClose?: () => void
}

const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
  return (
    <aside className='shadow-soft flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5'>
      <div className='flex items-center justify-between md:hidden'>
        <h3 className='text-ink text-base font-semibold'>Filters</h3>
        <button
          className='rounded-full border border-slate-200 p-2 text-slate-600'
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Subjects</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Computer Science', 'Design', 'Data', 'Business', 'Languages'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Price Range</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['$30 - $60', '$60 - $90', '$90 - $130', '$130+'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Skill Level</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Beginner', 'Intermediate', 'Advanced'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Availability</p>
        <div className='text-muted mt-3 space-y-2 text-sm'>
          {['Weekdays', 'Weekends', 'Evenings'].map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input type='checkbox' className='accent-primary' /> {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className='text-ink text-sm font-semibold'>Rating</p>
        <div className='text-muted mt-3 flex items-center gap-2 text-sm'>
          <Star size={16} className='fill-amber-400 text-amber-400' /> 4.5 and up
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
