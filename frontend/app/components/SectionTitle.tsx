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
  const titleClassName = size === 'md' ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow ? (
        <span className='text-primary text-xs font-semibold tracking-[0.3em] uppercase'>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-ink font-semibold ${titleClassName}`}>{title}</h2>
      {subtitle ? <p className='text-muted max-w-2xl text-sm md:text-base'>{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle
