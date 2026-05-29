import { BadgeCheck, GraduationCap, Layers, Star, Users, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'

import { path } from '@/config/path'
import BookingSidebar from '../components/BookingSidebar'
import RatingStars from '../components/RatingStars'
import SectionTitle from '../components/SectionTitle'
import { mentors } from '../constants/mentors'
import type { Mentor, Experience, Education, Review } from '../types/mentor'

const MentorProfile = () => {
  const { id } = useParams()
  const mentor = (mentors as Mentor[]).find((item) => item.id === id) || (mentors as Mentor[])[0]

  return (
    <div className='relative grid gap-10 py-6 lg:grid-cols-[1.1fr_0.9fr]'>
      <div className='bg-primary/5 pointer-events-none absolute top-[10%] right-[30%] -z-10 h-96 w-96 rounded-full blur-[100px]' />

      <Link
        to={path.discover}
        className='text-muted hover:text-primary group flex w-fit items-center gap-2 text-sm font-semibold transition-colors lg:col-span-2'
      >
        <ArrowLeft size={16} className='transition-transform group-hover:-translate-x-1' /> Quay lại
        Khám phá
      </Link>
      <div className='flex flex-col gap-10'>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='glass-panel relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 p-8 backdrop-blur'
        >
          <div className='bg-secondary/10 pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl' />
          <div className='relative z-10 flex flex-wrap items-start gap-6'>
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${mentor.accent} text-lg font-semibold text-white`}
            >
              {mentor.initials}
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-ink text-2xl font-semibold'>{mentor.name}</h1>
                {mentor.verified ? <BadgeCheck className='text-primary h-5 w-5' /> : null}
              </div>
              <p className='text-muted text-sm'>{mentor.role}</p>
              <div className='text-muted mt-3 flex flex-wrap items-center gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <RatingStars rating={mentor.rating} size={14} />
                  <span>{mentor.rating} rating</span>
                </div>
                <span className='flex items-center gap-2'>
                  <Users size={16} /> {mentor.students} students
                </span>
                <span className='flex items-center gap-2'>
                  <Star size={16} className='text-amber-400' /> {mentor.reviewsCount}
                  reviews
                </span>
              </div>
            </div>
            <div className='mt-4 flex w-full flex-wrap gap-2'>
              {mentor.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='text-muted hover:border-primary hover:text-primary rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-medium shadow-sm transition-colors'
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
          className='glass-panel rounded-3xl border border-slate-200/60 bg-white/70 p-8'
        >
          <SectionTitle title='About me' subtitle={mentor.bio} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='glass-panel rounded-3xl border border-slate-200/60 bg-white/70 p-8'
        >
          <SectionTitle
            title='Teaching style'
            subtitle='Structured sessions, weekly milestones, and hands-on practice.'
          />
          <div className='shadow-lift group mt-8 overflow-hidden rounded-3xl border border-slate-200/50 bg-slate-900'>
            <div className='relative flex h-64 items-center justify-center overflow-hidden text-white'>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_#2563eb,_#0f172a_70%)] opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-105'></div>
              <div className='relative z-10 flex cursor-pointer flex-col items-center gap-4'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white/20 shadow-lg backdrop-blur-md transition-transform group-hover:bg-white/30 hover:scale-110 active:scale-95'>
                  <div className='ml-2 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white'></div>
                </div>
                <p className='text-sm font-medium tracking-wide'>Watch Intro video</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='grid gap-6 md:grid-cols-2'
        >
          <div className='glass-panel card-hover group rounded-3xl border border-slate-200/60 bg-white/70 p-8'>
            <div className='text-ink flex items-center gap-3 text-sm font-semibold'>
              <div className='bg-primary/10 text-primary group-hover:bg-primary rounded-xl p-2 transition-colors group-hover:text-white'>
                <Layers size={18} />
              </div>
              <span className='text-lg'>Experience</span>
            </div>
            <div className='text-muted relative mt-6 space-y-6 text-sm before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent md:before:mx-auto md:before:translate-x-0'>
              {mentor.experience.map((item: Experience) => (
                <div
                  key={item.title}
                  className='group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse'
                >
                  <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white bg-slate-200 text-slate-500 shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2' />
                  <div className='w-[calc(100%-4rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:w-[calc(50%-2.5rem)]'>
                    <p className='text-ink text-base font-semibold'>{item.title}</p>
                    <p className='mt-1'>{item.company}</p>
                    <p className='text-primary mt-1 text-xs font-medium'>{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='glass-panel card-hover group rounded-3xl border border-slate-200/60 bg-white/70 p-8'>
            <div className='text-ink flex items-center gap-3 text-sm font-semibold'>
              <div className='bg-secondary/10 text-secondary group-hover:bg-secondary rounded-xl p-2 transition-colors group-hover:text-white'>
                <GraduationCap size={18} />
              </div>
              <span className='text-lg'>Education</span>
            </div>
            <div className='text-muted mt-6 space-y-6 text-sm'>
              {mentor.education.map((item: Education) => (
                <div
                  key={item.degree}
                  className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'
                >
                  <p className='text-ink text-base font-semibold'>{item.degree}</p>
                  <p className='mt-1'>{item.school}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='glass-panel rounded-3xl border border-slate-200/60 bg-white/70 p-8'
        >
          <SectionTitle title='Reviews' subtitle={`${mentor.reviewsCount} total reviews`} />
          <div className='mt-8 space-y-4'>
            {mentor.reviews.map((review: Review) => (
              <div
                key={review.name}
                className='rounded-2xl border border-slate-200/50 bg-slate-50/50 p-6 transition-colors hover:bg-slate-100/50'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-500'>
                      {review.name.charAt(0)}
                    </div>
                    <p className='text-ink text-base font-semibold'>{review.name}</p>
                  </div>
                  <RatingStars rating={review.rating} size={16} />
                </div>
                <p className='text-muted mt-4 pl-12 text-sm leading-relaxed'>{review.text}</p>
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
