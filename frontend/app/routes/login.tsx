import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { env } from '@/config/env'
import { path } from '@/config/path'
import { QUERY_KEYS } from '@/constants/query-keys'
import { testAccounts } from '@/constants/test-accounts'
import { useLoginMutation } from '@/hooks/queries/auth/use-login-mutation'
import { queryClient } from '@/lib/query-client'
import { authApi } from '@/services/auth.api'
import { getDashboardPath } from '@/utils/get-dashboard-path'
import { notify } from '@/utils/notify'

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: testAccounts[0].email,
      password: testAccounts[0].password
    }
  })

  const redirectTo = searchParams.get('redirectTo')

  const fillTestAccount = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
  }

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values)
      const user = await queryClient.fetchQuery({
        queryKey: QUERY_KEYS.auth.me,
        queryFn: authApi.getCurrentUser
      })
      const destination = redirectTo || getDashboardPath(user.roles)
      navigate(destination, { replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in. Please try again.'
      notify.error(message)
    }
  }

  return (
    <main className='mx-auto max-w-md p-6'>
      <h1 className='mb-2 text-2xl font-semibold'>Đăng nhập</h1>
      {env.VITE_USE_MOCK ? (
        <p className='mb-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'>
          Chế độ mock — không cần backend
        </p>
      ) : null}
      <p className='mb-6 text-sm text-gray-600'>Dùng tài khoản test bên dưới (mật khẩu chung: 123456).</p>

      <p className='mb-4 text-sm text-gray-600'>
        <Link className='font-medium text-primary hover:underline' to='/'>
          ← Về trang chủ
        </Link>
      </p>

      <div className='mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500'>Tài khoản test (dev)</p>
        <ul className='space-y-2'>
          {testAccounts.map((account) => (
            <li key={account.email}>
              <button
                className='w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm transition hover:border-primary hover:text-primary'
                type='button'
                onClick={() => fillTestAccount(account.email, account.password)}
              >
                <span className='font-semibold'>{account.label}</span>
                <span className='mt-0.5 block text-xs text-slate-500'>
                  {account.email} → {account.dashboard}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label className='mb-1 block text-sm font-medium' htmlFor='email'>
            Email
          </label>
          <input
            {...register('email')}
            className='w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-black'
            id='email'
            type='email'
          />
          {errors.email?.message && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium' htmlFor='password'>
            Mật khẩu
          </label>
          <input
            {...register('password')}
            className='w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-black'
            id='password'
            type='password'
          />
          {errors.password?.message && (
            <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting || loginMutation.isPending}
          isLoading={isSubmitting || loginMutation.isPending}
          type='submit'
        >
          Đăng nhập
        </Button>
      </form>

      <p className='mt-6 text-center text-xs text-gray-500'>
        Khám phá mentor tại{' '}
        <Link className='font-medium text-primary hover:underline' to={path.discover}>
          Discover
        </Link>
      </p>
    </main>
  )
}
