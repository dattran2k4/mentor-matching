import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { path } from '@/config/path'
import type { SubjectPreview } from '@/constants/subjects'

interface SubjectCardProps {
  subject: SubjectPreview
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const IconName = subject.icon as keyof typeof Icons
  const Icon = (Icons[IconName] as React.ComponentType<{ size?: number }>) || Icons.BookOpen
  const grades = subject.grades ?? []

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className='shadow-soft h-full rounded-3xl border border-slate-200 bg-white p-5'
    >
      <Link to={path.discover} className='flex h-full flex-col gap-4'>
        <span className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
          <Icon size={18} />
        </span>
        <div className='space-y-2'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-ink text-base font-semibold'>{subject.name}</span>
            <span className='text-xs font-medium text-slate-500'>
              {grades[0] ?? 'Nhiều cấp lớp'}
            </span>
          </div>
          <p className='text-muted text-sm leading-relaxed'>{subject.description}</p>
        </div>
        <div className='mt-auto flex flex-wrap gap-2 pt-1'>
          {grades.slice(0, 3).map((grade) => (
            <span
              key={grade}
              className='rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600'
            >
              {grade}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  )
}

export default SubjectCard
