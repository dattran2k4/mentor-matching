import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useDeferredValue, useMemo, useState, useTransition } from 'react'
import { useSearchParams } from 'react-router'

import { EmptyState } from '@/components/EmptyState'
import FilterSidebar, { type FilterGroup } from '@/components/FilterSidebar'
import MentorCard from '@/components/MentorCard'
import SearchBar, { type SearchBarSuggestion } from '@/components/SearchBar'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import SectionTitle from '@/components/SectionTitle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { useCatalogOptionsQuery } from '@/hooks/queries/catalog/useCatalogOptionsQuery'
import { useCitiesQuery } from '@/hooks/queries/location/useCitiesQuery'
import { useDistrictsByCityQuery } from '@/hooks/queries/location/useDistrictsByCityQuery'
import { useDiscoverMentorsQuery } from '@/hooks/queries/mentor/useDiscoverMentorsQuery'
import { mapDiscoverMentorToCard } from '@/routes/discover.presentation'
import type { SortDirection } from '@/types/api/common'
import type { CatalogOptionsApiResponse, CatalogGradeApiResponse } from '@/types/api/catalog'
import type { CityApiResponse, DistrictApiResponse } from '@/types/api/location'
import type {
  GetMentorsQueryParams,
  MentorGenderApiResponse,
  MentorListSortByApiParam,
  MentorMeetingTypeApiResponse
} from '@/types/api/mentor'

const DISCOVER_PAGE_SIZE = 9

const quickTags = ['Toán lớp 9', 'Tiếng Anh THPT', 'Cuối tuần', 'Hybrid tại Quận 7'] as const

const meetingTypeOptions: Array<{
  label: string
  value: MentorMeetingTypeApiResponse
  helper: string
}> = [
  { label: 'Online', value: 'ONLINE', helper: 'Phù hợp lịch học linh hoạt' },
  { label: 'Offline', value: 'OFFLINE', helper: 'Ưu tiên gặp trực tiếp' },
  { label: 'Hybrid', value: 'HYBRID', helper: 'Kết hợp online và gặp mặt' }
]

const genderOptions: Array<{
  label: string
  value: MentorGenderApiResponse
}> = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
  { label: 'Khác', value: 'OTHER' }
]

type DiscoverSortOption = {
  key: string
  label: string
  sortBy: MentorListSortByApiParam | null
  sortDir: SortDirection | null
}

const sortOptions: DiscoverSortOption[] = [
  { key: 'relevance', label: 'Phù hợp', sortBy: null, sortDir: null },
  { key: 'price-asc', label: 'Học phí', sortBy: 'minPrice', sortDir: 'asc' },
  { key: 'newest', label: 'Mới nhất', sortBy: 'createdAt', sortDir: 'desc' }
]

const filterParamKeys = ['meetingType', 'cityId', 'districtId', 'subjectId', 'gradeId', 'gender']

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [isSearchPending, startSearchTransition] = useTransition()

  const search = searchParams.get('search')?.trim() ?? ''
  const rawContext = searchParams.get('context')?.trim() ?? ''
  const page = parsePositiveInteger(searchParams.get('page')) ?? 1
  const selectedMeetingType = parseMeetingType(searchParams.get('meetingType'))
  const selectedCityId = parsePositiveInteger(searchParams.get('cityId'))
  const selectedDistrictId = parsePositiveInteger(searchParams.get('districtId'))
  const selectedSubjectId = parsePositiveInteger(searchParams.get('subjectId'))
  const selectedGradeId = parsePositiveInteger(searchParams.get('gradeId'))
  const selectedGender = parseGender(searchParams.get('gender'))
  const sortBy = parseSortBy(searchParams.get('sortBy'))
  const sortDir = parseSortDirection(searchParams.get('sortDir'))

  const catalogOptionsQuery = useCatalogOptionsQuery()
  const citiesQuery = useCitiesQuery('')
  const districtsQuery = useDistrictsByCityQuery(selectedCityId)

  const cities = useMemo(() => citiesQuery.data ?? [], [citiesQuery.data])
  const districts = useMemo(() => districtsQuery.data ?? [], [districtsQuery.data])
  const selectedCity = cities.find((city) => city.id === selectedCityId) ?? null
  const selectedDistrict = districts.find((district) => district.id === selectedDistrictId) ?? null
  const resolvedContextValue = selectedDistrict
    ? formatLocationLabel(selectedDistrict, selectedCity)
    : (selectedCity?.name ?? rawContext)

  const activeSort = useMemo(() => resolveSortOption(sortBy, sortDir), [sortBy, sortDir])

  const mentorQueryParams = useMemo<GetMentorsQueryParams>(() => {
    const nextParams: GetMentorsQueryParams = {
      page,
      size: DISCOVER_PAGE_SIZE
    }

    if (search) nextParams.search = search
    if (selectedMeetingType) nextParams.meetingType = selectedMeetingType
    if (selectedCityId) nextParams.cityId = selectedCityId
    if (selectedDistrictId) nextParams.districtId = selectedDistrictId
    if (selectedSubjectId) nextParams.subjectId = selectedSubjectId
    if (selectedGradeId) nextParams.gradeId = selectedGradeId
    if (selectedGender) nextParams.gender = selectedGender
    if (activeSort.sortBy && activeSort.sortDir) {
      nextParams.sortBy = activeSort.sortBy
      nextParams.sortDir = activeSort.sortDir
    }

    return nextParams
  }, [
    activeSort.sortBy,
    activeSort.sortDir,
    page,
    search,
    selectedCityId,
    selectedDistrictId,
    selectedGender,
    selectedGradeId,
    selectedMeetingType,
    selectedSubjectId
  ])

  const mentorsQuery = useDiscoverMentorsQuery(mentorQueryParams)

  const filterGroups = useMemo<FilterGroup[]>(() => {
    if (!catalogOptionsQuery.data) return []

    return buildFilterGroups({
      catalogOptions: catalogOptionsQuery.data,
      cities,
      districts,
      selectedCityId
    })
  }, [catalogOptionsQuery.data, cities, districts, selectedCityId])

  const filterDetails = useMemo(() => {
    return buildFilterDetailMap(filterGroups)
  }, [filterGroups])

  const selectedFilterValues = useMemo(() => {
    const values: string[] = []

    if (selectedSubjectId) values.push(`subject:${selectedSubjectId}`)
    if (selectedGradeId) values.push(`grade:${selectedGradeId}`)
    if (selectedMeetingType) values.push(`meeting:${selectedMeetingType}`)
    if (selectedCityId) values.push(`city:${selectedCityId}`)
    if (selectedDistrictId) values.push(`district:${selectedDistrictId}`)
    if (selectedGender) values.push(`gender:${selectedGender}`)

    return values
  }, [
    selectedCityId,
    selectedDistrictId,
    selectedGender,
    selectedGradeId,
    selectedMeetingType,
    selectedSubjectId
  ])

  const mentorCards = useMemo(
    () => (mentorsQuery.data?.data ?? []).map(mapDiscoverMentorToCard),
    [mentorsQuery.data]
  )

  const activeSearchContext = [
    search,
    rawContext && !selectedCityId && !selectedDistrictId ? rawContext : null
  ].filter((value): value is string => Boolean(value))

  const activeFilterDetails = selectedFilterValues
    .map((value) => filterDetails.get(value))
    .filter((detail): detail is FilterDetail => Boolean(detail))

  const filterMetadataError =
    catalogOptionsQuery.error ??
    citiesQuery.error ??
    (selectedCityId ? districtsQuery.error : null) ??
    null

  const handleFilterToggle = (value: string) => {
    const [group, rawValue] = value.split(':')
    const nextParams = new URLSearchParams(searchParams)

    if (group === 'subject') {
      toggleSingleQueryParam(nextParams, 'subjectId', rawValue)
    } else if (group === 'grade') {
      toggleSingleQueryParam(nextParams, 'gradeId', rawValue)
    } else if (group === 'meeting') {
      toggleSingleQueryParam(nextParams, 'meetingType', rawValue)
    } else if (group === 'gender') {
      toggleSingleQueryParam(nextParams, 'gender', rawValue)
    } else if (group === 'city') {
      toggleSingleQueryParam(nextParams, 'cityId', rawValue)
      nextParams.delete('districtId')
      nextParams.delete('context')
    } else if (group === 'district') {
      toggleSingleQueryParam(nextParams, 'districtId', rawValue)
      nextParams.delete('context')
    }

    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleSearchSubmit = (keywordDraft: string, contextDraft: string) => {
    const nextParams = new URLSearchParams(searchParams)
    const trimmedKeyword = keywordDraft.trim()
    const trimmedContext = contextDraft.trim()
    const isSameResolvedContext =
      normalizeText(trimmedContext) === normalizeText(resolvedContextValue) &&
      Boolean(trimmedContext.length)

    if (trimmedKeyword) {
      nextParams.set('search', trimmedKeyword)
    } else {
      nextParams.delete('search')
    }

    if (!trimmedContext) {
      nextParams.delete('context')
      nextParams.delete('cityId')
      nextParams.delete('districtId')
    } else if (isSameResolvedContext && (selectedCityId || selectedDistrictId)) {
      nextParams.delete('context')
    } else {
      const matchedDistrict =
        selectedCityId && districts.length ? findMatchingDistrict(districts, trimmedContext) : null
      const matchedCity = findMatchingCity(cities, trimmedContext)

      if (matchedDistrict && selectedCityId) {
        nextParams.set('cityId', String(selectedCityId))
        nextParams.set('districtId', String(matchedDistrict.id))
        nextParams.delete('context')
      } else if (matchedCity) {
        nextParams.set('cityId', String(matchedCity.id))
        nextParams.delete('districtId')
        nextParams.delete('context')
      } else {
        nextParams.set('context', trimmedContext)
        nextParams.delete('cityId')
        nextParams.delete('districtId')
      }
    }

    nextParams.delete('page')

    startSearchTransition(() => {
      setSearchParams(nextParams)
    })
  }

  const handleContextSuggestionSelect = (suggestion: SearchBarSuggestion) => {
    const nextParams = new URLSearchParams(searchParams)

    nextParams.set('cityId', suggestion.id)
    nextParams.delete('districtId')
    nextParams.delete('context')
    nextParams.delete('page')

    setSearchParams(nextParams)
  }

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams(searchParams)

    filterParamKeys.forEach((key) => nextParams.delete(key))
    nextParams.delete('context')
    nextParams.delete('page')

    setSearchParams(nextParams)
  }

  const handleResetAll = () => {
    setSearchParams(new URLSearchParams())
  }

  const handleSortChange = (sortKey: string) => {
    const nextSort = sortOptions.find((option) => option.key === sortKey) ?? sortOptions[0]
    const nextParams = new URLSearchParams(searchParams)

    if (nextSort.sortBy && nextSort.sortDir) {
      nextParams.set('sortBy', nextSort.sortBy)
      nextParams.set('sortDir', nextSort.sortDir)
    } else {
      nextParams.delete('sortBy')
      nextParams.delete('sortDir')
    }

    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams)

    if (nextPage <= 1) {
      nextParams.delete('page')
    } else {
      nextParams.set('page', String(nextPage))
    }

    setSearchParams(nextParams)
  }

  const mentorPage = mentorsQuery.data
  const totalItems = mentorPage?.totalItems ?? 0
  const currentPageSize = mentorPage?.data.length ?? 0
  const totalPages = mentorPage?.totalPages ?? 1

  return (
    <div className='flex flex-col gap-6 py-6 md:gap-8'>
      <section className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start'>
        <Card className='rounded-3xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='p-6 md:p-8'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <SectionTitle
                eyebrow='Khám phá mentor'
                size='md'
                subtitle='Danh sách và bộ lọc hiện đồng bộ trực tiếp với catalog, location và contract tìm mentor hiện có từ backend.'
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
                Màn hình hiện hỗ trợ filter thật theo môn học, cấp lớp, khu vực, hình thức học và
                giới tính. Các tiêu chí nâng cao như rating hoặc availability sẽ mở sau khi backend
                public hỗ trợ.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-3'>
              <Metric label='Kết quả' value={String(totalItems)} />
              <Metric
                label='Môn học'
                value={String(catalogOptionsQuery.data?.subjects.length ?? 0)}
              />
              <Metric label='Thành phố' value={String(cities.length)} />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <DiscoverSearchSection
          key={`${search}|${resolvedContextValue}`}
          contextValue={resolvedContextValue}
          initialKeyword={search}
          isSubmitting={isSearchPending}
          onContextSuggestionSelect={handleContextSuggestionSelect}
          onSubmit={handleSearchSubmit}
          quickTags={[...quickTags]}
        />
      </section>

      <div className='grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]'>
        <aside className='hidden lg:block'>
          <div className='sticky top-24'>
            {filterMetadataError ? (
              <ScreenErrorState
                description='Không thể tải dữ liệu bộ lọc từ catalog hoặc location lúc này.'
                onRetry={() => {
                  void catalogOptionsQuery.refetch()
                  void citiesQuery.refetch()

                  if (selectedCityId) {
                    void districtsQuery.refetch()
                  }
                }}
                retryLabel='Tải lại bộ lọc'
                title='Bộ lọc chưa sẵn sàng'
              />
            ) : !catalogOptionsQuery.data || citiesQuery.isLoading ? (
              <FilterSidebarSkeleton />
            ) : (
              <FilterSidebar
                groups={filterGroups}
                onReset={handleResetFilters}
                onToggleValue={handleFilterToggle}
                selectedValues={selectedFilterValues}
              />
            )}
          </div>
        </aside>

        <section className='space-y-6'>
          <Card className='rounded-3xl border-slate-200 bg-white shadow-sm'>
            <CardContent className='space-y-5 p-5 md:p-6'>
              <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                <div>
                  <p className='text-ink text-lg font-semibold'>
                    {mentorsQuery.isLoading && !mentorPage
                      ? 'Đang tải mentor phù hợp'
                      : `${totalItems} mentor phù hợp`}
                  </p>
                  <p className='text-muted mt-1 text-sm'>
                    Kết quả đang phản ánh trực tiếp các query params hiện có của backend thay vì lọc
                    từ mock ở client.
                  </p>
                </div>

                <div className='flex items-center gap-3 lg:min-w-[250px] lg:justify-end'>
                  <Badge className='hidden gap-1.5 lg:inline-flex' variant='muted'>
                    <SlidersHorizontal size={13} />
                    {selectedFilterValues.length} bộ lọc
                  </Badge>
                  <label className='flex w-full items-center gap-2 lg:max-w-[220px]'>
                    <span className='text-muted shrink-0 text-sm font-medium'>Sắp xếp</span>
                    <Select
                      aria-label='Sắp xếp mentor'
                      className='h-10 rounded-xl'
                      value={activeSort.key}
                      onChange={(event) => handleSortChange(event.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
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
                          onClick={handleResetFilters}
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
                            onClick={() => handleFilterToggle(filter.value)}
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
                <div className='grid gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm'>
                  <div className='flex flex-wrap items-center gap-2 text-slate-600'>
                    <Badge variant='muted'>Đang hỗ trợ</Badge>
                    {[
                      'Theo môn học',
                      'Theo cấp lớp',
                      'Theo khu vực',
                      'Theo hình thức học',
                      'Theo giới tính'
                    ].map((hint) => (
                      <span
                        key={hint}
                        className='rounded-full bg-white px-3 py-1 text-xs font-medium'
                      >
                        {hint}
                      </span>
                    ))}
                  </div>
                  <div className='flex flex-wrap items-center gap-2 text-slate-500'>
                    <Badge variant='outline'>Sắp hỗ trợ</Badge>
                    {['Đánh giá', 'Khung giờ', 'Phản hồi nhanh', 'Khoảng học phí'].map((hint) => (
                      <span
                        key={hint}
                        className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium'
                      >
                        {hint}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mentorsQuery.isFetching && mentorPage ? (
                <p className='text-muted text-sm'>Đang cập nhật kết quả theo bộ lọc mới...</p>
              ) : null}
            </CardContent>
          </Card>

          {mentorsQuery.isError ? (
            <ScreenErrorState
              description='Không thể tải danh sách mentor từ API lúc này. Vui lòng thử lại.'
              onRetry={() => void mentorsQuery.refetch()}
              retryLabel='Tải lại danh sách'
              title='Danh sách mentor đang bị lỗi'
            />
          ) : mentorsQuery.isLoading && !mentorPage ? (
            <MentorGridSkeleton />
          ) : mentorCards.length ? (
            <>
              <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
                {mentorCards.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>

              <div className='flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4 text-sm md:flex-row md:items-center md:justify-between'>
                <p className='text-muted'>
                  Đang hiển thị {currentPageSize} / {totalItems} mentor công khai cho trang {page}.
                </p>
                <div className='flex flex-wrap items-center gap-3'>
                  {totalPages > 1 ? (
                    <>
                      <Button
                        className='rounded-xl'
                        disabled={page <= 1}
                        type='button'
                        variant='outline'
                        onClick={() => handlePageChange(page - 1)}
                      >
                        Trang trước
                      </Button>
                      <Badge variant='muted'>
                        Trang {page}/{totalPages}
                      </Badge>
                      <Button
                        className='rounded-xl'
                        disabled={page >= totalPages}
                        type='button'
                        variant='outline'
                        onClick={() => handlePageChange(page + 1)}
                      >
                        Trang sau
                      </Button>
                    </>
                  ) : null}
                  <Button
                    className='rounded-xl'
                    type='button'
                    variant='outline'
                    onClick={handleResetAll}
                  >
                    Đặt lại tìm kiếm
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              action={
                <Button className='rounded-full' type='button' onClick={handleResetAll}>
                  Xóa bộ lọc và tìm lại
                </Button>
              }
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
              {filterMetadataError ? (
                <ScreenErrorState
                  description='Không thể tải dữ liệu bộ lọc từ catalog hoặc location lúc này.'
                  onRetry={() => {
                    void catalogOptionsQuery.refetch()
                    void citiesQuery.refetch()

                    if (selectedCityId) {
                      void districtsQuery.refetch()
                    }
                  }}
                  retryLabel='Tải lại bộ lọc'
                  title='Bộ lọc chưa sẵn sàng'
                />
              ) : !catalogOptionsQuery.data || citiesQuery.isLoading ? (
                <FilterSidebarSkeleton />
              ) : (
                <FilterSidebar
                  groups={filterGroups}
                  onApply={() => setFiltersOpen(false)}
                  onClose={() => setFiltersOpen(false)}
                  onReset={handleResetFilters}
                  onToggleValue={handleFilterToggle}
                  selectedValues={selectedFilterValues}
                />
              )}
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

function FilterSidebarSkeleton() {
  return (
    <Card className='rounded-3xl border-slate-200 bg-white shadow-sm'>
      <CardContent className='space-y-5 p-5'>
        <div className='space-y-3'>
          <div className='h-5 w-24 animate-pulse rounded-full bg-slate-200' />
          <div className='h-6 w-44 animate-pulse rounded-full bg-slate-200' />
          <div className='h-4 w-full animate-pulse rounded-full bg-slate-100' />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='space-y-3'>
            <div className='h-4 w-20 animate-pulse rounded-full bg-slate-200' />
            <div className='space-y-2'>
              {Array.from({ length: 3 }).map((__, itemIndex) => (
                <div
                  key={itemIndex}
                  className='h-16 animate-pulse rounded-2xl border border-slate-100 bg-slate-50'
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function MentorGridSkeleton() {
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className='rounded-3xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='space-y-4 p-5'>
            <div className='flex items-start gap-4'>
              <div className='h-14 w-14 animate-pulse rounded-2xl bg-slate-200' />
              <div className='flex-1 space-y-2'>
                <div className='h-5 w-2/3 animate-pulse rounded-full bg-slate-200' />
                <div className='h-4 w-full animate-pulse rounded-full bg-slate-100' />
                <div className='h-4 w-5/6 animate-pulse rounded-full bg-slate-100' />
              </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              {Array.from({ length: 4 }).map((__, chipIndex) => (
                <div key={chipIndex} className='h-7 w-20 animate-pulse rounded-full bg-slate-100' />
              ))}
            </div>
            <div className='grid gap-3 sm:grid-cols-3'>
              {Array.from({ length: 3 }).map((__, metricIndex) => (
                <div
                  key={metricIndex}
                  className='h-20 animate-pulse rounded-2xl border border-slate-100 bg-slate-50'
                />
              ))}
            </div>
            <div className='h-28 animate-pulse rounded-2xl bg-slate-50' />
            <div className='h-28 animate-pulse rounded-2xl bg-slate-50' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DiscoverSearchSection({
  contextValue,
  initialKeyword,
  isSubmitting,
  onContextSuggestionSelect,
  onSubmit,
  quickTags
}: {
  contextValue: string
  initialKeyword: string
  isSubmitting: boolean
  onContextSuggestionSelect: (suggestion: SearchBarSuggestion) => void
  onSubmit: (keyword: string, context: string) => void
  quickTags: string[]
}) {
  const [keywordDraft, setKeywordDraft] = useState(initialKeyword)
  const [contextDraft, setContextDraft] = useState(contextValue)
  const deferredContext = useDeferredValue(contextDraft.trim())
  const shouldSearchCities =
    deferredContext.length >= 2 && normalizeText(deferredContext) !== normalizeText(contextValue)
  const citySuggestionsQuery = useCitiesQuery(deferredContext, shouldSearchCities)

  const contextSuggestions = useMemo<SearchBarSuggestion[]>(
    () =>
      (citySuggestionsQuery.data ?? []).map((city) => ({
        id: String(city.id),
        label: city.name,
        description: `Thành phố · ${city.code}`
      })),
    [citySuggestionsQuery.data]
  )

  return (
    <SearchBar
      buttonLabel='Tìm kết quả'
      className='rounded-3xl border-slate-200 shadow-sm'
      contextPlaceholder='Thành phố hoặc quận/huyện nếu đã chọn thành phố'
      contextSuggestions={contextSuggestions}
      contextSuggestionsError={
        citySuggestionsQuery.isError ? 'Không tải được gợi ý thành phố lúc này.' : null
      }
      helperText='Từ khóa sẽ map vào API search. Ô bối cảnh chỉ map vào API khi nhận diện được thành phố hoặc quận/huyện hợp lệ.'
      isContextSuggestionsLoading={citySuggestionsQuery.isLoading}
      isSubmitting={isSubmitting}
      keywordValue={keywordDraft}
      contextValue={contextDraft}
      onContextChange={setContextDraft}
      onContextSuggestionSelect={(suggestion) => {
        setContextDraft(suggestion.label)
        onContextSuggestionSelect(suggestion)
      }}
      onKeywordChange={setKeywordDraft}
      onQuickTagClick={(tag) => handleQuickTag(tag, setKeywordDraft, setContextDraft)}
      onSubmit={() => onSubmit(keywordDraft, contextDraft)}
      quickTags={quickTags}
    />
  )
}

type FilterDetail = {
  group: string
  label: string
  value: string
}

function buildFilterDetailMap(groups: FilterGroup[]) {
  const detailMap = new Map<string, FilterDetail>()

  groups.forEach((group) => {
    group.items.forEach((item) => {
      detailMap.set(item.value, {
        group: group.title,
        label: item.label,
        value: item.value
      })
    })
  })

  return detailMap
}

function buildFilterGroups({
  catalogOptions,
  cities,
  districts,
  selectedCityId
}: {
  catalogOptions: CatalogOptionsApiResponse
  cities: CityApiResponse[]
  districts: DistrictApiResponse[]
  selectedCityId: number | null
}): FilterGroup[] {
  const groups: FilterGroup[] = [
    {
      title: 'Môn học',
      items: catalogOptions.subjects.map((subject) => ({
        label: subject.name,
        value: `subject:${subject.id}`,
        helper: subject.description || undefined
      }))
    },
    {
      title: 'Cấp lớp',
      items: catalogOptions.grades.map((grade) => ({
        label: grade.name,
        value: `grade:${grade.id}`,
        helper: formatGradeHelper(grade)
      }))
    },
    {
      title: 'Hình thức học',
      items: meetingTypeOptions.map((option) => ({
        label: option.label,
        value: `meeting:${option.value}`,
        helper: option.helper
      }))
    },
    {
      title: 'Thành phố',
      items: cities.map((city) => ({
        label: city.name,
        value: `city:${city.id}`,
        helper: city.code
      }))
    }
  ]

  if (selectedCityId) {
    groups.push({
      title: 'Quận / Huyện',
      items: districts.map((district) => ({
        label: district.name,
        value: `district:${district.id}`,
        helper: district.code
      }))
    })
  }

  groups.push({
    title: 'Giới tính',
    items: genderOptions.map((option) => ({
      label: option.label,
      value: `gender:${option.value}`
    }))
  })

  return groups
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

function formatGradeHelper(grade: CatalogGradeApiResponse) {
  if (grade.levelGroup === 'PRIMARY') return 'Tiểu học'
  if (grade.levelGroup === 'SECONDARY') return 'THCS'
  return 'THPT'
}

function toggleSingleQueryParam(params: URLSearchParams, key: string, value: string) {
  if (params.get(key) === value) {
    params.delete(key)
    return
  }

  params.set(key, value)
}

function parsePositiveInteger(value: string | null) {
  if (!value) return null

  const parsedValue = Number(value)

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null
}

function parseMeetingType(value: string | null): MentorMeetingTypeApiResponse | null {
  if (value === 'ONLINE' || value === 'OFFLINE' || value === 'HYBRID') {
    return value
  }

  return null
}

function parseGender(value: string | null): MentorGenderApiResponse | null {
  if (value === 'MALE' || value === 'FEMALE' || value === 'OTHER') {
    return value
  }

  return null
}

function parseSortBy(value: string | null): MentorListSortByApiParam | null {
  if (
    value === 'id' ||
    value === 'fullName' ||
    value === 'gender' ||
    value === 'experienceYears' ||
    value === 'meetingType' ||
    value === 'createdAt' ||
    value === 'minPrice'
  ) {
    return value
  }

  return null
}

function parseSortDirection(value: string | null): SortDirection | null {
  if (value === 'asc' || value === 'desc') {
    return value
  }

  return null
}

function resolveSortOption(sortBy: MentorListSortByApiParam | null, sortDir: SortDirection | null) {
  return (
    sortOptions.find((option) => option.sortBy === sortBy && option.sortDir === sortDir) ??
    sortOptions[0]
  )
}

function findMatchingCity(cities: CityApiResponse[], input: string) {
  const normalizedInput = normalizeText(input)

  return (
    cities.find((city) => normalizeText(city.name) === normalizedInput) ??
    cities.find((city) => normalizeText(city.code) === normalizedInput) ??
    null
  )
}

function findMatchingDistrict(districts: DistrictApiResponse[], input: string) {
  const normalizedInput = normalizeText(input)

  return (
    districts.find((district) => normalizeText(district.name) === normalizedInput) ??
    districts.find((district) => normalizeText(district.code) === normalizedInput) ??
    null
  )
}

function formatLocationLabel(district: DistrictApiResponse, city: CityApiResponse | null) {
  return [district.name, city?.name].filter(Boolean).join(', ')
}

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}
