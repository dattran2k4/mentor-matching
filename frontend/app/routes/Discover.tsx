import { Filter } from 'lucide-react'
import { useState } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import MentorCard from '../components/MentorCard'
import SearchBar from '../components/SearchBar'
import { mentors } from '../constants/mentors'

const Discover = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="flex flex-col gap-10 py-6 relative">
      <div className="absolute top-[-50px] right-[-100px] w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            <span className="text-gradient">Mentor discovery</span>
          </h1>
          <p className="text-muted">Browse verified mentors and filter by goals, price, and availability.</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink md:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="glass-panel p-2 rounded-2xl">
        <SearchBar />
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`h-9 w-9 rounded-full border text-sm font-semibold ${
                  page === 1
                    ? 'border-primary bg-primary text-white'
                    : 'border-slate-200 text-muted'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden">
          <div className="mx-auto max-w-sm">
            <FilterSidebar onClose={() => setFiltersOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Discover
