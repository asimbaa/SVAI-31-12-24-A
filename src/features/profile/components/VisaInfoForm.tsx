import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

const visaInfoSchema = z.object({
  type: z.string().optional(),
  hasDependents: z.boolean(),
  previousTravel: z.boolean(),
  financiallyReady: z.boolean()
});

interface VisaInfoFormProps {
  initialData: {
    type?: string;
    hasDependents: boolean;
    previousTravel: boolean;
    financiallyReady: boolean;
  };
  onSubmit: (data: z.infer<typeof visaInfoSchema>) => void;
  onBack: () => void;
}

export function VisaInfoForm({ initialData, onSubmit, onBack }: VisaInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(visaInfoSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Visa Type
        </label>
        <Select
          options={[
            { value: '500', label: 'Student Visa (500)' },
            { value: '485', label: 'Graduate Visa (485)' }
          ]}
          {...register('type')}
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            {...register('hasDependents')}
            className="h-4 w-4 text-[hsl(var(--gold))] border-white/10"
          />
          <span className="text-white">Do you have dependents?</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            {...register('previousTravel')}
            className="h-4 w-4 text-[hsl(var(--gold))] border-white/10"
          />
          <span className="text-white">Have you traveled to Australia before?</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            {...register('financiallyReady')}
            className="h-4 w-4 text-[hsl(var(--gold))] border-white/10"
          />
          <span className="text-white">Do you meet the financial requirements?</span>
        </label>
      </div>

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
          Complete Profile
        </Button>
      </div>
    </form>
  );
}