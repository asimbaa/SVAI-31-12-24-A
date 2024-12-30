import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const visaInfoSchema = z.object({
  intendedCourse: z.string().optional(),
  preferredInstitutions: z.array(z.string()).optional(),
  studyLevel: z.enum(['Undergraduate', 'Postgraduate', 'Research', 'Vocational']),
  expectedStartDate: z.string().optional(),
  hasRefusedVisaBefore: z.boolean(),
  refusedVisaDetails: z.string().optional(),
  hasCriminalRecord: z.boolean(),
  criminalRecordDetails: z.string().optional()
});

type VisaInfoData = z.infer<typeof visaInfoSchema>;

export interface VisaInfoFormProps {
  data?: Partial<VisaInfoData>;
  onSubmit: (data: VisaInfoData) => void;
  onBack: () => void;
}

export function VisaInfoForm({ data, onSubmit, onBack }: VisaInfoFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<VisaInfoData>({
    resolver: zodResolver(visaInfoSchema),
    defaultValues: data
  });

  const hasRefusedVisa = watch('hasRefusedVisaBefore');
  const hasCriminalRecord = watch('hasCriminalRecord');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Study Level
        </label>
        <select
          {...register('studyLevel')}
          className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
        >
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Research">Research</option>
          <option value="Vocational">Vocational</option>
        </select>
        {errors.studyLevel && (
          <p className="text-sm text-red-500 mt-1">{errors.studyLevel.message}</p>
        )}
      </div>

      <FormField
        label="Intended Course"
        error={errors.intendedCourse?.message}
        {...register('intendedCourse')}
      />

      <FormField
        label="Expected Start Date"
        type="date"
        error={errors.expectedStartDate?.message}
        {...register('expectedStartDate')}
      />

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasRefusedVisaBefore')}
              className="w-4 h-4 rounded border-white/10 bg-black/20"
            />
            <span>Have you ever had a visa refused or cancelled?</span>
          </label>
        </div>

        {hasRefusedVisa && (
          <FormField
            label="Please provide details"
            as="textarea"
            error={errors.refusedVisaDetails?.message}
            {...register('refusedVisaDetails')}
          />
        )}

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasCriminalRecord')}
              className="w-4 h-4 rounded border-white/10 bg-black/20"
            />
            <span>Do you have any criminal convictions?</span>
          </label>
        </div>

        {hasCriminalRecord && (
          <FormField
            label="Please provide details"
            as="textarea"
            error={errors.criminalRecordDetails?.message}
            {...register('criminalRecordDetails')}
          />
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