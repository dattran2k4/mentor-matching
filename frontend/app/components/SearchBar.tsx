import { MapPin, Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='shadow-soft flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center'>
      <div className='flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
        <Search className='text-muted h-4 w-4' />
        <input
          type='text'
          aria-label='Tìm theo môn học, mentor hoặc mục tiêu học tập'
          placeholder='Môn học, mentor hoặc mục tiêu học tập'
          className='text-ink w-full bg-transparent text-sm outline-none'
        />
      </div>
      <div className='flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
        <MapPin className='text-muted h-4 w-4' />
        <input
          type='text'
          aria-label='Khu vực hoặc hình thức học'
          placeholder='Khu vực hoặc học online/offline'
          className='text-ink w-full bg-transparent text-sm outline-none'
        />
      </div>
      <button className='bg-primary shadow-lift rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-2px]'>
        Tìm mentor
      </button>
    </div>
  )
}

export default SearchBar
