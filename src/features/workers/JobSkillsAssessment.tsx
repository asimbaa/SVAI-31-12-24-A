import { useState } from 'react';
import { SkillsInput } from '@/components/forms/SkillsInput';
import { ExperienceForm } from '@/components/forms/ExperienceForm';

interface JobSkillsAssessmentProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function JobSkillsAssessment({ data, onUpdate, onNext }: JobSkillsAssessmentProps) {
  const [step, setStep] = useState('skills');

  const handleSkillsSubmit = (skills: string[]) => {
    onUpdate({ ...data, skills });
    setStep('experience');
  };

  const handleExperienceSubmit = (experience: string) => {
    onUpdate({ ...data, experience });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Skills & Experience Assessment</h2>
      
      {step === 'skills' && (
        <SkillsInput
          initialSkills={data.skills}
          onSubmit={handleSkillsSubmit}
        />
      )}

      {step === 'experience' && (
        <ExperienceForm
          onSubmit={handleExperienceSubmit}
          onBack={() => setStep('skills')}
        />
      )}
    </div>
  );
}