import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { Link, useNavigate } from 'react-router'

import { EmptyState } from '@/components/EmptyState'
import MentorCard from '@/components/MentorCard'
import SearchBar from '@/components/SearchBar'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import SectionTitle from '@/components/SectionTitle'
import SubjectCard from '@/components/SubjectCard'
import TestimonialCard from '@/components/TestimonialCard'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { path } from '@/config/path'
import { testimonials } from '@/constants/testimonials'
import { useCatalogOptionsQuery } from '@/hooks/queries/catalog/useCatalogOptionsQuery'
import { useCitiesQuery } from '@/hooks/queries/location/useCitiesQuery'
import { useFeaturedMentorsQuery } from '@/hooks/queries/mentor/useFeaturedMentorsQuery'
import {
  mapCatalogSubjectToHomeCard,
  mapFeaturedMentorToCard
} from '@/routes/home-fesba.presentation'
import { cn } from '@/utils/cn'

const marketplaceStats = [
  { value: '240+', label: 'mentor đã duyệt' },
  { value: '8,500+', label: 'buổi học đã đặt' },
  { value: '40+', label: 'môn học và cấp lớp' }
] as const

const FEATURED_MENTOR_PARAMS = {
  page: 1,
  size: 3,
  sortBy: 'createdAt',
  sortDir: 'desc'
} as const

const trustSteps = [
  {
    title: 'Tìm đúng nhu cầu học',
    description: 'Bắt đầu từ môn học, lớp, mục tiêu và hình thức học phù hợp với học viên.'
  },
  {
    title: 'So sánh mentor rõ ràng',
    description: 'Xem học phí, trạng thái duyệt, đánh giá, cách dạy và lịch rảnh ngay trên hồ sơ.'
  },
  {
    title: 'Đặt buổi học thực tế',
    description: 'Chọn môn học cụ thể, khung giờ phù hợp rồi gửi yêu cầu đặt lịch tới mentor.'
  }
] as const

const decisionSignals = [
  {
    icon: <CheckCircle2 className='h-4 w-4 text-emerald-600' />,
    title: 'Offering theo môn và cấp lớp',
    description: 'Mỗi hồ sơ cho thấy rõ mentor dạy môn nào, cho cấp lớp nào và học phí tương ứng.'
  },
  {
    icon: <Star className='h-4 w-4 text-amber-500' />,
    title: 'Đánh giá bám sát buổi học thật',
    description: 'Phản hồi từ học viên và phụ huynh giúp so sánh độ phù hợp trước khi gửi yêu cầu.'
  },
  {
    icon: <CalendarDays className='h-4 w-4 text-blue-600' />,
    title: 'Khung giờ dễ đối chiếu',
    description: 'Lịch gần nhất và khung giờ lặp lại được giữ gần hành động đặt buổi để giảm mơ hồ.'
  }
] as const

const marketplaceTracks = [
  {
    title: 'Bắt đầu như học viên',
    description:
      'Tìm mentor theo môn học, cấp lớp, mục tiêu và học phí rồi tiếp tục tới hồ sơ chi tiết.',
    href: path.discover,
    action: 'Tìm mentor phù hợp'
  },
  {
    title: 'Bắt đầu như mentor',
    description:
      'Hoàn thiện hồ sơ giảng dạy, khai báo offering và khung giờ để nhận yêu cầu học phù hợp.',
    href: path.mentorPanel.root,
    action: 'Chuẩn bị hồ sơ mentor'
  }
] as const

const Home = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [context, setContext] = useState('')
  const [debouncedContext, setDebouncedContext] = useState('')
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null)
  const [isSearchPending, startSearchTransition] = useTransition()

  const catalogOptionsQuery = useCatalogOptionsQuery()
  const featuredMentorsQuery = useFeaturedMentorsQuery(FEATURED_MENTOR_PARAMS)
  const shouldSearchCities =
    debouncedContext.length >= 2 && (!selectedCityName || selectedCityName !== debouncedContext)
  const citySuggestionsQuery = useCitiesQuery(debouncedContext, shouldSearchCities)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedContext(context.trim())
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [context])

  const subjectCards = useMemo(
    () =>
      (catalogOptionsQuery.data?.subjects ?? [])
        .slice(0, 8)
        .map((subject) => mapCatalogSubjectToHomeCard(subject, catalogOptionsQuery.data!)),
    [catalogOptionsQuery.data]
  )

  const featuredMentorCards = useMemo(
    () => (featuredMentorsQuery.data ?? []).map(mapFeaturedMentorToCard),
    [featuredMentorsQuery.data]
  )

  const citySuggestions = useMemo(
    () =>
      (citySuggestionsQuery.data ?? []).map((city) => ({
        id: String(city.id),
        label: city.name,
        description: `Thành phố · ${city.code}`
      })),
    [citySuggestionsQuery.data]
  )

  const handleContextChange = (value: string) => {
    setContext(value)

    if (selectedCityName && value.trim() !== selectedCityName) {
      setSelectedCityId(null)
      setSelectedCityName(null)
    }
  }

  const handleQuickTagClick = (tag: string) => {
    if (tag === 'Học cuối tuần') {
      setContext('Cuối tuần')
      setSelectedCityId(null)
      setSelectedCityName(null)
      return
    }

    setKeyword(tag)
  }

  const handleCitySuggestionSelect = (suggestion: { id: string; label: string }) => {
    setSelectedCityId(Number(suggestion.id))
    setSelectedCityName(suggestion.label)
    setContext(suggestion.label)
  }

  const handleSubmitSearch = () => {
    const params = new URLSearchParams()
    const trimmedKeyword = keyword.trim()
    const trimmedContext = context.trim()

    if (trimmedKeyword) {
      params.set('search', trimmedKeyword)
    }

    if (selectedCityId) {
      params.set('cityId', String(selectedCityId))
    } else if (trimmedContext) {
      params.set('context', trimmedContext)
    }

    const destination = params.size ? `${path.discover}?${params.toString()}` : path.discover

    startSearchTransition(() => {
      navigate(destination)
    })
  }

  return (
    <div className='flex flex-col gap-16 py-8'>
      <section className='grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className='space-y-6'
        >
          <Badge className='gap-2 rounded-full px-4 py-2' variant='info'>
            <ShieldCheck size={14} />
            Mentor đã duyệt cho từng mục tiêu học tập
          </Badge>
          <div className='space-y-4'>
            <h1 className='text-ink max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl'>
              Tìm mentor phù hợp để học đúng thứ, đúng nhịp và đúng mục tiêu.
            </h1>
            <p className='text-muted max-w-2xl text-base leading-relaxed md:text-lg'>
              Mentor Matching giúp học viên và phụ huynh tìm mentor theo môn học, lớp, hình thức học
              và ngân sách. Mỗi hồ sơ đều thể hiện học phí, đánh giá, cách dạy và trạng thái duyệt
              rõ ràng.
            </p>
          </div>

          <SearchBar
            buttonLabel='Tìm mentor'
            contextPlaceholder='Lớp, khu vực hoặc online/offline'
            contextSuggestions={citySuggestions}
            contextSuggestionsEmptyText='Không tìm thấy thành phố phù hợp với từ khóa này.'
            contextSuggestionsError={
              citySuggestionsQuery.isError && shouldSearchCities
                ? 'Không thể tải gợi ý thành phố lúc này. Vui lòng thử lại.'
                : null
            }
            contextValue={context}
            isContextSuggestionsLoading={citySuggestionsQuery.isLoading && shouldSearchCities}
            isSubmitting={isSearchPending}
            keywordValue={keyword}
            onContextChange={handleContextChange}
            onContextSuggestionSelect={handleCitySuggestionSelect}
            onKeywordChange={setKeyword}
            onQuickTagClick={handleQuickTagClick}
            onSubmit={handleSubmitSearch}
            quickTags={['Toán lớp 9', 'IELTS Foundation', 'Ôn thi lớp 10', 'Học cuối tuần']}
          />

          <div className='flex flex-wrap gap-3'>
            <Link className={cn(buttonVariants({ className: 'rounded-2xl' }))} to={path.discover}>
              Khám phá mentor <ArrowRight size={16} />
            </Link>
            <Link
              className={cn(buttonVariants({ className: 'rounded-2xl', variant: 'outline' }))}
              to={path.mentorPanel.root}
            >
              Trở thành mentor
            </Link>
          </div>

          <div className='grid gap-3 sm:grid-cols-3'>
            {marketplaceStats.map((stat) => (
              <Card key={stat.label} className='rounded-2xl border-slate-200/80 shadow-none'>
                <CardContent className='p-4'>
                  <p className='text-ink text-2xl font-semibold'>{stat.value}</p>
                  <p className='text-muted mt-1 text-sm capitalize'>{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          className='space-y-4'
        >
          <Card className='rounded-[28px] border-slate-200/80 bg-white'>
            <CardContent className='p-6'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <p className='text-ink text-xl font-semibold'>Cách người học ra quyết định</p>
                  <p className='text-muted mt-1 text-sm leading-relaxed'>
                    Marketplace này ưu tiên thông tin đủ dùng để phụ huynh và học viên so sánh nhanh
                    mà không phải đoán phần quan trọng nhất.
                  </p>
                </div>
                <Badge variant='outline'>Tập trung vào so sánh thực tế</Badge>
              </div>

              <div className='mt-5 space-y-3'>
                {decisionSignals.map((signal) => (
                  <div
                    key={signal.title}
                    className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                  >
                    <div className='flex items-center gap-2'>
                      {signal.icon}
                      <p className='text-ink font-semibold'>{signal.title}</p>
                    </div>
                    <p className='text-muted mt-2 text-sm leading-relaxed'>{signal.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='rounded-[28px] border-slate-200/80 bg-slate-50'>
            <CardContent className='p-5'>
              <p className='text-ink text-sm font-semibold tracking-[0.16em] uppercase'>
                Hành trình đặt buổi học
              </p>
              <div className='mt-4 space-y-4'>
                {trustSteps.map((step, index) => (
                  <div key={step.title} className='flex gap-4'>
                    <div className='bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='text-ink font-semibold'>{step.title}</p>
                      <p className='text-muted mt-1 text-sm'>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className='space-y-8'>
        <div className='flex items-end justify-between gap-4'>
          <SectionTitle
            eyebrow='Mentor nổi bật'
            size='md'
            subtitle='Danh sách lấy từ mentor công khai đã sẵn sàng trên hệ thống và đang được sắp xếp theo hồ sơ mới nhất.'
            title='Một số mentor công khai để bắt đầu so sánh'
          />
          <Link
            className={cn(
              buttonVariants({ className: 'hidden rounded-2xl md:inline-flex', variant: 'outline' })
            )}
            to={path.discover}
          >
            Xem tất cả <ArrowUpRight size={16} />
          </Link>
        </div>
        {featuredMentorsQuery.isLoading ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`featured-mentor-skeleton-${index}`}
                className='h-[620px] animate-pulse rounded-3xl border-slate-200 bg-white shadow-sm'
              />
            ))}
          </div>
        ) : featuredMentorsQuery.isError ? (
          <ScreenErrorState
            description='Không thể tải danh sách mentor nổi bật lúc này. Nội dung giới thiệu khác trên trang vẫn khả dụng.'
            onRetry={() => {
              void featuredMentorsQuery.refetch()
            }}
            title='Chưa tải được mentor nổi bật'
          />
        ) : featuredMentorCards.length ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {featuredMentorCards.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <EmptyState
            className='min-h-0'
            description='Khi có mentor công khai phù hợp, khu vực này sẽ hiển thị để bạn bắt đầu so sánh.'
            title='Chưa có mentor nổi bật để hiển thị'
          />
        )}
      </section>

      <section className='space-y-8'>
        <SectionTitle
          eyebrow='Môn học'
          size='md'
          subtitle='Bắt đầu từ nhu cầu học tập thực tế để lọc ra mentor phù hợp nhanh hơn.'
          title='Khám phá theo môn học, cấp lớp và mục tiêu'
        />
        {catalogOptionsQuery.isLoading ? (
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={`subject-skeleton-${index}`}
                className='h-[220px] animate-pulse rounded-[28px] border-slate-200/80 bg-white'
              />
            ))}
          </div>
        ) : catalogOptionsQuery.isError ? (
          <ScreenErrorState
            description='Không thể tải danh mục môn học lúc này. Bạn vẫn có thể tiếp tục khám phá mentor từ các CTA khác trên trang.'
            onRetry={() => {
              void catalogOptionsQuery.refetch()
            }}
            title='Chưa tải được danh mục môn học'
          />
        ) : subjectCards.length ? (
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {subjectCards.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <EmptyState
            className='min-h-0'
            description='Danh mục môn học công khai đang được cập nhật và sẽ hiển thị lại khi có dữ liệu.'
            title='Chưa có môn học để hiển thị'
          />
        )}
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <Card className='rounded-[32px] border-slate-200/80 bg-slate-50'>
          <CardContent className='p-8'>
            <SectionTitle
              eyebrow='Quy trình'
              size='md'
              subtitle='Từng bước được thiết kế để giúp phụ huynh và học viên ra quyết định nhanh nhưng vẫn đủ căn cứ.'
              title='Cách Mentor Matching giữ trải nghiệm đặt lịch thực tế'
            />
            <div className='mt-6 grid gap-4 md:grid-cols-3'>
              {trustSteps.map((step, index) => (
                <Card key={step.title} className='rounded-2xl border-slate-200/80 shadow-none'>
                  <CardContent className='p-5'>
                    <p className='text-primary text-sm font-semibold'>Bước {index + 1}</p>
                    <p className='text-ink mt-2 font-semibold'>{step.title}</p>
                    <p className='text-muted mt-2 text-sm leading-relaxed'>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4'>
          {marketplaceTracks.map((track, index) => (
            <Card key={track.title} className='rounded-[28px] border-slate-200/80 bg-white'>
              <CardContent className='flex h-full flex-col p-6'>
                <Badge className='w-fit' variant={index === 0 ? 'info' : 'outline'}>
                  {index === 0 ? 'Dành cho học viên và phụ huynh' : 'Dành cho mentor'}
                </Badge>
                <h3 className='text-ink mt-4 text-2xl font-semibold'>{track.title}</h3>
                <p className='text-muted mt-3 text-sm leading-relaxed'>{track.description}</p>
                <Separator className='my-5' />
                <div className='flex items-center gap-2 text-sm text-slate-600'>
                  {index === 0 ? (
                    <Users size={16} className='text-primary' />
                  ) : (
                    <ShieldCheck size={16} className='text-primary' />
                  )}
                  {index === 0
                    ? 'So sánh nhanh học phí, đánh giá và khung giờ.'
                    : 'Chỉ mentor đã duyệt mới hiển thị ở khu vực công khai.'}
                </div>
                <Link
                  className={cn(
                    buttonVariants({
                      className: 'mt-6 w-fit rounded-2xl',
                      variant: index === 0 ? 'default' : 'outline'
                    })
                  )}
                  to={track.href}
                >
                  {track.action} <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-8'>
        <SectionTitle
          eyebrow='Phản hồi'
          size='md'
          subtitle='Những nhận xét ngắn nhưng sát với điều người học cần biết trước khi đặt buổi đầu tiên.'
          title='Học viên và phụ huynh đánh giá điều gì'
        />
        <div className='grid gap-6 md:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
