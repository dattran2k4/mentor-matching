import { Filter, RotateCcw } from 'lucide-react'
import { useState } from 'react'

import FilterSidebar from '@/components/FilterSidebar'
import MentorCard from '@/components/MentorCard'
import SearchBar from '@/components/SearchBar'
import SectionTitle from '@/components/SectionTitle'
import { mentors } from '@/constants/mentors'

const selectedFilters = ['Toán', 'Lớp 9', 'Online', 'Từ 4.5 sao', 'Phản hồi trong ngày'] as const

const sortOptions = ['Phù hợp', 'Đánh giá', 'Học phí', 'Mới nhất'] as const

const Discover = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className='flex flex-col gap-8 py-6'>
      <section className='rounded-3xl border border-slate-200 bg-white p-6 md:p-8'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <SectionTitle
            size='md'
            subtitle='Lọc theo môn học, lớp, lịch học, hình thức học và mức độ tín nhiệm để so sánh mentor phù hợp.'
            title='Tìm mentor'
          />
          <button
            className='inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:hidden'
            onClick={() => setFiltersOpen(true)}
            type='button'
          >
            <Filter size={16} /> Bộ lọc
          </button>
        </div>

        <div className='mt-6'>
          <SearchBar
            buttonLabel='Tìm kết quả'
            contextPlaceholder='Lớp, khu vực hoặc thời gian muốn học'
            quickTags={['Toán lớp 9', 'Tiếng Anh THPT', 'Cuối tuần', 'Hybrid tại Quận 7']}
          />
        </div>
      </section>

      <div className='grid gap-8 lg:grid-cols-[280px_1fr]'>
        <div className='hidden lg:block'>
          <FilterSidebar />
        </div>

        <section className='space-y-6'>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5'>
            <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
              <div>
                <p className='text-ink text-lg font-semibold'>32 mentor phù hợp</p>
                <p className='text-muted mt-1 text-sm'>
                  Ưu tiên hồ sơ đã duyệt, có môn học phù hợp và khung giờ dễ đặt lịch.
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {sortOptions.map((option, index) => (
                  <button
                    key={option}
                    type='button'
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      index === 0
                        ? 'bg-primary text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-2'>
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className='rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700'
                >
                  {filter}
                </span>
              ))}
              <button
                type='button'
                className='inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300'
              >
                <RotateCcw size={12} />
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>

          <div className='flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4'>
            <p className='text-muted text-sm'>Đang hiển thị 4 trên 32 mentor phù hợp.</p>
            <div className='flex items-center gap-2'>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  type='button'
                  className={`h-9 w-9 rounded-full border text-sm font-semibold ${
                    page === 1
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </section>
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
