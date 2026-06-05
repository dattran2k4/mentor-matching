import { MapPin, Search } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type SearchBarProps = {
  keywordPlaceholder?: string
  contextPlaceholder?: string
  buttonLabel?: string
  quickTags?: string[]
  className?: string
}

const SearchBar = ({
  keywordPlaceholder = 'Môn học, mentor hoặc mục tiêu học tập',
  contextPlaceholder = 'Lớp, khu vực hoặc hình thức học',
  buttonLabel = 'Tìm mentor',
  quickTags = [],
  className
}: SearchBarProps) => {
  return (
    <div
      className={twMerge(
        clsx('shadow-soft rounded-3xl border border-slate-200 bg-white p-4', className)
      )}
    >
      <div className='flex flex-col gap-3 md:flex-row md:items-center'>
        <div className='flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
          <Search className='text-muted h-4 w-4' />
          <input
            type='text'
            aria-label='Tìm theo môn học, mentor hoặc mục tiêu học tập'
            placeholder={keywordPlaceholder}
            className='text-ink w-full bg-transparent text-sm outline-none'
          />
        </div>
        <div className='flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
          <MapPin className='text-muted h-4 w-4' />
          <input
            type='text'
            aria-label='Lớp, khu vực hoặc hình thức học'
            placeholder={contextPlaceholder}
            className='text-ink w-full bg-transparent text-sm outline-none'
          />
        </div>
        <button className='bg-primary shadow-soft rounded-2xl px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5'>
          {buttonLabel}
        </button>
      </div>
      {quickTags.length > 0 ? (
        <div className='mt-4 flex flex-wrap gap-2'>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type='button'
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
