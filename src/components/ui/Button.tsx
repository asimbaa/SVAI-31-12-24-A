import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-blue text-white hover:bg-primary-blue/90': variant === 'primary',
          'bg-primary-green text-white hover:bg-primary-green/90': variant === 'secondary',
          'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue/10': variant === 'outline',
          'px-3 py-1.5 text-sm rounded-md': size === 'sm',
          'px-4 py-2 rounded-lg': size === 'md',
          'px-6 py-3 rounded-lg': size === 'lg',
          'w-full': fullWidth
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';