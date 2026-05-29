import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { path } from '@/config/path'
import type { Subject } from '../types/subject'

interface SubjectCardProps {
  subject: Subject
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const IconName = subject.icon as keyof typeof Icons
  const Icon = (Icons[IconName] as React.ComponentType<{ size?: number }>) || Icons.BookOpen

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className='shadow-soft flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3'
    >
      <Link to={path.discover} className='flex w-full items-center gap-3'>
        <span className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl'>
          <Icon size={18} />
        </span>
        <span className='text-ink text-sm font-semibold'>{subject.name}</span>
      </Link>
    </motion.div>
  )
}

export default SubjectCard
