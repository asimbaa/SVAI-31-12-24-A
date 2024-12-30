import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  resources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

const applicationSteps: GuideStep[] = [
  {
    id: 'coe',
    title: 'Confirmation of Enrolment (CoE)',
    description: 'Obtain your CoE from your chosen educational institution',
    tasks: [
      'Accept your offer letter',
      'Pay initial tuition fee deposit',
      'Submit any required documents',
      'Receive CoE via email'
    ],
    resources: [
      {
        title: 'Understanding your CoE',
        url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/confirmation-of-enrolment',
        description: 'Official guide to CoE from the Department of Home Affairs'
      }
    ]
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Arrange Overseas Student Health Cover (OSHC)',
    tasks: [
      'Choose an approved OSHC provider',
      'Select appropriate coverage duration',
      'Make payment',
      'Save your policy details'
    ],
    resources: [
      {
        title: 'OSHC Providers',
        url: 'https://www.privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm',
        description: 'List of approved OSHC providers in Australia'
      }
    ]
  },
  {
    id: 'application',
    title: 'Visa Application',
    description: 'Complete and submit your student visa application',
    tasks: [
      'Create ImmiAccount',
      'Fill out the application form',
      'Attach required documents',
      'Pay visa application fee'
    ],
    resources: [
      {
        title: 'Student Visa (Subclass 500)',
        url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
        description: 'Official visa information and requirements'
      }
    ]
  }
];

interface ApplicationGuideProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function ApplicationGuide({ data, onUpdate, onNext }: ApplicationGuideProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>('coe');
  const [completedSteps, setCompletedSteps] = useState<string[]>(data.completedSteps || []);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const toggleStepCompletion = (stepId: string) => {
    const newCompletedSteps = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    
    setCompletedSteps(newCompletedSteps);
    onUpdate({ ...data, completedSteps: newCompletedSteps });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Application Process Guide</h2>
      
      <div className="space-y-4">
        {applicationSteps.map((step) => (
          <div
            key={step.id}
            className="border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completedSteps.includes(step.id)}
                  onChange={() => toggleStepCompletion(step.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-white/20"
                />
                <span className="font-medium">{step.title}</span>
              </div>
              {expandedStep === step.id ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {expandedStep === step.id && (
              <div className="p-4 border-t border-white/10 bg-white/5">
                <p className="text-white/80 mb-4">{step.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Tasks:</h4>
                  <ul className="space-y-2">
                    {step.tasks.map((task, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Resources:</h4>
                  <div className="space-y-2">
                    {step.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-[hsl(var(--gold))]">
                            {resource.title}
                          </h5>
                          <ExternalLink className="w-4 h-4 text-white/40" />
                        </div>
                        <p className="text-sm text-white/60">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={() => onNext()}>
          Save Progress
        </Button>
        <Button
          onClick={() => onNext()}
          disabled={completedSteps.length < applicationSteps.length}
        >
          Complete Guide
        </Button>
      </div>
    </div>
  );
}