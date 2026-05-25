import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { path } from '@/config/path'

const SubjectCard = ({ subject }) => {
  const Icon = Icons[subject.icon] || Icons.BookOpen

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft"
    >
      <Link
        to={path.discover}
        className="flex w-full items-center gap-3"
      >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={18} />
      </span>
      <span className="text-sm font-semibold text-ink">{subject.name}</span>
      </Link>
    </motion.div>
  )
}

export default SubjectCard
