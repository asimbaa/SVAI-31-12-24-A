import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileStepper } from './components/ProfileStepper';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EducationInfoForm } from './components/EducationInfoForm';
import { VisaInfoForm } from './components/VisaInfoForm';
import type { ProfileFormData, ProfileStep, ProfileStepId } from './types';

const steps: ProfileStep[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic personal information',
    component: PersonalInfoForm
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Educational background',
    component: EducationInfoForm
  },
  {
    id: 'visa',
    title: 'Visa Details',
    description: 'Visa preferences and status',
    component: VisaInfoForm
  }
];

interface ProfileCreationProps {
  onComplete: (data: ProfileFormData) => void;
}

export function ProfileCreation({ onComplete }: ProfileCreationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfileFormData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      email: '',
      phone: ''
    },
    educationInfo: {
      level: 'undergraduate'
    },
    visaInfo: {
      hasDependents: false,
      previousTravel: false,
      financiallyReady: false
    }
  });
  const [completedSteps, setCompletedSteps] = useState<ProfileStepId[]>([]);

  const handleStepComplete = useCallback((stepId: ProfileStepId, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId === 'personal' ? 'personalInfo' :
       stepId === 'education' ? 'educationInfo' : 'visaInfo']: data
    }));

    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  }, [currentStep, completedSteps, formData, onComplete]);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto">
      <ProfileStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        completedSteps={completedSteps}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-6">{steps[currentStep].title}</h2>
          <p className="text-white/80 mb-6">{steps[currentStep].description}</p>

          <CurrentStepComponent
            initialData={formData[
              currentStep === 0 ? 'personalInfo' :
              currentStep === 1 ? 'educationInfo' : 'visaInfo'
            ]}
            onSubmit={(data: any) => handleStepComplete(steps[currentStep].id as ProfileStepId, data)}
            onBack={() => setCurrentStep(prev => prev - 1)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}