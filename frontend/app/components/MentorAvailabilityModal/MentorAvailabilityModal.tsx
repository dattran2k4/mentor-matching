import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

import { AppSelect } from '@/components/ui/app-select'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { cn } from '@/utils/cn'

type AvailabilityMode = 'RECURRING' | 'SPECIFIC_DATE'

type MentorAvailabilityModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const weekdayOptions = [
  { label: 'T2', value: '1' },
  { label: 'T3', value: '2' },
  { label: 'T4', value: '3' },
  { label: 'T5', value: '4' },
  { label: 'T6', value: '5' },
  { label: 'T7', value: '6' },
  { label: 'CN', value: '7' }
] as const

const timeOptions = Array.from({ length: 32 }, (_, index) => {
  const totalMinutes = 6 * 60 + index * 30
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minutes = String(totalMinutes % 60).padStart(2, '0')
  const value = `${hours}:${minutes}`

  return { label: value, value }
})

export function MentorAvailabilityModal({ open, onOpenChange }: MentorAvailabilityModalProps) {
  const [mode, setMode] = useState<AvailabilityMode>('RECURRING')
  const [selectedDays, setSelectedDays] = useState<string[]>(['2', '4'])
  const [specificDate, setSpecificDate] = useState('')
  const [startTime, setStartTime] = useState('18:00')
  const [endTime, setEndTime] = useState('20:00')

  const canSave = useMemo(() => {
    if (!startTime || !endTime) return false
    if (mode === 'RECURRING') return selectedDays.length > 0
    return Boolean(specificDate)
  }, [endTime, mode, selectedDays.length, specificDate, startTime])

  const handleClose = () => {
    onOpenChange(false)
  }

  const toggleDay = (value: string) => {
    setSelectedDays((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    )
  }

  if (typeof document === 'undefined' || !open) return null

  return createPortal(
    <div className='fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm md:p-6'>
      <div className='w-full max-w-[540px] overflow-visible rounded-[24px] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.22)]'>
        <div className='flex items-center justify-between gap-4 border-b border-slate-200 px-7 py-5'>
          <h3 className='text-ink text-[1.85rem] font-bold tracking-tight'>Thêm khung giờ rảnh</h3>
          <button
            aria-label='Đóng modal'
            className='flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
            onClick={handleClose}
            type='button'
          >
            <X size={22} />
          </button>
        </div>

        <div className='space-y-6 overflow-visible px-7 py-6'>
          <div className='border-b border-slate-200'>
            <div className='flex gap-8'>
              <button
                className={cn(
                  'relative px-1 pb-3 text-[1.02rem] font-medium transition',
                  mode === 'RECURRING' ? 'text-sky-800' : 'text-slate-500 hover:text-slate-700'
                )}
                onClick={() => setMode('RECURRING')}
                type='button'
              >
                Lặp lại hàng tuần
                <span
                  className={cn(
                    'absolute right-0 bottom-0 left-0 h-[3px] rounded-full bg-sky-700 transition-opacity',
                    mode === 'RECURRING' ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </button>
              <button
                className={cn(
                  'relative px-1 pb-3 text-[1.02rem] font-medium transition',
                  mode === 'SPECIFIC_DATE' ? 'text-sky-800' : 'text-slate-500 hover:text-slate-700'
                )}
                onClick={() => setMode('SPECIFIC_DATE')}
                type='button'
              >
                Ngày cụ thể
                <span
                  className={cn(
                    'absolute right-0 bottom-0 left-0 h-[3px] rounded-full bg-sky-700 transition-opacity',
                    mode === 'SPECIFIC_DATE' ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </button>
            </div>
          </div>

          {mode === 'RECURRING' ? (
            <div className='flex flex-wrap gap-3'>
              {weekdayOptions.map((day) => {
                const selected = selectedDays.includes(day.value)

                return (
                  <button
                    aria-pressed={selected}
                    className={cn(
                      'flex h-13 w-13 items-center justify-center rounded-full border text-[1.02rem] font-medium transition',
                      selected
                        ? 'border-sky-700 bg-sky-700 text-white shadow-[0_10px_24px_rgba(2,132,199,0.25)]'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-sky-300 hover:text-sky-700'
                    )}
                    key={day.value}
                    onClick={() => toggleDay(day.value)}
                    type='button'
                  >
                    {day.label}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className='space-y-2'>
              <label className='text-ink text-base font-medium'>Chọn ngày</label>
              <DatePicker
                ariaLabel='Chọn ngày cụ thể'
                onValueChange={setSpecificDate}
                placeholder='Chọn ngày cụ thể'
                value={specificDate}
              />
            </div>
          )}

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-ink text-base font-medium' htmlFor='availability-start'>
                Từ
              </label>
              <AppSelect
                ariaLabel='Chọn giờ bắt đầu'
                className='z-[95] [&_button]:h-12 [&_button]:rounded-xl [&_button]:text-base [&_button]:text-slate-900! [&_span]:text-slate-900!'
                onValueChange={setStartTime}
                options={timeOptions}
                placeholder='Chọn giờ bắt đầu'
                value={startTime}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-ink text-base font-medium' htmlFor='availability-end'>
                Đến
              </label>
              <AppSelect
                ariaLabel='Chọn giờ kết thúc'
                className='z-[95] [&_button]:h-12 [&_button]:rounded-xl [&_button]:text-base [&_button]:text-slate-900! [&_span]:text-slate-900!'
                onValueChange={setEndTime}
                options={timeOptions}
                placeholder='Chọn giờ kết thúc'
                value={endTime}
              />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 border-t border-slate-200 px-7 py-4'>
          <Button
            className='h-12 rounded-xl px-5 text-base'
            onClick={handleClose}
            variant='outline'
          >
            Hủy
          </Button>
          <Button
            className='h-12 rounded-xl px-6 text-base'
            disabled={!canSave}
            onClick={handleClose}
          >
            Lưu khung giờ
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
