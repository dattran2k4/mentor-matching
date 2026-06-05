import { Filter, RotateCcw } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/components/EmptyState'
import FilterSidebar from '@/components/FilterSidebar'
import MentorCard from '@/components/MentorCard'
import SearchBar from '@/components/SearchBar'
import SectionTitle from '@/components/SectionTitle'
import { mentors } from '@/constants/mentors'
import { path } from '@/config/path'
import type { Mentor } from '@/types/mentor'

const sortOptions = ['Phù hợp', 'Đánh giá', 'Học phí', 'Mới nhất'] as const
const publicMentors = mentors.filter((mentor) => mentor.approvalStatus === 'APPROVED')

const Discover = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [context, setContext] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    'subject:Toán',
    'grade:Lớp 9',
    'meeting:ONLINE',
    'trust:rating-4.5'
  ])
  const [activeSort, setActiveSort] = useState<(typeof sortOptions)[number]>('Phù hợp')

  const filteredMentors = getSortedMentors(
    publicMentors.filter((mentor) => {
      return matchesSearch(mentor, keyword, context) && matchesAllFilters(mentor, selectedFilters)
    }),
    activeSort
  )

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
            helperText='Tìm theo môn học, cấp lớp, lịch học mong muốn hoặc bối cảnh như online, cuối tuần, luyện thi.'
            keywordValue={keyword}
            contextValue={context}
            onKeywordChange={setKeyword}
            onContextChange={setContext}
            onQuickTagClick={(tag) => handleQuickTag(tag, setKeyword, setContext)}
            quickTags={['Toán lớp 9', 'Tiếng Anh THPT', 'Cuối tuần', 'Hybrid tại Quận 7']}
          />
        </div>
      </section>

      <div className='grid gap-8 lg:grid-cols-[280px_1fr]'>
        <div className='hidden lg:block'>
          <FilterSidebar
            selectedValues={selectedFilters}
            onToggleValue={(value) => {
              setSelectedFilters(toggleValue(selectedFilters, value))
            }}
            onReset={() => setSelectedFilters([])}
          />
        </div>

        <section className='space-y-6'>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5'>
            <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
              <div>
                <p className='text-ink text-lg font-semibold'>
                  {filteredMentors.length} mentor phù hợp
                </p>
                <p className='text-muted mt-1 text-sm'>
                  Ưu tiên hồ sơ đã duyệt, có môn học phù hợp và khung giờ dễ đặt lịch.
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type='button'
                    onClick={() => setActiveSort(option)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeSort === option
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
                <button
                  key={filter}
                  type='button'
                  onClick={() => setSelectedFilters(toggleValue(selectedFilters, filter))}
                  className='rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700'
                >
                  {formatFilterLabel(filter)} ×
                </button>
              ))}
              <button
                type='button'
                onClick={() => setSelectedFilters([])}
                className='inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300'
              >
                <RotateCcw size={12} />
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {filteredMentors.length ? (
            <>
              <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>

              <div className='flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4'>
                <p className='text-muted text-sm'>
                  Danh sách công khai đang hiển thị {filteredMentors.length} mentor đã duyệt phù hợp
                  nhất với tiêu chí hiện tại.
                </p>
                <button
                  type='button'
                  onClick={() => {
                    setKeyword('')
                    setContext('')
                    setSelectedFilters([])
                    setActiveSort('Phù hợp')
                  }}
                  className='text-primary text-sm font-semibold'
                >
                  Đặt lại tìm kiếm
                </button>
              </div>
            </>
          ) : (
            <EmptyState
              actionHref={path.discover}
              actionLabel='Quay lại danh sách mentor'
              description='Thử mở rộng bộ lọc, xóa bớt điều kiện hoặc đổi từ khóa để xem thêm mentor phù hợp.'
              title='Chưa có mentor phù hợp'
            />
          )}
        </section>
      </div>

      {filtersOpen ? (
        <div className='fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden'>
          <div className='mx-auto max-w-sm'>
            <FilterSidebar
              onClose={() => setFiltersOpen(false)}
              selectedValues={selectedFilters}
              onToggleValue={(value) => {
                setSelectedFilters(toggleValue(selectedFilters, value))
              }}
              onReset={() => setSelectedFilters([])}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Discover

function toggleValue(values: string[], nextValue: string) {
  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : [...values, nextValue]
}

function formatFilterLabel(value: string) {
  return value.split(':')[1]?.replaceAll('-', ' ') ?? value
}

function handleQuickTag(
  tag: string,
  setKeyword: (value: string) => void,
  setContext: (value: string) => void
) {
  if (tag === 'Cuối tuần') {
    setKeyword('')
    setContext('Cuối tuần')
    return
  }

  if (tag === 'Hybrid tại Quận 7') {
    setKeyword('')
    setContext('Hybrid tại Quận 7')
    return
  }

  setKeyword(tag)
}

function matchesSearch(mentor: Mentor, keyword: string, context: string) {
  const keywordValue = keyword.trim().toLowerCase()
  const contextValue = context.trim().toLowerCase()

  const keywordHaystack = [
    mentor.name,
    mentor.headline,
    mentor.expertise,
    mentor.introduction,
    mentor.teachingStyle,
    ...mentor.subjects,
    ...mentor.grades,
    ...mentor.offerings.map(
      (offering) => `${offering.subject} ${offering.grade} ${offering.teachingNote}`
    )
  ]
    .join(' ')
    .toLowerCase()

  const contextHaystack = [
    mentor.availabilitySummary,
    ...mentor.meetingTypes,
    ...mentor.grades,
    ...mentor.recurringAvailability.map(
      (window) => `${window.dayLabel} ${window.startTime} ${window.endTime}`
    ),
    ...mentor.specificDateAvailability.map((window) => `${window.dateLabel} ${window.note ?? ''}`)
  ]
    .join(' ')
    .toLowerCase()

  return (
    (!keywordValue || keywordHaystack.includes(keywordValue)) &&
    (!contextValue || contextHaystack.includes(contextValue))
  )
}

function matchesAllFilters(mentor: Mentor, filters: string[]) {
  return filters.every((filter) => matchesSingleFilter(mentor, filter))
}

function matchesSingleFilter(mentor: Mentor, filter: string) {
  const [group, rawValue] = filter.split(':')

  switch (group) {
    case 'subject':
      return mentor.subjects.some((subject) => subject.toLowerCase() === rawValue.toLowerCase())
    case 'grade':
      if (rawValue === 'THPT') {
        return mentor.grades.some((grade) => {
          return grade.includes('Lớp 10') || grade.includes('Lớp 11') || grade.includes('Lớp 12')
        })
      }

      return mentor.grades.some((grade) => grade.toLowerCase() === rawValue.toLowerCase())
    case 'meeting':
      return mentor.meetingTypes.includes(rawValue as Mentor['meetingTypes'][number])
    case 'price':
      return matchesPriceRange(mentor.startingPrice, rawValue)
    case 'availability':
      return matchesAvailability(mentor, rawValue)
    case 'trust':
      return matchesTrust(mentor, rawValue)
    default:
      return true
  }
}

function matchesPriceRange(price: number, range: string) {
  if (range === 'under-250') return price < 250000
  if (range === '250-350') return price >= 250000 && price <= 350000
  if (range === '350-500') return price > 350000 && price <= 500000
  if (range === '500-plus') return price > 500000

  return true
}

function matchesAvailability(mentor: Mentor, availability: string) {
  if (availability === 'evening') {
    return mentor.recurringAvailability.some((window) => window.startTime >= '18:00')
  }

  if (availability === 'weekend') {
    return mentor.recurringAvailability.some((window) => {
      return window.dayLabel.includes('Thứ 7') || window.dayLabel.includes('Chủ nhật')
    })
  }

  if (availability === 'upcoming') {
    return mentor.specificDateAvailability.length > 0
  }

  if (availability === 'fast-response') {
    return mentor.responseTime.includes('1 giờ') || mentor.responseTime.includes('2 giờ')
  }

  return true
}

function matchesTrust(mentor: Mentor, trust: string) {
  if (trust === 'approved') return mentor.approvalStatus === 'APPROVED'
  if (trust === 'verified') return mentor.verificationStatus === 'VERIFIED'
  if (trust === 'rating-4.5') return mentor.rating >= 4.5

  return true
}

function getSortedMentors(results: Mentor[], sort: (typeof sortOptions)[number]) {
  const sortedResults = [...results]

  if (sort === 'Đánh giá') {
    sortedResults.sort((left, right) => right.rating - left.rating)
  } else if (sort === 'Học phí') {
    sortedResults.sort((left, right) => left.startingPrice - right.startingPrice)
  } else if (sort === 'Mới nhất') {
    sortedResults.reverse()
  }

  return sortedResults
}
