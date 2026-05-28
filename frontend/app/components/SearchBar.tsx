import { MapPin, Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <Search className="h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search by name, subject, or skill"
          className="w-full bg-transparent text-sm text-ink outline-none"
        />
      </div>
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <MapPin className="h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Location or time zone"
          className="w-full bg-transparent text-sm text-ink outline-none"
        />
      </div>
      <button className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:translate-y-[-2px]">
        Find Mentors
      </button>
    </div>
  )
}

export default SearchBar
