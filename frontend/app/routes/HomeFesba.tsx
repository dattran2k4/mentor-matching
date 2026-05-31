import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { path } from '@/config/path'
import SearchBar from '../components/SearchBar'
import SectionTitle from '../components/SectionTitle'
import MentorCard from '../components/MentorCard'
import SubjectCard from '../components/SubjectCard'
import TestimonialCard from '../components/TestimonialCard'
import { mentors } from '../constants/mentors'
import { subjects } from '../constants/subjects'
import { testimonials } from '../constants/testimonials'

const HeroIllustration = () => (
  <svg viewBox='0 0 420 320' className='h-full w-full'>
    <defs>
      <linearGradient id='card' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#ffffff' />
        <stop offset='100%' stopColor='#e0ecff' />
      </linearGradient>
      <linearGradient id='accent' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#2563eb' />
        <stop offset='100%' stopColor='#60a5fa' />
      </linearGradient>
    </defs>
    <rect x='10' y='18' width='400' height='284' rx='22' fill='url(#card)' />
    <rect x='44' y='56' width='210' height='24' rx='12' fill='#e2e8f0' />
    <rect x='44' y='96' width='260' height='16' rx='8' fill='#dbeafe' />
    <rect x='44' y='124' width='180' height='16' rx='8' fill='#e2e8f0' />
    <rect x='44' y='162' width='332' height='90' rx='18' fill='#ffffff' />
    <rect x='68' y='184' width='90' height='14' rx='7' fill='#e2e8f0' />
    <rect x='68' y='208' width='140' height='14' rx='7' fill='#dbeafe' />
    <circle cx='320' cy='206' r='42' fill='url(#accent)' />
    <path
      d='M308 206c0-9.5 7.5-17 17-17s17 7.5 17 17-7.5 17-17 17-17-7.5-17-17z'
      fill='#ffffff'
      opacity='0.8'
    />
    <path d='M329 197l10 9-10 9' fill='none' stroke='#2563eb' strokeWidth='4' />
  </svg>
)

const Home = () => {
  return (
    <div className='relative flex flex-col gap-20 py-8'>
      {/* Decorative background blurs */}
      <div className='bg-primary/10 pointer-events-none absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-[100px]' />
      <div className='bg-secondary/10 pointer-events-none absolute top-[40%] left-[-10%] -z-10 h-[400px] w-[400px] rounded-full blur-[100px]' />

      <section className='grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col gap-8'
        >
          <div className='border-primary/20 bg-primary/5 text-primary shadow-soft inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold'>
            <span className='relative flex h-2 w-2'>
              <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
              <span className='bg-primary relative inline-flex h-2 w-2 rounded-full'></span>
            </span>
            Curated mentors for ambitious learners
          </div>
          <h1 className='text-ink text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-6xl'>
            Find the perfect mentor to{' '}
            <span className='text-gradient'>accelerate your future.</span>
          </h1>
          <p className='text-muted max-w-lg text-base leading-relaxed md:text-lg'>
            Expert-led personalized sessions, built for developers, designers, and ambitious
            professionals.
          </p>
          <div className='glass-panel rounded-2xl p-2'>
            <SearchBar />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className='relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl'
        >
          <div className='bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />
          <HeroIllustration />
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='from-primary-dark via-primary to-primary-light shadow-lift relative grid gap-6 overflow-hidden rounded-3xl bg-gradient-to-r px-6 py-10 text-white md:grid-cols-3'
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        {[
          { value: '12,000+', label: 'Active mentors' },
          { value: '500K+', label: 'Sessions booked' },
          { value: '150+', label: 'Subjects covered' }
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={stat.label}
            className='relative z-10 text-center'
          >
            <p className='text-4xl font-semibold tracking-tight'>{stat.value}</p>
            <p className='mt-2 text-sm font-medium tracking-widest text-blue-100 uppercase'>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.section>

      <section className='flex flex-col gap-8'>
        <div className='flex items-end justify-between gap-4'>
          <SectionTitle
            eyebrow='Top Rated'
            title='Top-rated mentors'
            subtitle='Learn from industry experts with high student ratings.'
          />
          <Link
            to={path.discover}
            className='text-primary hidden items-center gap-2 text-sm font-semibold md:flex'
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {mentors.slice(0, 3).map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-8'>
        <SectionTitle
          eyebrow='Explore'
          title='Popular subjects'
          subtitle='Choose a track and start building your next skill.'
        />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className='grid gap-8 lg:grid-cols-[1fr_1.1fr]'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='from-primary to-primary-dark shadow-lift relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-10 text-white'
        >
          <div className='pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
          <div>
            <p className='text-sm font-semibold tracking-[0.2em] text-blue-200 uppercase'>
              Ready to start?
            </p>
            <h3 className='mt-4 max-w-sm text-4xl leading-tight font-semibold'>
              Join thousands of students and fast-track your learning.
            </h3>
          </div>
          <Link
            to={path.discover}
            className='text-primary mt-8 inline-flex w-fit rounded-full bg-white px-8 py-4 text-sm font-semibold transition-transform hover:scale-105 hover:shadow-lg active:scale-95'
          >
            Start learning now
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='shadow-soft glass-panel card-hover relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-10'
        >
          <div className='bg-secondary/5 pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-2xl'></div>
          <div>
            <p className='text-secondary text-sm font-semibold tracking-[0.2em] uppercase'>
              Become a mentor
            </p>
            <h3 className='text-ink mt-4 max-w-sm text-4xl leading-tight font-semibold'>
              Teach learners and earn on your schedule.
            </h3>
            <p className='text-muted mt-4 max-w-md text-base leading-relaxed'>
              Share expertise, grow your network, and help others reach their goals while earning a
              steady income.
            </p>
          </div>
          <Link
            to={path.mentorPanel.root}
            className='bg-ink shadow-lift group mt-8 inline-flex w-fit rounded-full px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95'
          >
            Apply to become a Mentor{' '}
            <ArrowUpRight
              size={18}
              className='ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1'
            />
          </Link>
        </motion.div>
      </section>

      <section className='flex flex-col gap-8'>
        <SectionTitle
          eyebrow='Success stories'
          title='What students are saying'
          subtitle='Real feedback from learners across the platform.'
        />
        <div className='grid gap-6 md:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
