/* eslint-disable react/prop-types */
import * as React from 'react'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

type ButtonVariantOptions = {
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

const baseClassName =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary/15 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0'

const variantClassMap: Record<ButtonVariant, string> = {
  default: 'bg-primary text-white shadow-soft hover:bg-primary-dark',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  outline:
    'border border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:bg-primary/5',
  ghost: 'text-slate-700 hover:bg-slate-100 hover:text-ink',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  link: 'rounded-none px-0 text-primary underline-offset-4 hover:underline'
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5',
  default: 'h-10 px-4',
  lg: 'h-12 px-5 text-base',
  icon: 'h-10 w-10'
}

export function buttonVariants({
  className,
  size = 'default',
  variant = 'default'
}: ButtonVariantOptions = {}) {
  return cn(baseClassName, variantClassMap[variant], sizeClassMap[size], className)
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled, isLoading = false, size, type = 'button', variant, ...props },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={buttonVariants({ className, size, variant })}
        data-loading={isLoading}
        disabled={disabled || isLoading}
        type={type}
      >
        {isLoading ? <LoaderCircle aria-hidden='true' className='size-4 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
