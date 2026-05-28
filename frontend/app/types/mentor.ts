export interface Review {
  name: string
  rating: number
  text: string
}

export interface Experience {
  title: string
  company: string
  period: string
}

export interface Education {
  degree: string
  school: string
}

export interface Mentor {
  id: string
  name: string
  role: string
  verified: boolean
  rating: number
  reviewsCount: number
  responseTime: string
  students: number
  price: number
  expertise: string
  tags: string[]
  bio: string
  subjects: string[]
  experience: Experience[]
  education: Education[]
  reviews: Review[]
  initials: string
  accent: string
}
