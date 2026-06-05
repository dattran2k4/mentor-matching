import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import MentorCard from '@/components/MentorCard'
import SearchBar from '@/components/SearchBar'
import SectionTitle from '@/components/SectionTitle'
import SubjectCard from '@/components/SubjectCard'
import TestimonialCard from '@/components/TestimonialCard'
import { path } from '@/config/path'
import { mentors } from '@/constants/mentors'
import { subjects } from '@/constants/subjects'
import { testimonials } from '@/constants/testimonials'

const featuredMentors = mentors.filter((mentor) => mentor.approvalStatus === 'APPROVED').slice(0, 3)

const marketplaceStats = [
  { value: '240+', label: 'mentor đã duyệt' },
  { value: '8,500+', label: 'buổi học đã đặt' },
  { value: '40+', label: 'môn học và cấp lớp' }
] as const

const trustSteps = [
  {
    title: 'Tìm đúng nhu cầu học',
    description: 'Bắt đầu từ môn học, lớp, mục tiêu và hình thức học phù hợp với học viên.'
  },
  {
    title: 'So sánh mentor rõ ràng',
    description: 'Xem học phí, trạng thái duyệt, đánh giá, cách dạy và lịch rảnh ngay trên hồ sơ.'
  },
  {
    title: 'Đặt buổi học thực tế',
    description: 'Chọn môn học cụ thể, khung giờ phù hợp rồi gửi yêu cầu đặt lịch tới mentor.'
  }
] as const

const Home = () => {
  return (
    <div className='flex flex-col gap-16 py-8'>
      <section className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className='space-y-6'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700'>
            <ShieldCheck size={14} />
            Mentor đã duyệt cho từng mục tiêu học tập
          </div>
          <div className='space-y-4'>
            <h1 className='text-ink max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl'>
              Tìm mentor phù hợp để học đúng thứ, đúng nhịp và đúng mục tiêu.
            </h1>
            <p className='text-muted max-w-2xl text-base leading-relaxed md:text-lg'>
              Mentor Matching giúp học viên và phụ huynh tìm mentor theo môn học, lớp, hình thức học
              và ngân sách. Mỗi hồ sơ đều thể hiện học phí, đánh giá, cách dạy và trạng thái duyệt
              rõ ràng.
            </p>
          </div>

          <SearchBar
            buttonLabel='Tìm mentor'
            className='bg-slate-50'
            contextPlaceholder='Lớp, khu vực hoặc online/offline'
            quickTags={['Toán lớp 9', 'IELTS Foundation', 'Ôn thi lớp 10', 'Học cuối tuần']}
          />

          <div className='grid gap-3 sm:grid-cols-3'>
            {marketplaceStats.map((stat) => (
              <div key={stat.label} className='rounded-2xl border border-slate-200 bg-white p-4'>
                <p className='text-ink text-2xl font-semibold'>{stat.value}</p>
                <p className='text-muted mt-1 text-sm capitalize'>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          className='space-y-4 rounded-3xl border border-slate-200 bg-white p-6'
        >
          <div className='rounded-3xl bg-slate-900 p-6 text-white'>
            <p className='text-sm font-medium text-blue-100'>Cách người học chọn mentor</p>
            <div className='mt-4 space-y-3'>
              <div className='flex items-start gap-3 rounded-2xl bg-white/8 p-4'>
                <CheckCircle2 className='mt-0.5 h-5 w-5 text-blue-200' />
                <div>
                  <p className='font-semibold'>Môn học và cấp lớp rõ ràng</p>
                  <p className='mt-1 text-sm text-slate-200'>
                    Xem mentor có dạy đúng môn, đúng lớp và đúng mức học phí hay không.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3 rounded-2xl bg-white/8 p-4'>
                <Star className='mt-0.5 h-5 w-5 text-amber-300' />
                <div>
                  <p className='font-semibold'>Tín nhiệm và đánh giá dễ so sánh</p>
                  <p className='mt-1 text-sm text-slate-200'>
                    Trạng thái duyệt, xác minh và phản hồi từ học viên luôn nằm gần phần quyết định.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <p className='text-ink text-sm font-semibold tracking-[0.16em] uppercase'>
              Hành trình đặt buổi học
            </p>
            <div className='mt-4 space-y-4'>
              {trustSteps.map((step, index) => (
                <div key={step.title} className='flex gap-4'>
                  <div className='bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white'>
                    {index + 1}
                  </div>
                  <div>
                    <p className='text-ink font-semibold'>{step.title}</p>
                    <p className='text-muted mt-1 text-sm'>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className='space-y-8'>
        <div className='flex items-end justify-between gap-4'>
          <SectionTitle
            eyebrow='Mentor nổi bật'
            size='md'
            subtitle='So sánh học phí, môn học, trạng thái duyệt và lịch trống từ những hồ sơ được chọn lọc.'
            title='Mentor đang được phụ huynh và học viên quan tâm'
          />
          <Link
            to={path.discover}
            className='text-primary hidden items-center gap-2 text-sm font-semibold md:flex'
          >
            Xem tất cả <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {featuredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>

      <section className='space-y-8'>
        <SectionTitle
          eyebrow='Môn học'
          size='md'
          subtitle='Bắt đầu từ nhu cầu học tập thực tế để lọc ra mentor phù hợp nhanh hơn.'
          title='Khám phá theo môn học, cấp lớp và mục tiêu'
        />
        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {subjects.slice(0, 8).map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-3xl border border-slate-200 bg-slate-50 p-8'>
          <SectionTitle
            eyebrow='Quy trình'
            size='md'
            subtitle='Từng bước được thiết kế để giúp phụ huynh và học viên ra quyết định nhanh nhưng vẫn đủ căn cứ.'
            title='Cách Mentor Matching giữ trải nghiệm đặt lịch thực tế'
          />
          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            {trustSteps.map((step, index) => (
              <div key={step.title} className='rounded-2xl border border-slate-200 bg-white p-5'>
                <p className='text-primary text-sm font-semibold'>Bước {index + 1}</p>
                <p className='text-ink mt-2 font-semibold'>{step.title}</p>
                <p className='text-muted mt-2 text-sm leading-relaxed'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid gap-4'>
          <div className='rounded-3xl bg-slate-900 p-8 text-white'>
            <p className='text-sm font-semibold tracking-[0.18em] text-blue-200 uppercase'>
              Vì sao phụ huynh tin dùng
            </p>
            <div className='mt-5 space-y-4'>
              <div className='rounded-2xl bg-white/8 p-4'>
                <p className='font-semibold'>Thông tin học và học phí hiển thị ngay</p>
                <p className='mt-2 text-sm leading-relaxed text-slate-300'>
                  Mỗi hồ sơ đều cho thấy môn dạy, cấp lớp, mức học phí, hình thức học và phản hồi từ
                  người học trước đó.
                </p>
              </div>
              <div className='rounded-2xl bg-white/8 p-4'>
                <p className='font-semibold'>Tín hiệu tin cậy xuất hiện gần quyết định</p>
                <p className='mt-2 text-sm leading-relaxed text-slate-300'>
                  Trạng thái duyệt và xác minh được giữ ngay trong luồng khám phá để người học không
                  phải tự dò tìm.
                </p>
              </div>
            </div>
          </div>

          <div className='flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8'>
            <div>
              <p className='text-primary text-sm font-semibold tracking-[0.18em] uppercase'>
                Dành cho mentor
              </p>
              <h3 className='text-ink mt-4 text-2xl font-semibold'>
                Hoàn thiện hồ sơ giảng dạy rõ ràng để nhận yêu cầu học phù hợp với lịch của bạn.
              </h3>
              <p className='text-muted mt-4 text-sm leading-relaxed'>
                Khai báo môn dạy, cấp lớp, học phí và khung giờ rảnh. Sau khi được duyệt, hồ sơ của
                bạn có thể xuất hiện trong danh sách tìm mentor công khai.
              </p>
            </div>
            <Link
              to={path.mentorPanel.root}
              className='bg-primary mt-8 inline-flex w-fit items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
            >
              Bắt đầu hồ sơ mentor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className='space-y-8'>
        <SectionTitle
          eyebrow='Phản hồi'
          size='md'
          subtitle='Những nhận xét ngắn nhưng sát với điều người học cần biết trước khi đặt buổi đầu tiên.'
          title='Học viên và phụ huynh đánh giá điều gì'
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
