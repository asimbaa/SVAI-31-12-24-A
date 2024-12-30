import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { VisaInfoForm } from './forms/VisaInfoForm';
import { FinancialInfoForm } from './forms/FinancialInfoForm';
import { HealthInfoForm } from './forms/HealthInfoForm';
import { EmergencyContactsForm } from './forms/EmergencyContactsForm';
import { AdditionalInfoForm } from './forms/AdditionalInfoForm';
import type {
  EducationFormData,
  ExperienceFormData,
  VisaInfoFormData,
  FinancialInfoFormData,
  HealthInfoFormData,
  EmergencyContactsFormData,
  AdditionalInfoFormData
} from './forms/types';
import type { ProfileData, PersonalInfoData } from '@/lib/types/profile';

type StepData =
  | PersonalInfoData
  | EducationFormData 
  | ExperienceFormData 
  | VisaInfoFormData 
  | FinancialInfoFormData 
  | HealthInfoFormData 
  | EmergencyContactsFormData 
  | AdditionalInfoFormData;
const formSteps = [
  { id: 'personal', title: 'Personal Information', component: PersonalInfoForm },
  { id: 'education', title: 'Educational Background', component: EducationForm },
  { id: 'experience', title: 'Professional Experience', component: ExperienceForm },
  { id: 'visa', title: 'Visa Information', component: VisaInfoForm },
  { id: 'financial', title: 'Financial Information', component: FinancialInfoForm },
  { id: 'health', title: 'Health Information', component: HealthInfoForm },
  { id: 'emergency', title: 'Emergency Contacts', component: EmergencyContactsForm },
  { id: 'additional', title: 'Additional Information', component: AdditionalInfoForm }
];

interface CreateProfileFormProps {
  initialData?: Partial<{
    personalInfo: PersonalInfoData;
    education?: ProfileData['education'];
    visaInfo?: ProfileData['visaInfo'];
  }>;
  onSubmit: (data: ProfileData) => void;
}

export function CreateProfileForm({ initialData, onSubmit }: CreateProfileFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ProfileData>>(initialData || {});

  type StepComponentProps = {
    data: Partial<ProfileData>;
    onSubmit: (data: StepData) => void;
    onBack?: () => void;
  };
  const CurrentStepComponent = formSteps[currentStep].component as React.ComponentType<StepComponentProps>;

  const handleStepSubmit = (stepData: StepData) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(updatedData as ProfileData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Create Your Profile</h2>
          <span className="text-sm text-white/60">
            Step {currentStep + 1} of {formSteps.length}
          </span>
        </div>
        <div className="mt-4 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full">
            <motion.div
              className="h-full bg-[hsl(var(--gold))] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="p-6">
        <CurrentStepComponent
          data={formData}
          onSubmit={handleStepSubmit}
          onBack={currentStep > 0 ? () => setCurrentStep(prev => prev - 1) : undefined}
        />
      </Card>
    </div>
  );
}