import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import type { ProfileFormData } from '../types';

const educationInfoSchema = z.object({
  level: z.enum(['undergraduate', 'postgraduate']),
  institution: z.string().optional(),
  course: z.string().optional(),
  startDate: z.string().optional()
});

interface EducationInfoFormProps {
  initialData: ProfileFormData['educationInfo'];
  onSubmit: (data: ProfileFormData['educationInfo']) => void;
  onBack: () => void;
}

export function EducationInfoForm({ initialData, onSubmit, onBack }: EducationInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(educationInfoSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Study Level
        </label>
        <select
          {...register('level')}
          className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
        >
          <option value="undergraduate">Undergraduate</option>
          <option value="postgraduate">Postgraduate</option>
        </select>
        {errors.level && (
          <p className="text-sm text-red-500 mt-1">{errors.level.message}</p>
        )}
      </div>

      <FormField
        label="Institution (if selected)"
        error={errors.institution?.message}
        {...register('institution')}
      />

      <FormField
        label="Course (if selected)"
        error={errors.course?.message}
        {...register('course')}
      />

      <FormField
        label="Intended Start Date"
        type="date"
        error={errors.startDate?.message}
        {...register('startDate')}
      />

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Continue
        </Button>
      </div>
    </form>
  );
}