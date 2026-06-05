import { BookOpen, MapPin, Search } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { FormEvent } from 'react'

type SearchBarProps = {
  keywordPlaceholder?: string
  contextPlaceholder?: string
  buttonLabel?: string
  quickTags?: string[]
  helperText?: string
  keywordValue?: string
  contextValue?: string
  onKeywordChange?: (value: string) => void
  onContextChange?: (value: string) => void
  onQuickTagClick?: (tag: string) => void
  onSubmit?: () => void
  className?: string
}

const SearchBar = ({
  keywordPlaceholder = 'Môn học, mentor hoặc mục tiêu học tập',
  contextPlaceholder = 'Lớp, khu vực hoặc hình thức học',
  buttonLabel = 'Tìm mentor',
  quickTags = [],
  helperText = 'Có thể tìm theo môn học, mục tiêu học, lớp hoặc hình thức học mong muốn.',
  keywordValue,
  contextValue,
  onKeywordChange,
  onContextChange,
  onQuickTagClick,
  onSubmit,
  className
}: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <div
      className={twMerge(
        clsx('shadow-soft rounded-3xl border border-slate-200 bg-white p-4 md:p-5', className)
      )}
    >
      <form className='flex flex-col gap-3 xl:flex-row xl:items-end' onSubmit={handleSubmit}>
        <label className='flex flex-1 flex-col gap-2'>
          <span className='text-ink text-xs font-semibold tracking-[0.18em] uppercase'>
            Môn học hoặc mục tiêu
          </span>
          <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
            <Search className='text-muted h-4 w-4' />
            <input
              type='text'
              aria-label='Tìm theo môn học, mentor hoặc mục tiêu học tập'
              placeholder={keywordPlaceholder}
              value={keywordValue}
              onChange={(event) => onKeywordChange?.(event.target.value)}
              className='text-ink w-full bg-transparent text-sm outline-none'
            />
          </div>
        </label>

        <label className='flex flex-1 flex-col gap-2'>
          <span className='text-ink text-xs font-semibold tracking-[0.18em] uppercase'>
            Cấp lớp hoặc bối cảnh học
          </span>
          <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
            <MapPin className='text-muted h-4 w-4' />
            <input
              type='text'
              aria-label='Lớp, khu vực hoặc hình thức học'
              placeholder={contextPlaceholder}
              value={contextValue}
              onChange={(event) => onContextChange?.(event.target.value)}
              className='text-ink w-full bg-transparent text-sm outline-none'
            />
          </div>
        </label>

        <button
          type='submit'
          className='bg-primary shadow-soft rounded-2xl px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 xl:min-w-[140px]'
        >
          {buttonLabel}
        </button>
      </form>

      <div className='mt-3 flex items-start gap-2 text-sm text-slate-600'>
        <BookOpen className='text-primary mt-0.5 h-4 w-4 shrink-0' />
        <p>{helperText}</p>
      </div>

      {quickTags.length > 0 ? (
        <div className='mt-4 flex flex-wrap gap-2'>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type='button'
              onClick={() => onQuickTagClick?.(tag)}
              className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
