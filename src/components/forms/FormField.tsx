import { forwardRef } from 'react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  as?: 'input' | 'textarea';
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, className, as = 'input', ...props }, ref) => {
    const Component = as === 'textarea' ? 'textarea' : Input;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
        <Component
          ref={ref as any}
          className={cn(
            "bg-black/40 backdrop-blur-sm",
            error && "border-red-500/50 focus:ring-red-500/20",
            as === 'textarea' && "min-h-[100px] resize-none",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-200">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-white/60">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

FormField.displayName = 'FormField';