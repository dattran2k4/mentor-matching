interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

const SectionTitle = ({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left'

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow ? (
        <span className='text-primary text-xs font-semibold tracking-[0.3em] uppercase'>
          {eyebrow}
        </span>
      ) : null}
      <h2 className='text-ink text-3xl font-semibold md:text-4xl'>{title}</h2>
      {subtitle ? <p className='text-muted max-w-2xl text-sm md:text-base'>{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle
