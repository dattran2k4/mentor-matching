import { DashboardPage } from '@/components/DashboardPage'

import { Send, Search, MoreVertical, Paperclip, Smile, Video } from 'lucide-react'

export function meta() {
  return [{ title: 'Tin nhắn | Học viên' }]
}

export default function UserMessagesPage() {
  const contacts = [
    {
      id: 1,
      name: 'Alex Johanson',
      role: 'Mentor ReactJS',
      avatar: 'AJ',
      active: true,
      lastMsg: 'Bạn có câu hỏi nào cho buổi chiều nay không?'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Mentor NodeJS',
      avatar: 'SC',
      active: false,
      lastMsg: 'Ok, mình đã nhận được tài liệu.'
    },
    {
      id: 3,
      name: 'John Smith',
      role: 'Mentor Design',
      avatar: 'JS',
      active: false,
      lastMsg: 'Hẹn gặp bạn vào thứ 2 tới nhé!'
    }
  ]

  return (
    <DashboardPage description='Trao đổi trực tiếp với các mentor của bạn.' title='Tin nhắn'>
      <div className='glass-panel grid h-[calc(100vh-280px)] min-h-[600px] overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 lg:grid-cols-[350px_1fr]'>
        {/* Sidebar */}
        <div className='flex hidden flex-col border-r border-slate-200/60 lg:flex'>
          <div className='border-b border-slate-100 p-6'>
            <div className='relative'>
              <Search size={16} className='text-muted absolute top-1/2 left-3 -translate-y-1/2' />
              <input
                type='text'
                placeholder='Tìm hội thoại...'
                className='focus:ring-primary/20 w-full rounded-xl border-none bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:ring-2'
              />
            </div>
          </div>
          <div className='flex-1 space-y-2 overflow-y-auto p-4'>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex cursor-pointer gap-4 rounded-2xl p-4 transition-all ${contact.active ? 'bg-primary/5 border-primary/10 border shadow-sm' : 'border border-transparent hover:bg-slate-50'}`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${contact.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                  {contact.avatar}
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='mb-0.5 flex items-center justify-between'>
                    <p className='text-ink truncate text-sm font-bold'>{contact.name}</p>
                    <span className='text-muted text-[10px]'>14:20</span>
                  </div>
                  <p className='text-muted truncate text-xs'>{contact.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className='flex h-full flex-col bg-white/30 backdrop-blur-sm'>
          {/* Top Bar */}
          <div className='flex items-center justify-between border-b border-slate-100 bg-white/50 p-5'>
            <div className='flex items-center gap-4'>
              <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-sm'>
                AJ
              </div>
              <div>
                <p className='text-ink font-bold'>Alex Johanson</p>
                <p className='flex items-center gap-1 text-xs font-medium text-emerald-500'>
                  <span className='h-1.5 w-1.5 rounded-full bg-emerald-500'></span> Đang hoạt động
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <button className='rounded-xl border border-slate-200 p-2.5 text-slate-600 transition-colors hover:bg-slate-50'>
                <Video size={18} />
              </button>
              <button className='rounded-xl border border-slate-200 p-2.5 text-slate-600 transition-colors hover:bg-slate-50'>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 space-y-6 overflow-y-auto p-6'>
            <div className='flex max-w-[80%] gap-3'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500'>
                AJ
              </div>
              <div className='text-ink rounded-2xl rounded-tl-none border border-slate-100 bg-white p-4 text-sm leading-relaxed shadow-sm'>
                Chào bạn! Mình vừa xem qua bài tập của bạn. Rất tốt, đặc biệt là phần Tailwind CSS
                layout.
              </div>
            </div>

            <div className='ml-auto flex max-w-[80%] flex-row-reverse gap-3'>
              <div className='bg-primary shadow-soft rounded-2xl rounded-tr-none p-4 text-sm leading-relaxed text-white'>
                Dạ cảm ơn anh ạ! Em vẫn đang hơi vướng phần Framer Motion một chút, không biết chiều
                nay mình có thể đi sâu vào phần đó không?
              </div>
            </div>

            <div className='flex max-w-[80%] gap-3'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500'>
                AJ
              </div>
              <div className='text-ink rounded-2xl rounded-tl-none border border-slate-100 bg-white p-4 text-sm leading-relaxed shadow-sm'>
                Tất nhiên rồi! Bạn có câu hỏi nào cụ thể cho buổi chiều nay không?
              </div>
            </div>
          </div>

          {/* Input */}
          <div className='border-t border-slate-100 bg-white/80 p-6'>
            <div className='focus-within:border-primary/40 focus-within:ring-primary/10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all focus-within:ring-2'>
              <button className='hover:text-primary p-2 text-slate-400 transition-colors'>
                <Paperclip size={20} />
              </button>
              <input
                type='text'
                placeholder='Nhập tin nhắn...'
                className='flex-1 border-none bg-transparent px-2 text-sm outline-none'
              />
              <button className='hover:text-primary p-2 text-slate-400 transition-colors'>
                <Smile size={20} />
              </button>
              <button className='bg-primary shadow-soft hover:shadow-glow rounded-xl p-3 text-white transition-all active:scale-95'>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
