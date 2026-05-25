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
  <svg viewBox="0 0 420 320" className="h-full w-full">
    <defs>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e0ecff" />
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <rect x="10" y="18" width="400" height="284" rx="22" fill="url(#card)" />
    <rect x="44" y="56" width="210" height="24" rx="12" fill="#e2e8f0" />
    <rect x="44" y="96" width="260" height="16" rx="8" fill="#dbeafe" />
    <rect x="44" y="124" width="180" height="16" rx="8" fill="#e2e8f0" />
    <rect x="44" y="162" width="332" height="90" rx="18" fill="#ffffff" />
    <rect x="68" y="184" width="90" height="14" rx="7" fill="#e2e8f0" />
    <rect x="68" y="208" width="140" height="14" rx="7" fill="#dbeafe" />
    <circle cx="320" cy="206" r="42" fill="url(#accent)" />
    <path
      d="M308 206c0-9.5 7.5-17 17-17s17 7.5 17 17-7.5 17-17 17-17-7.5-17-17z"
      fill="#ffffff"
      opacity="0.8"
    />
    <path d="M329 197l10 9-10 9" fill="none" stroke="#2563eb" strokeWidth="4" />
  </svg>
)

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-primary">
            Curated mentors for ambitious learners
          </div>
          <h1 className="text-4xl font-semibold text-ink md:text-5xl lg:text-6xl">
            Find the perfect mentor to accelerate your future.
          </h1>
          <p className="text-base text-muted md:text-lg">
            Expert-led personalized sessions, built for developers, designers,
            and ambitious professionals.
          </p>
          <SearchBar />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
        >
          <HeroIllustration />
        </motion.div>
      </section>

      <section className="grid gap-6 rounded-2xl bg-primary px-6 py-8 text-white md:grid-cols-3">
        {[
          { value: '12,000+', label: 'Active mentors' },
          { value: '500K+', label: 'Sessions booked' },
          { value: '150+', label: 'Subjects covered' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-blue-100">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Top Rated"
            title="Top-rated mentors"
            subtitle="Learn from industry experts with high student ratings."
          />
          <Link
            to={path.discover}
            className="hidden items-center gap-2 text-sm font-semibold text-primary md:flex"
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.slice(0, 3).map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Explore"
          title="Popular subjects"
          subtitle="Choose a track and start building your next skill."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl bg-primary p-8 text-white shadow-lift">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
            Ready to start?
          </p>
          <h3 className="mt-4 text-3xl font-semibold">
            Join thousands of students and fast-track your learning.
          </h3>
          <Link
            to={path.discover}
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary"
          >
            Start learning
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Become a mentor
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-ink">
            Teach learners and earn on your schedule.
          </h3>
          <p className="mt-3 text-sm text-muted">
            Share expertise, grow your network, and help others reach their goals.
          </p>
          <Link
            to={path.mentorPanel.root}
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lift"
          >
            Apply now
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Success stories"
          title="What students are saying"
          subtitle="Real feedback from learners across the platform."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
