import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const emergencyContactSchema = z.object({
  contacts: z.array(z.object({
    name: z.string().min(1, 'Name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required')
  })).min(1, 'At least one emergency contact is required')
});

type EmergencyContactData = z.infer<typeof emergencyContactSchema>;

export interface EmergencyContactsFormProps {
  data?: Partial<EmergencyContactData>;
  onSubmit: (data: EmergencyContactData) => void;
  onBack: () => void;
}

export function EmergencyContactsForm({ data, onSubmit, onBack }: EmergencyContactsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EmergencyContactData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: data || { contacts: [{}] }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-8">
        {data?.contacts?.map((_, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contact {index + 1}</h3>
            
            <FormField
              label="Full Name"
              error={errors.contacts?.[index]?.name?.message}
              {...register(`contacts.${index}.name`)}
            />

            <FormField
              label="Relationship"
              error={errors.contacts?.[index]?.relationship?.message}
              {...register(`contacts.${index}.relationship`)}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Phone Number"
                error={errors.contacts?.[index]?.phone?.message}
                {...register(`contacts.${index}.phone`)}
              />

              <FormField
                label="Email Address"
                type="email"
                error={errors.contacts?.[index]?.email?.message}
                {...register(`contacts.${index}.email`)}
              />
            </div>

            <FormField
              label="Address"
              as="textarea"
              error={errors.contacts?.[index]?.address?.message}
              {...register(`contacts.${index}.address`)}
            />
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