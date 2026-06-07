import { cn } from '@/utils/cn'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'md' | 'lg'
}

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  size = 'lg'
}: SectionTitleProps) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left'
  const titleClassName =
    size === 'md'
      ? 'text-2xl leading-tight md:text-[2rem]'
      : 'text-3xl leading-tight md:text-[2.75rem]'

  return (
    <div className={cn('flex max-w-3xl flex-col gap-2.5', alignment)}>
      {eyebrow ? (
        <span className='text-primary text-[11px] font-semibold tracking-[0.22em] uppercase'>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={cn('text-ink font-semibold', titleClassName)}>{title}</h2>
      {subtitle ? (
        <p className='text-muted max-w-2xl text-sm leading-relaxed md:text-[15px]'>{subtitle}</p>
      ) : null}
    </div>
  )
}

export default SectionTitle
