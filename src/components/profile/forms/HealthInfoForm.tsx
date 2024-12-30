import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const healthInfoSchema = z.object({
  hasHealthConditions: z.boolean(),
  healthConditionDetails: z.string().optional(),
  hasHealthInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  coverageEndDate: z.string().optional()
});

type HealthInfoData = z.infer<typeof healthInfoSchema>;

export interface HealthInfoFormProps {
  data?: Partial<HealthInfoData>;
  onSubmit: (data: HealthInfoData) => void;
  onBack: () => void;
}

export function HealthInfoForm({ data, onSubmit, onBack }: HealthInfoFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<HealthInfoData>({
    resolver: zodResolver(healthInfoSchema),
    defaultValues: data
  });

  const hasHealthConditions = watch('hasHealthConditions');
  const hasHealthInsurance = watch('hasHealthInsurance');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasHealthConditions')}
              className="w-4 h-4 rounded border-white/10 bg-black/20"
            />
            <span>Do you have any pre-existing health conditions?</span>
          </label>
        </div>

        {hasHealthConditions && (
          <FormField
            label="Please provide details"
            as="textarea"
            error={errors.healthConditionDetails?.message}
            {...register('healthConditionDetails')}
          />
        )}

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasHealthInsurance')}
              className="w-4 h-4 rounded border-white/10 bg-black/20"
            />
            <span>Do you have Overseas Student Health Cover (OSHC)?</span>
          </label>
        </div>

        {hasHealthInsurance && (
          <div className="space-y-4">
            <FormField
              label="Insurance Provider"
              error={errors.insuranceProvider?.message}
              {...register('insuranceProvider')}
            />

            <FormField
              label="Policy Number"
              error={errors.policyNumber?.message}
              {...register('policyNumber')}
            />

            <FormField
              label="Coverage End Date"
              type="date"
              error={errors.coverageEndDate?.message}
              {...register('coverageEndDate')}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}