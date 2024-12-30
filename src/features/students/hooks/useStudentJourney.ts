import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNotifications } from '@/hooks/useNotifications';

interface StudentData {
  course: string;
  duration: string;
  institution: string;
  documents: string[];
  completedSteps: string[];
}

export const useStudentJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentData, setStudentData] = useState<StudentData>({
    course: '',
    duration: '',
    institution: '',
    documents: [],
    completedSteps: []
  });

  const { trackEvent } = useAnalytics('student');
  const { addNotification } = useNotifications();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    trackEvent('step_completed', {
      stepId: step,
      previousStep: currentStep,
      type: 'step_completed'
    });

    addNotification({
      type: 'success',
      message: 'Progress saved successfully',
      duration: 3000
    });
  };

  const updateStudentData = (data: Partial<StudentData>) => {
    setStudentData(prev => {
      const newData = { ...prev, ...data };
      trackEvent('journey_started', {
        fields: Object.keys(data),
        type: 'journey_started'
      });
      return newData;
    });
  };

  return {
    currentStep,
    studentData,
    handleStepChange,
    updateStudentData
  };
};