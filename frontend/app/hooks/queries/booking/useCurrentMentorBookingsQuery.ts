import { queryOptions, useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { bookingApi } from '@/services/booking.api'
import { useAuthStore } from '@/store/auth-store'
import type { BookingApiResponse } from '@/types/api/booking'

async function fetchCurrentMentorBookings(): Promise<BookingApiResponse[]> {
  return (await bookingApi.getMentorBookings()).data.data
}

export function getCurrentMentorBookingsQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.booking.mentorMe,
    queryFn: fetchCurrentMentorBookings
  })
}

export function useCurrentMentorBookingsQuery(enabled = true) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    ...getCurrentMentorBookingsQueryOptions(),
    enabled: Boolean(accessToken && enabled)
  })
}
