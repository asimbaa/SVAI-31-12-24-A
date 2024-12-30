import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { SUPPORTED_COUNTRIES } from '@/lib/core/constants';

const experienceSchema = z.object({
  experiences: z.array(z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    country: z.string().min(1, 'Country is required')
  }))
});

type ExperienceData = z.infer<typeof experienceSchema>;

export interface ExperienceFormProps {
  data?: Partial<ExperienceData>;
  onSubmit: (data: ExperienceData) => void;
  onBack: () => void;
}

export function ExperienceForm({ data, onSubmit, onBack }: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: data || { experiences: [{}] }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-8">
        {data?.experiences?.map((_, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium">Experience {index + 1}</h3>
            
            <FormField
              label="Company Name"
              error={errors.experiences?.[index]?.company?.message}
              {...register(`experiences.${index}.company`)}
            />

            <FormField
              label="Position"
              error={errors.experiences?.[index]?.position?.message}
              {...register(`experiences.${index}.position`)}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Start Date"
                type="date"
                error={errors.experiences?.[index]?.startDate?.message}
                {...register(`experiences.${index}.startDate`)}
              />

              <FormField
                label="End Date"
                type="date"
                error={errors.experiences?.[index]?.endDate?.message}
                {...register(`experiences.${index}.endDate`)}
              />
            </div>

            <FormField
              label="Description"
              as="textarea"
              error={errors.experiences?.[index]?.description?.message}
              {...register(`experiences.${index}.description`)}
            />

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Country
              </label>
              <select
                {...register(`experiences.${index}.country`)}
                className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
              >
                <option value="">Select country</option>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.experiences?.[index]?.country && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.experiences[index]?.country?.message}
                </p>
              )}
            </div>
          </div>
        ))}
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