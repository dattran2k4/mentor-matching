import { ChevronLeft, ChevronRight, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { type FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { EmptyState } from '@/components/EmptyState'
import {
  AdvancedMentorFiltersDrawer,
  type AdvancedMentorFilterOption
} from '@/components/AdvancedMentorFiltersDrawer'
import type { FilterGroup } from '@/components/FilterSidebar'
import MentorCard from '@/components/MentorCard'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import { Badge } from '@/components/ui/badge'
import { AppSelect } from '@/components/ui/app-select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCatalogOptionsQuery } from '@/hooks/queries/catalog/useCatalogOptionsQuery'
import { useCitiesQuery } from '@/hooks/queries/location/useCitiesQuery'
import { useDistrictsByCityQuery } from '@/hooks/queries/location/useDistrictsByCityQuery'
import { useDiscoverMentorsQuery } from '@/hooks/queries/mentor/useDiscoverMentorsQuery'
import { mapDiscoverMentorToCard } from '@/routes/discover.presentation'
import type { CatalogGradeApiResponse, CatalogOptionsApiResponse } from '@/types/api/catalog'
import type { SortDirection } from '@/types/api/common'
import type { CityApiResponse, DistrictApiResponse } from '@/types/api/location'
import type {
  GetMentorsQueryParams,
  MentorGenderApiResponse,
  MentorListSortByApiParam,
  MentorMeetingTypeApiResponse
} from '@/types/api/mentor'

const DISCOVER_PAGE_SIZE = 9
const meetingTypeOptions: Array<{
  label: string
  value: MentorMeetingTypeApiResponse
  helper: string
}> = [
  { label: 'Online', value: 'ONLINE', helper: 'Học trực tuyến' },
  { label: 'Offline', value: 'OFFLINE', helper: 'Học trực tiếp' },
  { label: 'Hybrid', value: 'HYBRID', helper: 'Kết hợp online và trực tiếp' }
]

const genderOptions: Array<{ label: string; value: MentorGenderApiResponse }> = [
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
  { key: 'relevance', label: 'Được đề xuất', sortBy: null, sortDir: null },
  { key: 'price-asc', label: 'Giá thấp đến cao', sortBy: 'minPrice', sortDir: 'asc' },
  { key: 'newest', label: 'Mới nhất', sortBy: 'createdAt', sortDir: 'desc' }
]

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const search = searchParams.get('search')?.trim() ?? ''
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
  const activeSort = useMemo(() => resolveSortOption(sortBy, sortDir), [sortBy, sortDir])

  const mentorQueryParams = useMemo<GetMentorsQueryParams>(() => {
    const params: GetMentorsQueryParams = { page, size: DISCOVER_PAGE_SIZE }

    if (search) params.search = search
    if (selectedMeetingType) params.meetingType = selectedMeetingType
    if (selectedCityId) params.cityId = selectedCityId
    if (selectedDistrictId) params.districtId = selectedDistrictId
    if (selectedSubjectId) params.subjectId = selectedSubjectId
    if (selectedGradeId) params.gradeId = selectedGradeId
    if (selectedGender) params.gender = selectedGender
    if (activeSort.sortBy && activeSort.sortDir) {
      params.sortBy = activeSort.sortBy
      params.sortDir = activeSort.sortDir
    }

    return params
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
  const mentorCards = useMemo(
    () => (mentorsQuery.data?.data ?? []).map(mapDiscoverMentorToCard),
    [mentorsQuery.data]
  )

  const filterGroups = useMemo<FilterGroup[]>(() => {
    if (!catalogOptionsQuery.data) return []

    return buildFilterGroups({
      catalogOptions: catalogOptionsQuery.data,
      cities,
      districts,
      selectedCityId
    })
  }, [catalogOptionsQuery.data, cities, districts, selectedCityId])

  const filterDetails = useMemo(() => buildFilterDetailMap(filterGroups), [filterGroups])
  const selectedFilterValues = useMemo(
    () =>
      [
        selectedSubjectId ? `subject:${selectedSubjectId}` : null,
        selectedGradeId ? `grade:${selectedGradeId}` : null,
        selectedMeetingType ? `meeting:${selectedMeetingType}` : null,
        selectedCityId ? `city:${selectedCityId}` : null,
        selectedDistrictId ? `district:${selectedDistrictId}` : null,
        selectedGender ? `gender:${selectedGender}` : null
      ].filter((value): value is string => Boolean(value)),
    [
      selectedCityId,
      selectedDistrictId,
      selectedGender,
      selectedGradeId,
      selectedMeetingType,
      selectedSubjectId
    ]
  )
  const selectedAdvancedFilterValues = useMemo(
    () =>
      [
        selectedMeetingType ? `meeting:${selectedMeetingType}` : null,
        selectedDistrictId ? `district:${selectedDistrictId}` : null,
        selectedGender ? `gender:${selectedGender}` : null
      ].filter((value): value is string => Boolean(value)),
    [selectedDistrictId, selectedGender, selectedMeetingType]
  )
  const activeFilterDetails = selectedFilterValues
    .map((value) => filterDetails.get(value))
    .filter((detail): detail is FilterDetail => Boolean(detail))

  const filterMetadataError =
    catalogOptionsQuery.error ??
    citiesQuery.error ??
    (selectedCityId ? districtsQuery.error : null) ??
    null

  const setFilterParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams)

    if (value) nextParams.set(key, value)
    else nextParams.delete(key)

    if (key === 'cityId') nextParams.delete('districtId')
    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleFilterToggle = (value: string) => {
    const [group, rawValue] = value.split(':')
    const paramMap: Record<string, string> = {
      subject: 'subjectId',
      grade: 'gradeId',
      meeting: 'meetingType',
      city: 'cityId',
      district: 'districtId',
      gender: 'gender'
    }
    const key = paramMap[group]
    if (!key) return

    const nextParams = new URLSearchParams(searchParams)
    toggleSingleQueryParam(nextParams, key, rawValue)
    if (group === 'city') nextParams.delete('districtId')
    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextParams = new URLSearchParams(searchParams)
    const formData = new FormData(event.currentTarget)
    const keyword = String(formData.get('search') ?? '').trim()

    if (keyword) nextParams.set('search', keyword)
    else nextParams.delete('search')

    nextParams.delete('page')
    setSearchParams(nextParams)
  }

  const handleAdvancedFiltersApply = (values: string[]) => {
    const nextParams = new URLSearchParams(searchParams)

    nextParams.delete('meetingType')
    nextParams.delete('districtId')
    nextParams.delete('gender')

    values.forEach((value) => {
      const [group, rawValue] = value.split(':')
      if (group === 'meeting') nextParams.set('meetingType', rawValue)
      if (group === 'district' && selectedCityId) nextParams.set('districtId', rawValue)
      if (group === 'gender') nextParams.set('gender', rawValue)
    })

    nextParams.delete('page')
    setSearchParams(nextParams)
    setFiltersOpen(false)
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
    if (nextPage <= 1) nextParams.delete('page')
    else nextParams.set('page', String(nextPage))
    setSearchParams(nextParams)
  }

  const mentorPage = mentorsQuery.data
  const totalItems = mentorPage?.totalItems ?? 0
  const totalPages = Math.max(mentorPage?.totalPages ?? 1, 1)
  const catalog = catalogOptionsQuery.data
  const filtersLoading = catalogOptionsQuery.isLoading || citiesQuery.isLoading

  return (
    <div className='space-y-6'>
      <header>
        <p className='text-muted text-sm font-medium'>
          Khám phá mentor phù hợp với mục tiêu học tập
        </p>
        <h1 className='text-ink mt-1 text-3xl font-bold tracking-tight md:text-4xl'>
          Tìm kiếm Mentor
        </h1>
      </header>

      <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='p-4'>
          <div className='flex flex-col gap-3 xl:flex-row xl:items-center'>
            <div className='grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-wrap'>
              <AppSelect
                ariaLabel='Lọc theo môn học'
                className='sm:w-44'
                disabled={filtersLoading}
                options={(catalog?.subjects ?? []).map((subject) => ({
                  label: subject.name,
                  value: String(subject.id)
                }))}
                placeholder='Môn học'
                value={selectedSubjectId ? String(selectedSubjectId) : ''}
                onValueChange={(value) => setFilterParam('subjectId', value)}
              />

              <AppSelect
                ariaLabel='Lọc theo lớp học'
                className='sm:w-40'
                disabled={filtersLoading}
                options={(catalog?.grades ?? []).map((grade) => ({
                  label: grade.name,
                  value: String(grade.id)
                }))}
                placeholder='Lớp học'
                value={selectedGradeId ? String(selectedGradeId) : ''}
                onValueChange={(value) => setFilterParam('gradeId', value)}
              />

              <AppSelect
                ariaLabel='Lọc theo địa điểm'
                className='sm:w-44'
                disabled={filtersLoading}
                options={cities.map((city) => ({
                  label: city.name,
                  value: String(city.id)
                }))}
                placeholder='Địa điểm'
                value={selectedCityId ? String(selectedCityId) : ''}
                onValueChange={(value) => setFilterParam('cityId', value)}
              />

              <Button
                className='rounded-xl'
                type='button'
                variant='outline'
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Bộ lọc khác
                {selectedAdvancedFilterValues.length ? (
                  <Badge className='ml-1' variant='info'>
                    {selectedAdvancedFilterValues.length}
                  </Badge>
                ) : null}
              </Button>
            </div>

            <form className='relative w-full xl:ml-auto xl:max-w-xs' onSubmit={handleSearchSubmit}>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={17}
              />
              <Input
                key={search}
                aria-label='Tìm kiếm mentor'
                className='h-10 pl-10'
                defaultValue={search}
                name='search'
                placeholder='Tìm kiếm mentor...'
              />
            </form>
          </div>

          {filterMetadataError ? (
            <p className='mt-3 text-sm text-red-600'>
              Chưa thể tải đầy đủ lựa chọn bộ lọc. Bạn vẫn có thể tìm mentor theo từ khóa.
            </p>
          ) : null}

          {search || activeFilterDetails.length ? (
            <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4'>
              {search ? <Badge variant='outline'>Từ khóa: {search}</Badge> : null}
              {activeFilterDetails.map((filter) => (
                <button
                  key={filter.value}
                  className='inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:border-blue-300'
                  type='button'
                  onClick={() => handleFilterToggle(filter.value)}
                >
                  {filter.label}
                  <span aria-hidden='true'>×</span>
                </button>
              ))}
              <Button
                className='ml-auto h-8 rounded-lg px-2 text-xs'
                size='sm'
                type='button'
                variant='ghost'
                onClick={handleResetAll}
              >
                <RotateCcw size={13} />
                Xóa tất cả
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <section className='space-y-5'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-ink text-lg font-semibold'>
              {mentorsQuery.isLoading && !mentorPage
                ? 'Đang tìm mentor phù hợp'
                : `${totalItems} mentor phù hợp`}
            </h2>
            {mentorsQuery.isFetching && mentorPage ? (
              <p className='text-muted mt-1 text-sm'>Đang cập nhật kết quả...</p>
            ) : null}
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted shrink-0 text-sm'>Sắp xếp theo</span>
            <div className='flex flex-wrap rounded-xl border border-slate-200 bg-white p-1'>
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeSort.key === option.key
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  type='button'
                  onClick={() => handleSortChange(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mentorsQuery.isError ? (
          <ScreenErrorState
            description='Không thể tải danh sách mentor lúc này. Vui lòng thử lại.'
            onRetry={() => void mentorsQuery.refetch()}
            retryLabel='Tải lại danh sách'
            title='Danh sách mentor đang bị lỗi'
          />
        ) : mentorsQuery.isLoading && !mentorPage ? (
          <MentorGridSkeleton />
        ) : mentorCards.length ? (
          <>
            <div className='grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {mentorCards.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>

            <div className='flex flex-wrap items-center justify-center gap-3 pt-2'>
              <Button
                aria-label='Trang trước'
                className='rounded-xl'
                disabled={page <= 1}
                type='button'
                variant='outline'
                onClick={() => handlePageChange(page - 1)}
              >
                <ChevronLeft size={16} />
                Trang trước
              </Button>
              <Badge variant='muted'>
                Trang {page} / {totalPages}
              </Badge>
              <Button
                aria-label='Trang sau'
                className='rounded-xl'
                disabled={page >= totalPages}
                type='button'
                variant='outline'
                onClick={() => handlePageChange(page + 1)}
              >
                Trang sau
                <ChevronRight size={16} />
              </Button>
              {page < totalPages - 1 ? (
                <Button
                  className='rounded-xl'
                  type='button'
                  variant='ghost'
                  onClick={() => handlePageChange(totalPages)}
                >
                  Đi tới trang cuối
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <EmptyState
            action={
              <Button className='rounded-full' type='button' onClick={handleResetAll}>
                Xóa bộ lọc và tìm lại
              </Button>
            }
            description='Thử mở rộng bộ lọc hoặc đổi từ khóa để xem thêm mentor phù hợp.'
            title='Chưa có mentor phù hợp'
          />
        )}
      </section>

      {filtersOpen ? (
        <AdvancedMentorFiltersDrawer
          cityName={cities.find((city) => city.id === selectedCityId)?.name}
          districtOptions={districts.map<AdvancedMentorFilterOption>((district) => ({
            label: district.name,
            value: `district:${district.id}`
          }))}
          genderOptions={genderOptions.map<AdvancedMentorFilterOption>((option) => ({
            label: option.label,
            value: `gender:${option.value}`
          }))}
          isDistrictLoading={districtsQuery.isLoading}
          meetingTypeOptions={meetingTypeOptions.map<AdvancedMentorFilterOption>((option) => ({
            helper: option.helper,
            label: option.label,
            value: `meeting:${option.value}`
          }))}
          selectedValues={selectedAdvancedFilterValues}
          onApply={handleAdvancedFiltersApply}
          onClose={() => setFiltersOpen(false)}
        />
      ) : null}
    </div>
  )
}

export default Discover

function MentorGridSkeleton() {
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className='rounded-2xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='space-y-4 p-4'>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 animate-pulse rounded-full bg-slate-200' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-2/3 animate-pulse rounded-full bg-slate-200' />
                <div className='h-3 w-1/3 animate-pulse rounded-full bg-slate-100' />
              </div>
            </div>
            <div className='h-10 animate-pulse rounded-xl bg-slate-100' />
            <div className='h-20 animate-pulse rounded-xl bg-slate-50' />
            <div className='h-24 animate-pulse rounded-xl bg-slate-50' />
            <div className='h-16 animate-pulse rounded-xl bg-slate-50' />
          </CardContent>
        </Card>
      ))}
    </div>
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
        value: `city:${city.id}`
      }))
    }
  ]

  if (selectedCityId) {
    groups.push({
      title: 'Quận / Huyện',
      items: districts.map((district) => ({
        label: district.name,
        value: `district:${district.id}`
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

function formatGradeHelper(grade: CatalogGradeApiResponse) {
  if (grade.levelGroup === 'PRIMARY') return 'Tiểu học'
  if (grade.levelGroup === 'SECONDARY') return 'THCS'
  return 'THPT'
}

function toggleSingleQueryParam(params: URLSearchParams, key: string, value: string) {
  if (params.get(key) === value) params.delete(key)
  else params.set(key, value)
}

function parsePositiveInteger(value: string | null) {
  if (!value) return null
  const parsedValue = Number(value)
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null
}

function parseMeetingType(value: string | null): MentorMeetingTypeApiResponse | null {
  return value === 'ONLINE' || value === 'OFFLINE' || value === 'HYBRID' ? value : null
}

function parseGender(value: string | null): MentorGenderApiResponse | null {
  return value === 'MALE' || value === 'FEMALE' || value === 'OTHER' ? value : null
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
  return value === 'asc' || value === 'desc' ? value : null
}

function resolveSortOption(sortBy: MentorListSortByApiParam | null, sortDir: SortDirection | null) {
  return (
    sortOptions.find((option) => option.sortBy === sortBy && option.sortDir === sortDir) ??
    sortOptions[0]
  )
}
