import { useMemo, useState } from 'react'
import { Info, Search } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { learnerConversations } from '@/mocks/learner-workspace'
import { cn } from '@/utils/cn'

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
      <div className='space-y-6'>
        <WorkspaceNotice
          description='Tin nhắn trực tiếp hiện mới là cấu trúc giao diện tĩnh. Khi backend hội thoại sẵn sàng, lịch sử đọc, gửi tin và đồng bộ theo buổi học sẽ hiển thị tại đây.'
          icon={Info}
          title='Preview giao diện'
          tone='warning'
        />

        <Card className='overflow-hidden rounded-3xl'>
          <div className='grid min-h-[640px] gap-0 lg:grid-cols-[340px_1fr]'>
            <aside className='border-b border-slate-200 lg:border-r lg:border-b-0'>
              <CardHeader className='border-b border-slate-100'>
                <div className='relative'>
                  <Search
                    aria-hidden='true'
                    className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                    size={16}
                  />
                  <Input
                    className='pl-10'
                    id='conversation-search'
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder='Tìm theo mentor hoặc buổi học'
                    type='search'
                    value={searchQuery}
                  />
                </div>
              </CardHeader>

              <CardContent className='space-y-2 p-4'>
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
                        className={cn(
                          'flex w-full flex-col gap-2 rounded-2xl border p-4 text-left transition',
                          isActive
                            ? 'border-primary/20 bg-primary/5 shadow-sm'
                            : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                        )}
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
                          <Badge variant='muted'>{conversation.statusLabel}</Badge>
                          {conversation.unreadCount > 0 ? (
                            <Badge variant='info'>{conversation.unreadCount} mới</Badge>
                          ) : null}
                        </div>
                      </button>
                    )
                  })
                )}
              </CardContent>
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
                          className={cn('flex', isLearner ? 'justify-end' : 'justify-start')}
                          key={message.id}
                        >
                          <div
                            className={cn(
                              'max-w-[540px] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                              isLearner
                                ? 'bg-primary text-white'
                                : 'border border-slate-200 bg-white text-slate-800'
                            )}
                          >
                            <p>{message.text}</p>
                            <p
                              className={cn(
                                'mt-2 text-xs',
                                isLearner ? 'text-white/80' : 'text-slate-500'
                              )}
                            >
                              {message.sentAt}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className='border-t border-slate-100 p-5'>
                    <div className='space-y-2'>
                      <p className='text-ink text-sm font-medium'>Nội dung phản hồi</p>
                      <Textarea
                        className='min-h-28'
                        disabled
                        id='message-draft'
                        placeholder='Composer sẽ được bật khi backend nhắn tin và gửi theo buổi học sẵn sàng.'
                      />
                    </div>
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
        </Card>
      </div>
    </DashboardPage>
  )
}
