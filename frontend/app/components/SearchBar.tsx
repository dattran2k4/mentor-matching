import { BookOpen, MapPin, Search } from 'lucide-react'
import type { FormEvent } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/cn'

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
    <Card className={cn('shadow-soft rounded-[28px] border-slate-200/80 bg-white', className)}>
      <CardContent className='p-4 md:p-5'>
        <form
          className='grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-end'
          onSubmit={handleSubmit}
        >
          <label className='flex flex-col gap-2'>
            <span className='text-ink text-[11px] font-semibold tracking-[0.2em] uppercase'>
              Môn học hoặc mục tiêu
            </span>
            <div className='relative'>
              <Search className='text-muted pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2' />
              <Input
                aria-label='Tìm theo môn học, mentor hoặc mục tiêu học tập'
                className='h-12 bg-slate-50 pr-4 pl-10'
                placeholder={keywordPlaceholder}
                value={keywordValue}
                onChange={(event) => onKeywordChange?.(event.target.value)}
              />
            </div>
          </label>

          <label className='flex flex-col gap-2'>
            <span className='text-ink text-[11px] font-semibold tracking-[0.2em] uppercase'>
              Cấp lớp hoặc bối cảnh học
            </span>
            <div className='relative'>
              <MapPin className='text-muted pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2' />
              <Input
                aria-label='Lớp, khu vực hoặc hình thức học'
                className='h-12 bg-slate-50 pr-4 pl-10'
                placeholder={contextPlaceholder}
                value={contextValue}
                onChange={(event) => onContextChange?.(event.target.value)}
              />
            </div>
          </label>

          <Button className='h-12 xl:min-w-[150px]' size='lg' type='submit'>
            {buttonLabel}
          </Button>
        </form>

        <Separator className='my-4' />

        <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
          <div className='flex max-w-2xl items-start gap-2 text-sm text-slate-600'>
            <BookOpen className='text-primary mt-0.5 h-4 w-4 shrink-0' />
            <p className='leading-relaxed'>{helperText}</p>
          </div>

          {quickTags.length > 0 ? (
            <div className='flex flex-wrap gap-2 lg:justify-end'>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  className={cn(
                    buttonVariants({
                      className:
                        'h-8 rounded-full border-slate-200 bg-slate-50 px-3 text-xs hover:bg-white',
                      size: 'sm',
                      variant: 'outline'
                    })
                  )}
                  type='button'
                  onClick={() => onQuickTagClick?.(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchBar
