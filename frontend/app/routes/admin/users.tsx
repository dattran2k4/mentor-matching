import { useMemo, useState } from 'react'
import { Mail, Search, ShieldAlert } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { adminUsers, type AdminUserRecord, type AdminUserRole } from '@/mocks/admin-workspace'
import { getInitials } from '@/utils/format'

type UserRoleFilter = 'ALL' | AdminUserRole
type UserStatusFilter = 'ALL' | AdminUserRecord['status']

const roleFilters: Array<{ key: UserRoleFilter; label: string }> = [
  { key: 'ALL', label: 'Tất cả vai trò' },
  { key: 'LEARNER', label: 'Học viên' },
  { key: 'MENTOR', label: 'Mentor' },
  { key: 'PARENT', label: 'Phụ huynh' },
  { key: 'ADMIN', label: 'Admin' }
]

const statusFilters: Array<{ key: UserStatusFilter; label: string }> = [
  { key: 'ALL', label: 'Mọi trạng thái' },
  { key: 'ACTIVE', label: 'Đang hoạt động' },
  { key: 'INACTIVE', label: 'Không hoạt động' },
  { key: 'BANNED', label: 'Đã khóa' }
]

const matchesRoleFilter = (user: AdminUserRecord, filter: UserRoleFilter) =>
  filter === 'ALL' ? true : user.role === filter

const matchesStatusFilter = (user: AdminUserRecord, filter: UserStatusFilter) =>
  filter === 'ALL' ? true : user.status === filter

const roleLabelMap: Record<AdminUserRole, string> = {
  LEARNER: 'Học viên',
  MENTOR: 'Mentor',
  PARENT: 'Phụ huynh',
  ADMIN: 'Admin'
}

export function meta() {
  return [{ title: 'Người dùng | Admin' }]
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>('ALL')

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return adminUsers.filter((user) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        user.fullName.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery) ||
        user.userType.toLowerCase().includes(normalizedQuery)

      return (
        matchesSearch &&
        matchesRoleFilter(user, roleFilter) &&
        matchesStatusFilter(user, statusFilter)
      )
    })
  }, [roleFilter, searchQuery, statusFilter])

  const userSummary = useMemo(
    () => [
      {
        label: 'Tài khoản đang hoạt động',
        value: adminUsers.filter((user) => user.status === 'ACTIVE').length
      },
      {
        label: 'Mentor trong hệ thống',
        value: adminUsers.filter((user) => user.role === 'MENTOR').length
      },
      {
        label: 'Tài khoản cần theo dõi',
        value: adminUsers.filter((user) => user.status !== 'ACTIVE').length
      }
    ],
    []
  )

  return (
    <DashboardPage
      description='Tra cứu người dùng theo vai trò và trạng thái, nhưng vẫn giữ rõ rằng các hành động thay đổi trạng thái sâu hơn sẽ cần backend hỗ trợ.'
      title='Quản lý người dùng'
    >
      <div className='space-y-6'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Bộ lọc người dùng'
            description='Tìm nhanh theo tên hoặc email, sau đó thu hẹp theo vai trò và trạng thái để đọc hàng người dùng rõ hơn.'
          />

          <div className='mt-5 grid gap-4 xl:grid-cols-[1.2fr_auto_auto]'>
            <label className='relative min-w-0' htmlFor='admin-user-search'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <input
                className='focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm transition focus:ring-2 focus:outline-none'
                id='admin-user-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo tên, email hoặc loại tài khoản'
                type='search'
                value={searchQuery}
              />
            </label>

            <select
              className='rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700'
              onChange={(event) => setRoleFilter(event.target.value as UserRoleFilter)}
              value={roleFilter}
            >
              {roleFilters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              ))}
            </select>

            <select
              className='rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700'
              onChange={(event) => setStatusFilter(event.target.value as UserStatusFilter)}
              value={statusFilter}
            >
              {statusFilters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div className='mt-5 grid gap-3 md:grid-cols-3'>
            {userSummary.map((item) => (
              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4' key={item.label}>
                <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                  {item.label}
                </p>
                <p className='text-ink mt-2 text-2xl font-semibold'>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Danh sách người dùng'
            description='MVP ưu tiên đọc nhanh tên, vai trò, loại tài khoản và trạng thái; chưa mở chỉnh sửa hay khóa tài khoản trực tiếp từ frontend.'
          />

          {filteredUsers.length === 0 ? (
            <div className='mt-6'>
              <EmptyState
                description='Thử đổi từ khóa, vai trò hoặc trạng thái để quay lại một danh sách người dùng phù hợp hơn.'
                title='Không tìm thấy người dùng'
              />
            </div>
          ) : (
            <>
              <div className='mt-6 hidden overflow-x-auto lg:block'>
                <table className='w-full min-w-[920px] border-collapse text-left'>
                  <thead>
                    <tr className='border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase'>
                      <th className='px-4 py-3 font-semibold'>Người dùng</th>
                      <th className='px-4 py-3 font-semibold'>Vai trò</th>
                      <th className='px-4 py-3 font-semibold'>Loại tài khoản</th>
                      <th className='px-4 py-3 font-semibold'>Ngày tham gia</th>
                      <th className='px-4 py-3 font-semibold'>Trạng thái</th>
                      <th className='px-4 py-3 font-semibold'>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        className='border-b border-slate-100 align-top last:border-0'
                        key={user.id}
                      >
                        <td className='px-4 py-4'>
                          <div className='flex items-start gap-3'>
                            <div className='bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-semibold'>
                              {getInitials(user.fullName)}
                            </div>
                            <div className='space-y-1'>
                              <p className='text-ink font-semibold'>{user.fullName}</p>
                              <p className='text-muted inline-flex items-center gap-2 text-sm'>
                                <Mail aria-hidden='true' size={14} />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-4 text-sm font-medium text-slate-700'>
                          {roleLabelMap[user.role]}
                        </td>
                        <td className='px-4 py-4 text-sm text-slate-700'>{user.userType}</td>
                        <td className='px-4 py-4 text-sm text-slate-700'>{user.joinedLabel}</td>
                        <td className='px-4 py-4'>
                          <StatusBadge kind='user' status={user.status} />
                        </td>
                        <td className='px-4 py-4 text-sm text-slate-600'>{user.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='mt-6 grid gap-4 lg:hidden'>
                {filteredUsers.map((user) => (
                  <article className='rounded-2xl border border-slate-200 p-4' key={user.id}>
                    <div className='flex items-start gap-3'>
                      <div className='bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-semibold'>
                        {getInitials(user.fullName)}
                      </div>
                      <div className='min-w-0 flex-1 space-y-2'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='text-ink font-semibold'>{user.fullName}</p>
                          <StatusBadge kind='user' status={user.status} />
                        </div>
                        <p className='text-muted inline-flex items-center gap-2 text-sm'>
                          <Mail aria-hidden='true' size={14} />
                          {user.email}
                        </p>
                        <div className='text-muted grid gap-2 text-sm md:grid-cols-2'>
                          <p>{roleLabelMap[user.role]}</p>
                          <p>{user.userType}</p>
                          <p>Tham gia {user.joinedLabel}</p>
                        </div>
                        <p className='rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                          {user.note}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <section className='rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm'>
          <div className='flex items-start gap-3'>
            <div className='text-blue-700'>
              <ShieldAlert aria-hidden='true' size={18} />
            </div>
            <div className='space-y-2'>
              <p className='font-semibold text-blue-900'>Ghi chú về phạm vi hiện tại</p>
              <p className='text-sm text-blue-800'>
                Màn hình này đang ưu tiên tra cứu và đọc trạng thái. Các thao tác như khóa tài
                khoản, đổi vai trò hoặc mở chi tiết sâu vẫn nên được coi là phần cần backend hỗ trợ
                rõ ràng hơn ở milestone sau.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
