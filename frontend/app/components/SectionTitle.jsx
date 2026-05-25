const SectionTitle = ({ eyebrow, title, subtitle, align = 'left' }) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left'

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>
      ) : null}
    </div>
  )
}

export default SectionTitle
