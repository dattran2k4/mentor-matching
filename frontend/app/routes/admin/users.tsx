import { useMemo, useState } from 'react'
import { Mail, Search, ShieldAlert } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceMetricCard } from '@/components/WorkspaceMetricCard'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
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
        <WorkspacePanel
          title='Bộ lọc người dùng'
          description='Tìm nhanh theo tên hoặc email, sau đó thu hẹp theo vai trò và trạng thái để đọc hàng người dùng rõ hơn.'
        >
          <div className='grid gap-4 xl:grid-cols-[1.2fr_auto_auto]'>
            <div className='relative min-w-0'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <Input
                className='pl-10'
                id='admin-user-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo tên, email hoặc loại tài khoản'
                type='search'
                value={searchQuery}
              />
            </div>

            <Select
              onChange={(event) => setRoleFilter(event.target.value as UserRoleFilter)}
              value={roleFilter}
            >
              {roleFilters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              ))}
            </Select>

            <Select
              onChange={(event) => setStatusFilter(event.target.value as UserStatusFilter)}
              value={statusFilter}
            >
              {statusFilters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              ))}
            </Select>
          </div>

          <div className='grid gap-3 md:grid-cols-3'>
            {userSummary.map((item) => (
              <WorkspaceMetricCard key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </WorkspacePanel>

        <WorkspacePanel
          title='Danh sách người dùng'
          description='MVP ưu tiên đọc nhanh tên, vai trò, loại tài khoản và trạng thái; chưa mở chỉnh sửa hay khóa tài khoản trực tiếp từ frontend.'
        >
          {filteredUsers.length === 0 ? (
            <EmptyState
              description='Thử đổi từ khóa, vai trò hoặc trạng thái để quay lại một danh sách người dùng phù hợp hơn.'
              title='Không tìm thấy người dùng'
            />
          ) : (
            <>
              <div className='hidden overflow-x-auto lg:block'>
                <Table className='min-w-[920px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Loại tài khoản</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ghi chú</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className='text-sm font-medium text-slate-700'>
                          {roleLabelMap[user.role]}
                        </TableCell>
                        <TableCell className='text-sm text-slate-700'>{user.userType}</TableCell>
                        <TableCell className='text-sm text-slate-700'>{user.joinedLabel}</TableCell>
                        <TableCell>
                          <StatusBadge kind='user' status={user.status} />
                        </TableCell>
                        <TableCell className='text-sm text-slate-600'>{user.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='grid gap-4 lg:hidden'>
                {filteredUsers.map((user) => (
                  <Card className='rounded-2xl shadow-none' key={user.id}>
                    <CardContent className='flex items-start gap-3 p-4'>
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
                        <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
                          <CardContent className='p-4 text-sm text-slate-600'>
                            {user.note}
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </WorkspacePanel>

        <WorkspaceNotice
          description='Màn hình này đang ưu tiên tra cứu và đọc trạng thái. Các thao tác như khóa tài khoản, đổi vai trò hoặc mở chi tiết sâu vẫn nên được coi là phần cần backend hỗ trợ rõ ràng hơn ở milestone sau.'
          icon={ShieldAlert}
          title='Ghi chú về phạm vi hiện tại'
          tone='info'
        />
      </div>
    </DashboardPage>
  )
}
