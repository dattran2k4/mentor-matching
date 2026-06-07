import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, ReceiptText, Wallet } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceMetricCard } from '@/components/WorkspaceMetricCard'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Card, CardContent } from '@/components/ui/card'
import { mentorEarningsSummary, mentorEarningsTransactions } from '@/mocks/mentor-workspace'
import { formatPrice } from '@/utils/format'

export function meta() {
  return [{ title: 'Thu nhập | Mentor' }]
}

export default function MentorEarningsPage() {
  return (
    <DashboardPage
      description='Theo dõi thu nhập gắn với booking và payment status, đồng thời giữ minh bạch về phần nào mới là ước tính tĩnh trong milestone này.'
      title='Thu nhập'
    >
      <div className='grid gap-4 xl:grid-cols-3'>
        <WorkspaceMetricCard
          helper={mentorEarningsSummary.payoutWindow}
          icon={Wallet}
          label='Số dư đã đối soát'
          value={formatPrice(mentorEarningsSummary.availableBalance)}
        />
        <WorkspaceMetricCard
          helper='Bao gồm các buổi đã hoàn thành nhưng chưa tới đợt chi trả.'
          icon={CircleDollarSign}
          label='Dự kiến về ví'
          value={formatPrice(mentorEarningsSummary.pendingPayout)}
          tone='warning'
        />
        <WorkspaceMetricCard
          helper='Ước tính từ lịch dạy tĩnh hiện tại, chưa thay cho báo cáo payout thực.'
          icon={ReceiptText}
          label='Doanh thu dự kiến tháng này'
          value={formatPrice(mentorEarningsSummary.projectedThisMonth)}
        />
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_1.5fr]'>
        <WorkspacePanel
          title='Tóm tắt tháng này'
          description='Tách phần đã nhận, phần chờ về và chi phí nền tảng để mentor có kỳ vọng thực tế hơn.'
        >
          <div className='grid gap-3'>
            <WorkspaceMetricCard
              helper='Số buổi được dùng để ước tính dòng tiền tháng này.'
              icon={ReceiptText}
              label='Buổi đã hoàn thành'
              value={mentorEarningsSummary.completedSessionsThisMonth}
            />
            <WorkspaceMetricCard
              helper='Ước tính từ lịch dạy tĩnh hiện tại, chưa thay cho báo cáo payout thực.'
              icon={CircleDollarSign}
              label='Doanh thu dự kiến'
              value={formatPrice(mentorEarningsSummary.projectedThisMonth)}
            />
            <WorkspaceMetricCard
              helper='Hiển thị như một giả định minh bạch để route không hứa quá mức khi backend payout còn partial.'
              icon={ArrowUpRight}
              label='Phí nền tảng'
              value={mentorEarningsSummary.platformFeeRate}
              tone='neutral'
            />
          </div>
        </WorkspacePanel>

        <WorkspacePanel
          title='Dòng tiền gần đây'
          description='Các dòng này bám vào booking và payment semantics, không giả vờ là báo cáo payout hoàn chỉnh.'
        >
          <div className='space-y-4'>
            {mentorEarningsTransactions.map((transaction) => {
              const isNegative = transaction.amount < 0

              return (
                <Card className='rounded-2xl shadow-none' key={transaction.id}>
                  <CardContent className='flex flex-col gap-4 p-4 md:flex-row md:items-start md:justify-between'>
                    <div className='flex items-start gap-4'>
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                          isNegative ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {isNegative ? (
                          <ArrowUpRight aria-hidden='true' size={20} />
                        ) : (
                          <ArrowDownLeft aria-hidden='true' size={20} />
                        )}
                      </div>
                      <div className='space-y-1'>
                        <p className='text-ink font-semibold'>{transaction.label}</p>
                        <p className='text-muted text-sm'>{transaction.detail}</p>
                        <p className='text-muted text-sm'>{transaction.bookedAt}</p>
                      </div>
                    </div>

                    <div className='flex flex-col items-start gap-2 md:items-end'>
                      <p
                        className={`text-lg font-semibold ${
                          isNegative ? 'text-red-600' : 'text-emerald-700'
                        }`}
                      >
                        {formatPrice(transaction.amount)}
                      </p>
                      <StatusBadge kind='payment' status={transaction.paymentStatus} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </WorkspacePanel>
      </div>

      <WorkspaceNotice
        description='Thu nhập hiện được mô tả như payout-linked teaching income, không phải ví điện tử hoàn chỉnh. Các giao dịch vẫn là dữ liệu tĩnh minh họa cho PAID, PENDING, REFUNDED và FAILED.'
        icon={Wallet}
        title='Phạm vi route hiện tại'
        tone='neutral'
      />
    </DashboardPage>
  )
}
