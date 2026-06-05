import { Filter } from 'lucide-react'
import { useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import MentorCard from '../components/MentorCard'
import SearchBar from '../components/SearchBar'
import { mentors } from '../constants/mentors'

const Discover = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className='relative flex flex-col gap-10 py-6'>
      <div className='bg-primary/10 pointer-events-none absolute top-[-50px] right-[-100px] -z-10 h-96 w-96 rounded-full blur-[100px]' />

      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='mb-2 text-3xl font-bold tracking-tight md:text-4xl'>
            <span className='text-gradient'>Tìm mentor</span>
          </h1>
          <p className='text-muted'>
            Lọc theo môn học, lớp, hình thức học, học phí và tín nhiệm để so sánh mentor phù hợp.
          </p>
        </div>
        <button
          className='text-ink flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold md:hidden'
          onClick={() => setFiltersOpen(true)}
        >
          <Filter size={16} /> Bộ lọc
        </button>
      </div>

      <div className='glass-panel rounded-2xl p-2'>
        <SearchBar />
      </div>

      <div className='grid gap-8 lg:grid-cols-[280px_1fr]'>
        <div className='hidden lg:block'>
          <FilterSidebar />
        </div>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          <div className='flex items-center justify-center gap-2'>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`h-9 w-9 rounded-full border text-sm font-semibold ${
                  page === 1
                    ? 'border-primary bg-primary text-white'
                    : 'text-muted border-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className='fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden'>
          <div className='mx-auto max-w-sm'>
            <FilterSidebar onClose={() => setFiltersOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Discover
