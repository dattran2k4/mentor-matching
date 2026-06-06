import { useMemo, useState } from 'react'
import { Info, Search } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { learnerConversations } from '@/mocks/learner-workspace'

export function meta() {
  return [{ title: 'Tin nhắn | Học viên' }]
}

export default function UserMessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversationId, setSelectedConversationId] = useState(
    learnerConversations[0]?.id ?? ''
  )

  const filteredConversations = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (normalizedQuery.length === 0) {
      return learnerConversations
    }

    return learnerConversations.filter((conversation) =>
      [conversation.mentorName, conversation.bookingContext, conversation.lastMessage]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [searchQuery])

  const selectedConversation =
    filteredConversations.find((conversation) => conversation.id === selectedConversationId) ??
    filteredConversations[0]

  return (
    <DashboardPage
      description='Theo dõi các trao đổi liên quan đến buổi học. Khu vực này đang ở bản xem trước vì backend nhắn tin chưa hoàn chỉnh.'
      title='Tin nhắn'
    >
      <div className='flex flex-col gap-6'>
        <section className='rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900'>
          <div className='flex items-start gap-3'>
            <Info aria-hidden='true' className='mt-0.5 text-amber-700' size={18} />
            <p>
              Tin nhắn trực tiếp hiện mới là cấu trúc giao diện tĩnh. Khi backend hội thoại sẵn
              sàng, lịch sử đọc, gửi tin và đồng bộ theo buổi học sẽ hiển thị tại đây.
            </p>
          </div>
        </section>

        <div className='grid min-h-[640px] gap-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_1fr]'>
          <aside className='border-b border-slate-200 lg:border-r lg:border-b-0'>
            <div className='border-b border-slate-100 p-5'>
              <div className='relative'>
                <Search
                  aria-hidden='true'
                  className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                  size={16}
                />
                <input
                  className='focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:outline-none'
                  id='conversation-search'
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder='Tìm theo mentor hoặc buổi học'
                  type='search'
                  value={searchQuery}
                />
              </div>
            </div>

            <div className='space-y-2 p-4'>
              {filteredConversations.length === 0 ? (
                <EmptyState
                  className='min-h-[240px] rounded-2xl bg-slate-50'
                  description='Thử tìm theo tên mentor hoặc quay lại danh sách đặt lịch để bắt đầu một buổi học mới.'
                  title='Chưa có hội thoại phù hợp'
                />
              ) : (
                filteredConversations.map((conversation) => {
                  const isActive = conversation.id === selectedConversation?.id

                  return (
                    <button
                      className={`flex w-full flex-col gap-2 rounded-2xl border p-4 text-left transition ${
                        isActive
                          ? 'border-primary/20 bg-primary/5 shadow-sm'
                          : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                      }`}
                      key={conversation.id}
                      onClick={() => setSelectedConversationId(conversation.id)}
                      type='button'
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <p className='text-ink font-semibold'>{conversation.mentorName}</p>
                          <p className='text-muted text-xs'>{conversation.mentorHeadline}</p>
                        </div>
                        <span className='text-muted text-xs'>{conversation.lastMessageAt}</span>
                      </div>
                      <p className='text-muted text-sm'>{conversation.lastMessage}</p>
                      <div className='flex items-center justify-between gap-3 text-xs'>
                        <span className='rounded-full bg-slate-100 px-2.5 py-1 text-slate-600'>
                          {conversation.statusLabel}
                        </span>
                        {conversation.unreadCount > 0 ? (
                          <span className='bg-primary rounded-full px-2 py-1 font-semibold text-white'>
                            {conversation.unreadCount} mới
                          </span>
                        ) : null}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </aside>

          <section className='flex min-h-[420px] flex-col'>
            {selectedConversation ? (
              <>
                <div className='border-b border-slate-100 p-5'>
                  <p className='text-ink font-semibold'>{selectedConversation.mentorName}</p>
                  <p className='text-muted mt-1 text-sm'>{selectedConversation.bookingContext}</p>
                </div>

                <div className='flex-1 space-y-4 bg-slate-50/70 p-5'>
                  {selectedConversation.messages.map((message) => {
                    const isLearner = message.author === 'learner'

                    return (
                      <div
                        className={`flex ${isLearner ? 'justify-end' : 'justify-start'}`}
                        key={message.id}
                      >
                        <div
                          className={`max-w-[540px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                            isLearner
                              ? 'bg-primary text-white'
                              : 'border border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`mt-2 text-xs ${
                              isLearner ? 'text-white/80' : 'text-slate-500'
                            }`}
                          >
                            {message.sentAt}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className='border-t border-slate-100 p-5'>
                  <label
                    className='text-muted mb-2 block text-sm font-medium'
                    htmlFor='message-draft'
                  >
                    Nội dung phản hồi
                  </label>
                  <textarea
                    className='focus:ring-primary/20 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                    disabled
                    id='message-draft'
                    placeholder='Composer sẽ được bật khi backend nhắn tin và gửi theo buổi học sẵn sàng.'
                  />
                  <p className='text-muted mt-2 text-sm'>
                    Gửi tin nhắn mới hiện chưa khả dụng trong milestone giao diện tĩnh này.
                  </p>
                </div>
              </>
            ) : (
              <EmptyState
                className='m-5 min-h-[320px]'
                description='Khi bạn có trao đổi với mentor liên quan đến lịch học, hội thoại sẽ hiển thị ở đây.'
                title='Chưa có hội thoại nào'
              />
            )}
          </section>
        </div>
      </div>
    </DashboardPage>
  )
}
