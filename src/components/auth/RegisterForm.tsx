import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../forms/FormField';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { Button } from '../ui/Button';
import { AUTH_ERRORS } from '../../lib/auth/constants';
import { SUPPORTED_COUNTRIES, type SupportedCountry } from '@/lib/core/constants';
import type { RegisterData } from '@/lib/auth/types';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  country: z.enum(SUPPORTED_COUNTRIES) as z.ZodType<SupportedCountry>
}) satisfies z.ZodType<RegisterData>;

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password', '');

  const handleFormSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : AUTH_ERRORS.UNKNOWN);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-200">
          {error}
        </div>
      )}

      <FormField
        label="Full Name"
        error={errors.name?.message}
        {...register('name')}
      />

      <FormField
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <PasswordStrengthMeter password={password} />

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Country of Origin
        </label>
        <select
          {...register('country')}
          className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white appearance-none"
        >
          <option value="">Select your country of origin</option>
          {SUPPORTED_COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
        )}
        <p className="text-sm text-white/60 mt-1">Select the country you are currently residing in</p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}