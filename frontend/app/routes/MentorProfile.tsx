import { BadgeCheck, GraduationCap, Layers, Star, Users, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'

import { path } from '@/config/path'
import BookingSidebar from '../components/BookingSidebar'
import RatingStars from '../components/RatingStars'
import SectionTitle from '../components/SectionTitle'
import { mentors } from '../constants/mentors'

const MentorProfile = () => {
  const { id } = useParams()
  const mentor = mentors.find((item) => item.id === id) || mentors[0]

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] py-6 relative">
      <div className="absolute top-[10%] right-[30%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <Link
        to={path.discover}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary lg:col-span-2 group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Quay lại Khám phá
      </Link>
      <div className="flex flex-col gap-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur p-8 glass-panel overflow-hidden relative"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-wrap items-start gap-6 relative z-10">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${mentor.accent} text-lg font-semibold text-white`}
            >
              {mentor.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-ink">{mentor.name}</h1>
                {mentor.verified ? (
                  <BadgeCheck className="h-5 w-5 text-primary" />
                ) : null}
              </div>
              <p className="text-sm text-muted">{mentor.role}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <RatingStars rating={mentor.rating} size={14} />
                  <span>{mentor.rating} rating</span>
                </div>
                <span className="flex items-center gap-2">
                  <Users size={16} /> {mentor.students} students
                </span>
                <span className="flex items-center gap-2">
                  <Star size={16} className="text-amber-400" /> {mentor.reviewsCount}
                  reviews
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 w-full">
              {mentor.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-medium text-muted shadow-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel"
        >
          <SectionTitle title="About me" subtitle={mentor.bio} />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel"
        >
          <SectionTitle
            title="Teaching style"
            subtitle="Structured sessions, weekly milestones, and hands-on practice."
          />
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/50 bg-slate-900 shadow-lift group">
            <div className="relative flex h-64 items-center justify-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2563eb,_#0f172a_70%)] opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"></div>
              <div className="relative z-10 flex flex-col items-center gap-4 cursor-pointer">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95 group-hover:bg-white/30">
                  <div className="h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white ml-2"></div>
                </div>
                <p className="text-sm font-medium tracking-wide">Watch Intro video</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel card-hover group">
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <div className="bg-primary/10 p-2 rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Layers size={18} />
              </div> 
              <span className="text-lg">Experience</span>
            </div>
            <div className="mt-6 space-y-6 text-sm text-muted relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {mentor.experience.map((item: any) => (
                <div key={item.title} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-semibold text-ink text-base">{item.title}</p>
                    <p className="mt-1">{item.company}</p>
                    <p className="mt-1 text-xs font-medium text-primary">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel card-hover group">
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <div className="bg-secondary/10 p-2 rounded-xl text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-lg">Education</span>
            </div>
            <div className="mt-6 space-y-6 text-sm text-muted">
              {mentor.education.map((item: any) => (
                <div key={item.degree} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-semibold text-ink text-base">{item.degree}</p>
                  <p className="mt-1">{item.school}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel"
        >
          <SectionTitle title="Reviews" subtitle={`${mentor.reviewsCount} total reviews`} />
          <div className="mt-8 space-y-4">
            {mentor.reviews.map((review: any) => (
              <div
                key={review.name}
                className="rounded-2xl border border-slate-200/50 bg-slate-50/50 p-6 transition-colors hover:bg-slate-100/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-500">
                      {review.name.charAt(0)}
                    </div>
                    <p className="text-base font-semibold text-ink">{review.name}</p>
                  </div>
                  <RatingStars rating={review.rating} size={16} />
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed pl-12">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <BookingSidebar mentor={mentor} />
    </div>
  )
}

export default MentorProfile
