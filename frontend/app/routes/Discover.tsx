import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

import { EmptyState } from '@/components/EmptyState'
import FilterSidebar, { defaultFilterGroups } from '@/components/FilterSidebar'
import MentorCard from '@/components/MentorCard'
import SearchBar from '@/components/SearchBar'
import SectionTitle from '@/components/SectionTitle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { mentors } from '@/constants/mentors'
import { path } from '@/config/path'
import type { Mentor } from '@/types/models/mentor'

const sortOptions = ['Phù hợp', 'Đánh giá', 'Học phí', 'Mới nhất'] as const
const publicMentors = mentors.filter((mentor) => mentor.approvalStatus === 'APPROVED')

const Discover = () => {
  const [searchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [keyword, setKeyword] = useState(() => searchParams.get('search') ?? '')
  const [context, setContext] = useState(() => searchParams.get('context') ?? '')
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
  const activeSearchContext = [keyword.trim(), context.trim()].filter(Boolean)
  const activeFilterDetails = selectedFilters
    .map((value) => getFilterDetail(value))
    .filter((detail): detail is FilterDetail => Boolean(detail))

  return (
    <div className='flex flex-col gap-6 py-6 md:gap-8'>
      <section className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start'>
        <Card className='rounded-3xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='p-6 md:p-8'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <SectionTitle
                eyebrow='Khám phá mentor'
                size='md'
                subtitle='Lọc theo môn học, lớp, lịch học, hình thức học và tín nhiệm để so sánh mentor phù hợp một cách nhanh và rõ.'
                title='Tìm mentor'
              />
              <Button
                className='rounded-xl md:hidden'
                onClick={() => setFiltersOpen(true)}
                type='button'
                variant='outline'
              >
                <Filter size={16} /> Bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-3xl border-slate-200 bg-slate-50 shadow-none'>
          <CardContent className='grid gap-4 p-6'>
            <div>
              <p className='text-muted text-[11px] font-semibold tracking-[0.18em] uppercase'>
                Tín hiệu nhanh
              </p>
              <p className='text-ink mt-2 text-sm leading-relaxed'>
                Danh sách công khai ưu tiên hồ sơ đã duyệt, có môn học rõ và lịch học dễ đặt.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-3'>
              <Metric label='Đã duyệt' value={String(publicMentors.length)} />
              <Metric
                label='Đã xác minh'
                value={String(
                  publicMentors.filter((mentor) => mentor.verificationStatus === 'VERIFIED').length
                )}
              />
              <Metric
                label='Có slot gần'
                value={String(
                  publicMentors.filter((mentor) => mentor.specificDateAvailability.length > 0)
                    .length
                )}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <SearchBar
          buttonLabel='Tìm kết quả'
          className='rounded-3xl border-slate-200 shadow-sm'
          contextPlaceholder='Lớp, khu vực hoặc thời gian muốn học'
          helperText='Tìm theo môn học, cấp lớp, lịch học mong muốn hoặc bối cảnh như online, cuối tuần, luyện thi.'
          keywordValue={keyword}
          contextValue={context}
          onKeywordChange={setKeyword}
          onContextChange={setContext}
          onQuickTagClick={(tag) => handleQuickTag(tag, setKeyword, setContext)}
          quickTags={['Toán lớp 9', 'Tiếng Anh THPT', 'Cuối tuần', 'Hybrid tại Quận 7']}
        />
      </section>

      <div className='grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]'>
        <aside className='hidden lg:block'>
          <div className='sticky top-24'>
            <FilterSidebar
              onReset={() => setSelectedFilters([])}
              onToggleValue={(value) => {
                setSelectedFilters(toggleValue(selectedFilters, value))
              }}
              selectedValues={selectedFilters}
            />
          </div>
        </aside>

        <section className='space-y-6'>
          <Card className='rounded-3xl border-slate-200 bg-white shadow-sm'>
            <CardContent className='space-y-5 p-5 md:p-6'>
              <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                <div>
                  <p className='text-ink text-lg font-semibold'>
                    {filteredMentors.length} mentor phù hợp
                  </p>
                  <p className='text-muted mt-1 text-sm'>
                    Ưu tiên hồ sơ đã duyệt, có môn học phù hợp và khung giờ dễ đặt lịch để bạn so
                    sánh nhanh.
                  </p>
                </div>

                <div className='flex items-center gap-3 lg:min-w-[250px] lg:justify-end'>
                  <Badge className='hidden gap-1.5 lg:inline-flex' variant='muted'>
                    <SlidersHorizontal size={13} />
                    {selectedFilters.length} bộ lọc
                  </Badge>
                  <label className='flex w-full items-center gap-2 lg:max-w-[220px]'>
                    <span className='text-muted shrink-0 text-sm font-medium'>Sắp xếp</span>
                    <Select
                      aria-label='Sắp xếp mentor'
                      className='h-10 rounded-xl'
                      value={activeSort}
                      onChange={(event) =>
                        setActiveSort(event.target.value as (typeof sortOptions)[number])
                      }
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </label>
                </div>
              </div>

              {activeSearchContext.length || activeFilterDetails.length ? (
                <div className='grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                  {activeSearchContext.length ? (
                    <div className='space-y-2'>
                      <p className='text-muted text-xs font-semibold tracking-[0.16em] uppercase'>
                        Từ khóa đang dùng
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {activeSearchContext.map((item) => (
                          <Badge key={item} variant='outline'>
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {activeFilterDetails.length ? (
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between gap-3'>
                        <p className='text-muted text-xs font-semibold tracking-[0.16em] uppercase'>
                          Bộ lọc đã chọn
                        </p>
                        <Button
                          className='rounded-xl'
                          size='sm'
                          type='button'
                          onClick={() => setSelectedFilters([])}
                          variant='ghost'
                        >
                          <RotateCcw size={12} />
                          Xóa bộ lọc
                        </Button>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {activeFilterDetails.map((filter) => (
                          <button
                            key={filter.value}
                            type='button'
                            onClick={() =>
                              setSelectedFilters(toggleValue(selectedFilters, filter.value))
                            }
                            className='inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-300'
                          >
                            <span className='text-blue-500'>{filter.group}</span>
                            <span>{filter.label}</span>
                            <span aria-hidden='true'>×</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className='flex flex-wrap items-center gap-2 text-sm text-slate-600'>
                  <Badge variant='muted'>Gợi ý bắt đầu</Badge>
                  {['Theo môn học', 'Theo khung giờ', 'Theo tín nhiệm', 'Theo học phí'].map(
                    (hint) => (
                      <span
                        key={hint}
                        className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium'
                      >
                        {hint}
                      </span>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {filteredMentors.length ? (
            <>
              <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>

              <div className='flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4 text-sm md:flex-row md:items-center md:justify-between'>
                <p className='text-muted'>
                  Đang hiển thị {filteredMentors.length} mentor công khai phù hợp nhất với tiêu chí
                  hiện tại.
                </p>
                <Button
                  className='rounded-xl'
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setKeyword('')
                    setContext('')
                    setSelectedFilters([])
                    setActiveSort('Phù hợp')
                  }}
                >
                  Đặt lại tìm kiếm
                </Button>
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
        <div className='fixed inset-0 z-50 bg-slate-950/45 p-4 backdrop-blur-[2px] lg:hidden'>
          <div className='mx-auto flex max-h-[calc(100vh-2rem)] max-w-sm items-stretch'>
            <div className='w-full overflow-y-auto'>
              <FilterSidebar
                onApply={() => setFiltersOpen(false)}
                onClose={() => setFiltersOpen(false)}
                onReset={() => setSelectedFilters([])}
                onToggleValue={(value) => {
                  setSelectedFilters(toggleValue(selectedFilters, value))
                }}
                selectedValues={selectedFilters}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Discover

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3'>
      <p className='text-ink text-lg font-semibold'>{value}</p>
      <p className='text-muted mt-1 text-xs'>{label}</p>
    </div>
  )
}

type FilterDetail = {
  group: string
  label: string
  value: string
}

function getFilterDetail(value: string): FilterDetail | null {
  for (const group of defaultFilterGroups) {
    const item = group.items.find((option) => option.value === value)

    if (item) {
      return {
        group: group.title,
        label: item.label,
        value: item.value
      }
    }
  }

  return null
}

function toggleValue(values: string[], nextValue: string) {
  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : [...values, nextValue]
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
