import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';

const educationSchema = z.object({
  highestQualification: z.string().min(1, 'Qualification is required'),
  institution: z.string().min(1, 'Institution is required'),
  graduationYear: z.string().min(1, 'Graduation year is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  gpa: z.string().optional(),
  englishProficiency: z.object({
    testType: z.enum(['IELTS', 'TOEFL', 'PTE', 'None']),
    overallScore: z.string().optional(),
    testDate: z.string().optional()
  })
});

type EducationData = z.infer<typeof educationSchema>;

export interface EducationFormProps {
  data?: Partial<EducationData>;
  onSubmit: (data: EducationData) => void;
  onBack: () => void;
}

export function EducationForm({ data, onSubmit, onBack }: EducationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<EducationData>({
    resolver: zodResolver(educationSchema),
    defaultValues: data
  });

  const testType = watch('englishProficiency.testType');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Highest Qualification"
        error={errors.highestQualification?.message}
        {...register('highestQualification')}
      />

      <FormField
        label="Institution"
        error={errors.institution?.message}
        {...register('institution')}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Field of Study"
          error={errors.fieldOfStudy?.message}
          {...register('fieldOfStudy')}
        />

        <FormField
          label="Graduation Year"
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          error={errors.graduationYear?.message}
          {...register('graduationYear')}
        />
      </div>

      <FormField
        label="GPA (Optional)"
        error={errors.gpa?.message}
        {...register('gpa')}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">English Proficiency</h3>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Test Type
          </label>
          <select
            {...register('englishProficiency.testType')}
            className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white"
          >
            <option value="None">No Test</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE">PTE Academic</option>
          </select>
        </div>

        {testType !== 'None' && (
          <>
            <FormField
              label="Overall Score"
              error={errors.englishProficiency?.overallScore?.message}
              {...register('englishProficiency.overallScore')}
            />

            <FormField
              label="Test Date"
              type="date"
              error={errors.englishProficiency?.testDate?.message}
              {...register('englishProficiency.testDate')}
            />
          </>
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