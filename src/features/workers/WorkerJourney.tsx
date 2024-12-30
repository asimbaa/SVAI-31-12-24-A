import { useState } from 'react';
import { JobSkillsAssessment } from './JobSkillsAssessment';
import { VisaOptionsGuide } from './VisaOptionsGuide';
import { PointsCalculator } from './PointsCalculator';
import { StepProgress } from '@/components/ui/StepProgress';

export function WorkerJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [workerData, setWorkerData] = useState({
    skills: [],
    experience: '',
    occupation: '',
  });

  const steps = [
    { title: 'Skills Assessment', component: JobSkillsAssessment },
    { title: 'Visa Options', component: VisaOptionsGuide },
    { title: 'Points Calculator', component: PointsCalculator },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto">
      <StepProgress
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
      
      <div className="mt-8">
        <CurrentStepComponent
          data={workerData}
          onUpdate={setWorkerData}
          onNext={() => setCurrentStep(prev => prev + 1)}
        />
      </div>
    </div>
  );
}