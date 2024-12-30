import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const additionalInfoSchema = z.object({
  hobbies: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  references: z.array(z.object({
    name: z.string().min(1, 'Name is required'),
    position: z.string().min(1, 'Position is required'),
    organization: z.string().min(1, 'Organization is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required')
  })).optional()
});

type AdditionalInfoData = z.infer<typeof additionalInfoSchema>;

export interface AdditionalInfoFormProps {
  data?: Partial<AdditionalInfoData>;
  onSubmit: (data: AdditionalInfoData) => void;
  onBack: () => void;
}

export function AdditionalInfoForm({ data, onSubmit, onBack }: AdditionalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AdditionalInfoData>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: data || { references: [{}] }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Hobbies & Interests</h3>
          <FormField
            label="List your hobbies (comma-separated)"
            as="textarea"
            placeholder="Reading, Photography, Traveling..."
            error={errors.hobbies?.message}
            {...register('hobbies')}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Skills</h3>
          <FormField
            label="List your skills (comma-separated)"
            as="textarea"
            placeholder="Leadership, Communication, Problem Solving..."
            error={errors.skills?.message}
            {...register('skills')}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Achievements</h3>
          <FormField
            label="List your achievements (comma-separated)"
            as="textarea"
            placeholder="Academic awards, Professional certifications..."
            error={errors.achievements?.message}
            {...register('achievements')}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">References</h3>
          {data?.references?.map((_, index) => (
            <div key={index} className="space-y-4 mb-8">
              <h4 className="font-medium">Reference {index + 1}</h4>
              
              <FormField
                label="Full Name"
                error={errors.references?.[index]?.name?.message}
                {...register(`references.${index}.name`)}
              />

              <FormField
                label="Position"
                error={errors.references?.[index]?.position?.message}
                {...register(`references.${index}.position`)}
              />

              <FormField
                label="Organization"
                error={errors.references?.[index]?.organization?.message}
                {...register(`references.${index}.organization`)}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Email Address"
                  type="email"
                  error={errors.references?.[index]?.email?.message}
                  {...register(`references.${index}.email`)}
                />

                <FormField
                  label="Phone Number"
                  error={errors.references?.[index]?.phone?.message}
                  {...register(`references.${index}.phone`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Complete Profile' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}