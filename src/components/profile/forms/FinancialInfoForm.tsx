import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const financialInfoSchema = z.object({
  primarySource: z.enum(['Self', 'Family', 'Loan', 'Scholarship', 'Other']),
  annualIncome: z.string().optional(),
  savings: z.string().optional(),
  hasSponsor: z.boolean(),
  sponsorDetails: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    occupation: z.string().optional(),
    annualIncome: z.string().optional()
  }).optional()
});

type FinancialInfoData = z.infer<typeof financialInfoSchema>;

export interface FinancialInfoFormProps {
  data?: Partial<FinancialInfoData>;
  onSubmit: (data: FinancialInfoData) => void;
  onBack: () => void;
}

export function FinancialInfoForm({ data, onSubmit, onBack }: FinancialInfoFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FinancialInfoData>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: data
  });

  const hasSponsor = watch('hasSponsor');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Primary Source of Funding
        </label>
        <select
          {...register('primarySource')}
          className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
        >
          <option value="Self">Self-funded</option>
          <option value="Family">Family Support</option>
          <option value="Loan">Education Loan</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Other">Other</option>
        </select>
        {errors.primarySource && (
          <p className="text-sm text-red-500 mt-1">{errors.primarySource.message}</p>
        )}
      </div>

      <FormField
        label="Annual Income (AUD)"
        type="number"
        error={errors.annualIncome?.message}
        {...register('annualIncome')}
      />

      <FormField
        label="Total Savings (AUD)"
        type="number"
        error={errors.savings?.message}
        {...register('savings')}
      />

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasSponsor')}
              className="w-4 h-4 rounded border-white/10 bg-black/20"
            />
            <span>Do you have a financial sponsor?</span>
          </label>
        </div>

        {hasSponsor && (
          <div className="space-y-4">
            <FormField
              label="Sponsor's Name"
              error={errors.sponsorDetails?.name?.message}
              {...register('sponsorDetails.name')}
            />

            <FormField
              label="Relationship to Sponsor"
              error={errors.sponsorDetails?.relationship?.message}
              {...register('sponsorDetails.relationship')}
            />

            <FormField
              label="Sponsor's Occupation"
              error={errors.sponsorDetails?.occupation?.message}
              {...register('sponsorDetails.occupation')}
            />

            <FormField
              label="Sponsor's Annual Income (AUD)"
              type="number"
              error={errors.sponsorDetails?.annualIncome?.message}
              {...register('sponsorDetails.annualIncome')}
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