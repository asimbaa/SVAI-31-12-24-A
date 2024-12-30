import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import type { ProfileFormData } from '../types';

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().refine(date => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 16 && age <= 60;
  }, 'Age must be between 16 and 60'),
  nationality: z.string().min(1, 'Nationality is required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits')
});

interface PersonalInfoFormProps {
  initialData: ProfileFormData['personalInfo'];
  onSubmit: (data: ProfileFormData['personalInfo']) => void;
}

export function PersonalInfoForm({ initialData, onSubmit }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Full Name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <FormField
        label="Date of Birth"
        type="date"
        error={errors.dateOfBirth?.message}
        {...register('dateOfBirth')}
      />

      <FormField
        label="Nationality"
        error={errors.nationality?.message}
        {...register('nationality')}
      />

      <FormField
        label="Passport Number"
        error={errors.passportNumber?.message}
        {...register('passportNumber')}
      />

      <FormField
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        label="Phone Number"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        Continue
      </Button>
    </form>
  );
}