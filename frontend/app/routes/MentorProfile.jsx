import { BadgeCheck, GraduationCap, Layers, Star, Users } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { path } from '@/config/path'
import BookingSidebar from '../components/BookingSidebar'
import RatingStars from '../components/RatingStars'
import SectionTitle from '../components/SectionTitle'
import { mentors } from '../constants/mentors'

const MentorProfile = () => {
  const { id } = useParams()
  const mentor = mentors.find((item) => item.id === id) || mentors[0]

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <Link
        to={path.discover}
        className="text-sm font-medium text-primary hover:underline lg:col-span-2"
      >
        ← Quay lại Khám phá
      </Link>
      <div className="flex flex-col gap-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-start gap-5">
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
            <div className="flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <SectionTitle title="About me" subtitle={mentor.bio} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <SectionTitle
            title="Teaching style"
            subtitle="Structured sessions, weekly milestones, and hands-on practice."
          />
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/90">
            <div className="relative flex h-56 items-center justify-center text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#2563eb,_transparent_60%)] opacity-60"></div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <div className="h-0 w-0 border-y-8 border-l-12 border-y-transparent border-l-white"></div>
                </div>
                <p className="text-sm">Intro video: learn with {mentor.name}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Layers size={16} /> Experience
            </div>
            <div className="mt-4 space-y-4 text-sm text-muted">
              {mentor.experience.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p>{item.company}</p>
                  <p className="text-xs text-muted">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <GraduationCap size={16} /> Education
            </div>
            <div className="mt-4 space-y-4 text-sm text-muted">
              {mentor.education.map((item) => (
                <div key={item.degree}>
                  <p className="font-semibold text-ink">{item.degree}</p>
                  <p>{item.school}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <SectionTitle title="Reviews" subtitle={`${mentor.reviewsCount} total reviews`} />
          <div className="mt-6 space-y-4">
            {mentor.reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{review.name}</p>
                  <RatingStars rating={review.rating} size={14} />
                </div>
                <p className="mt-2 text-sm text-muted">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BookingSidebar mentor={mentor} />
    </div>
  )
}

export default MentorProfile
