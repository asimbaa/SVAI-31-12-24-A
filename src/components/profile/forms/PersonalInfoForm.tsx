import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { SUPPORTED_COUNTRIES } from '@/lib/core/constants';

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  passportExpiry: z.string().min(1, 'Passport expiry date is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State/Province is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required')
  })
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export interface PersonalInfoFormProps {
  data?: Partial<PersonalInfoData>;
  onSubmit: (data: PersonalInfoData) => void;
}

export function PersonalInfoForm({ data, onSubmit }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Nationality
          </label>
          <select
            {...register('nationality')}
            className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
          >
            <option value="">Select nationality</option>
            {SUPPORTED_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-sm text-red-500 mt-1">{errors.nationality.message}</p>
          )}
        </div>

        <FormField
          label="Passport Number"
          error={errors.passportNumber?.message}
          {...register('passportNumber')}
        />
      </div>

      <FormField
        label="Passport Expiry Date"
        type="date"
        error={errors.passportExpiry?.message}
        {...register('passportExpiry')}
      />

      <div className="grid md:grid-cols-2 gap-6">
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address</h3>
        
        <FormField
          label="Street Address"
          error={errors.address?.street?.message}
          {...register('address.street')}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="City"
            error={errors.address?.city?.message}
            {...register('address.city')}
          />

          <FormField
            label="State/Province"
            error={errors.address?.state?.message}
            {...register('address.state')}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Postal Code"
            error={errors.address?.postalCode?.message}
            {...register('address.postalCode')}
          />

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Country
            </label>
            <select
              {...register('address.country')}
              className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
            >
              <option value="">Select country</option>
              {SUPPORTED_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.address?.country && (
              <p className="text-sm text-red-500 mt-1">{errors.address.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}