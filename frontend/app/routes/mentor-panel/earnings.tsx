import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, ReceiptText, Wallet } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { StatusBadge } from '@/components/StatusBadge'
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
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2'>
          <div className='flex items-start gap-4'>
            <div className='bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl'>
              <Wallet aria-hidden='true' size={22} />
            </div>
            <div className='space-y-2'>
              <p className='text-muted text-sm font-medium'>Số dư đã đối soát</p>
              <p className='text-ink text-4xl font-semibold'>
                {formatPrice(mentorEarningsSummary.availableBalance)}
              </p>
              <p className='text-muted text-sm'>{mentorEarningsSummary.payoutWindow}</p>
            </div>
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='space-y-2'>
            <p className='text-muted text-sm font-medium'>Dự kiến về ví</p>
            <p className='text-ink text-3xl font-semibold'>
              {formatPrice(mentorEarningsSummary.pendingPayout)}
            </p>
            <p className='text-muted text-sm'>
              Bao gồm các buổi đã hoàn thành nhưng chưa tới đợt chi trả.
            </p>
          </div>
        </section>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_1.5fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Tóm tắt tháng này'
            description='Tách phần đã nhận, phần chờ về và chi phí nền tảng để mentor có kỳ vọng thực tế hơn.'
          />
          <div className='mt-6 space-y-3'>
            {[
              {
                label: 'Buổi đã hoàn thành',
                value: `${mentorEarningsSummary.completedSessionsThisMonth}`,
                helper: 'Số buổi được dùng để ước tính dòng tiền tháng này.',
                icon: ReceiptText
              },
              {
                label: 'Doanh thu dự kiến',
                value: formatPrice(mentorEarningsSummary.projectedThisMonth),
                helper: 'Ước tính từ lịch dạy tĩnh hiện tại, chưa thay cho báo cáo payout thực.',
                icon: CircleDollarSign
              },
              {
                label: 'Phí nền tảng',
                value: mentorEarningsSummary.platformFeeRate,
                helper:
                  'Hiển thị như một giả định minh bạch để route không hứa quá mức khi backend payout còn partial.',
                icon: ArrowUpRight
              }
            ].map((item) => (
              <div
                className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'
                key={item.label}
              >
                <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                  <item.icon aria-hidden='true' size={20} />
                </div>
                <div className='space-y-1'>
                  <p className='text-ink font-semibold'>{item.label}</p>
                  <p className='text-ink text-lg font-semibold'>{item.value}</p>
                  <p className='text-muted text-sm'>{item.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Dòng tiền gần đây'
            description='Các dòng này bám vào booking và payment semantics, không giả vờ là báo cáo payout hoàn chỉnh.'
          />
          <div className='mt-6 space-y-4'>
            {mentorEarningsTransactions.map((transaction) => {
              const isNegative = transaction.amount < 0

              return (
                <article
                  className='flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-start md:justify-between'
                  key={transaction.id}
                >
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
                </article>
              )
            })}
          </div>
        </section>
      </div>

      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Ghi chú trung thực về phạm vi'
          description='Giữ route rõ ràng về phần nào đã bám domain và phần nào vẫn là giao diện tĩnh.'
        />
        <ul className='mt-6 grid gap-3 lg:grid-cols-3'>
          {[
            'Thu nhập hiện được mô tả như payout-linked teaching income, không phải ví điện tử hoàn chỉnh.',
            'Không thêm nút rút tiền thật trước khi payout workflow và trạng thái backend được xác nhận.',
            'Các giao dịch vẫn là dữ liệu tĩnh minh họa cho payment states: PAID, PENDING, REFUNDED và FAILED.'
          ].map((item) => (
            <li
              className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700'
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </DashboardPage>
  )
}
