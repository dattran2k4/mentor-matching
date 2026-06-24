import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  ArrowLeft,
  ChevronRight,
  Info,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Settings
} from 'lucide-react'
import { useState } from 'react'
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
  email: z.string().trim().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const [showTestAccounts, setShowTestAccounts] = useState(false)

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
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.me })
      const user = await queryClient.fetchQuery({
        queryKey: QUERY_KEYS.auth.me,
        queryFn: authApi.getCurrentUser
      })
      const destination = redirectTo || getDashboardPath(user.roles)
      notify.success('Đăng nhập thành công!')
      navigate(destination, { replace: true })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Không thể đăng nhập. Vui lòng thử lại.'
      notify.error(message)
    }
  }

  return (
    <div className='flex min-h-screen items-stretch bg-white'>
      {/* Left Side - Visual */}
      <div className='relative hidden w-1/2 overflow-hidden lg:block'>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1]
          }}
          className='absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#0ea5e9_0%,_transparent_40%),_linear-gradient(135deg,_#1e1b4b_0%,_#312e81_100%)] bg-[length:200%_200%]'
          initial={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <div
          className='absolute inset-0 z-10 opacity-30'
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
          }}
        />

        <div className='relative z-20 flex h-full flex-col justify-between p-12 text-white'>
          <Link className='flex items-center gap-2 text-xl font-bold tracking-tight' to='/'>
            <div className='text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-white'>
              <Sparkles className='h-6 w-6' />
            </div>
            <span>Mentor Matching</span>
          </Link>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className='font-display mb-6 text-5xl leading-tight font-bold'>
              Nâng tầm kỹ năng <br /> cùng đội ngũ Mentor tài năng.
            </h2>
            <p className='max-w-md text-lg text-white/80'>
              Hàng ngàn sinh viên đã tìm thấy người thầy của mình. Hãy bắt đầu hành trình phát triển
              bản thân ngay hôm nay.
            </p>
          </motion.div>

          <footer className='text-sm text-white/60'>
            © 2026 Mentor Matching Platform. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20'>
        <div className='mx-auto w-full max-w-md'>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              className='text-muted hover:text-primary mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors'
              to='/'
            >
              <ArrowLeft className='h-4 w-4' />
              Quay lại trang chủ
            </Link>

            <header className='mb-10'>
              <h1 className='font-display mb-3 text-4xl font-bold tracking-tight'>Đăng nhập</h1>
              <p className='text-muted'>Chào mừng bạn quay trở lại. Hãy nhập thông tin của bạn.</p>
            </header>

            {env.VITE_USE_MOCK && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className='mb-8 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800'
                initial={{ opacity: 0, scale: 0.95 }}
              >
                <Info className='h-5 w-5 shrink-0' />
                <div className='text-sm font-medium'>
                  Chế độ Mock được bật. Bạn có thể sử dụng các tài khoản thử nghiệm bên dưới.
                </div>
              </motion.div>
            )}

            <form className='space-y-6' onSubmit={handleSubmit(handleLogin)}>
              <div className='space-y-2'>
                <label className='text-ink text-sm font-semibold' htmlFor='email'>
                  Địa chỉ Email
                </label>
                <div className='relative'>
                  <Mail className='text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                  <input
                    {...register('email')}
                    autoComplete='email'
                    className='border-line bg-base text-ink focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border pr-4 pl-10 outline-hidden transition-all focus:bg-white focus:ring-4'
                    id='email'
                    placeholder='name@example.com'
                    type='email'
                  />
                </div>
                {errors.email?.message && (
                  <p className='mt-1 text-sm font-medium text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-ink text-sm font-semibold' htmlFor='password'>
                    Mật khẩu
                  </label>
                  <Link
                    className='text-primary text-sm font-medium hover:underline'
                    to='/forgot-password'
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className='relative'>
                  <Lock className='text-muted absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                  <input
                    {...register('password')}
                    autoComplete='current-password'
                    className='border-line bg-base text-ink focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border pr-4 pl-10 outline-hidden transition-all focus:bg-white focus:ring-4'
                    id='password'
                    placeholder='••••••••'
                    type='password'
                  />
                </div>
                {errors.password?.message && (
                  <p className='mt-1 text-sm font-medium text-red-500'>{errors.password.message}</p>
                )}
              </div>

              <Button
                className='shadow-lift h-12 w-full rounded-xl text-lg font-bold'
                disabled={isSubmitting || loginMutation.isPending}
                isLoading={isSubmitting || loginMutation.isPending}
                size='lg'
                type='submit'
              >
                Đăng nhập ngay
                <ChevronRight className='ml-2 h-5 w-5' />
              </Button>
            </form>

            <div className='mt-10'>
              <div className='relative mb-8 flex items-center justify-center'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='border-line w-full border-t' />
                </div>
                <span className='text-muted relative bg-white px-4 text-sm font-medium'>
                  Hoặc sử dụng
                </span>
              </div>

              <div className='space-y-4'>
                <button
                  className='border-line text-ink hover:bg-base flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition'
                  type='button'
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                >
                  <UserCheck className='h-4 w-4' />
                  {showTestAccounts ? 'Ẩn tài khoản dùng thử' : 'Xem tài khoản dùng thử'}
                </button>

                <AnimatePresence>
                  {showTestAccounts && (
                    <motion.div
                      animate={{ height: 'auto', opacity: 1 }}
                      className='bg-base overflow-hidden rounded-2xl p-2'
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                    >
                      <ul className='grid grid-cols-1 gap-2 p-1'>
                        {testAccounts.map((account) => (
                          <li key={account.email}>
                            <button
                              className='group hover:ring-primary flex w-full items-center justify-between rounded-xl bg-white p-3 text-left transition hover:ring-2'
                              type='button'
                              onClick={() => fillTestAccount(account.email, account.password)}
                            >
                              <div className='flex items-center gap-3'>
                                <div className='bg-primary/5 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white'>
                                  {account.label === 'Học viên' && (
                                    <UserCheck className='h-5 w-5' />
                                  )}
                                  {account.label === 'Mentor' && (
                                    <ShieldCheck className='h-5 w-5' />
                                  )}
                                  {account.label === 'Admin' && <Settings className='h-5 w-5' />}
                                </div>
                                <div>
                                  <div className='text-sm font-bold'>{account.label} Account</div>
                                  <div className='text-muted text-xs'>{account.email}</div>
                                </div>
                              </div>
                              <ChevronRight className='text-muted group-hover:text-primary h-4 w-4' />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className='text-muted mt-10 text-center text-sm'>
              Chưa có tài khoản?{' '}
              <Link className='text-primary font-bold hover:underline' to='/register'>
                Đăng ký ngay
              </Link>
            </p>

            <div className='border-line mt-12 flex justify-center gap-8 border-t pt-8'>
              <Link
                className='text-muted hover:text-primary text-sm font-medium transition'
                to={path.discover}
              >
                Khám phá Mentor
              </Link>
              <Link
                className='text-muted hover:text-primary text-sm font-medium transition'
                to='/help'
              >
                Hỗ trợ
              </Link>
              <Link
                className='text-muted hover:text-primary text-sm font-medium transition'
                to='/terms'
              >
                Điều khoản
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
