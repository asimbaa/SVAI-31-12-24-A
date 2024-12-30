import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import type { Scholarship } from '@/lib/types/scholarship';
import { Button } from '../ui/Button';
import { FormField } from '../forms/FormField';

interface ScholarshipApplicationWizardProps {
  scholarship: Scholarship;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ScholarshipApplicationWizard({
  scholarship,
  onClose,
  onSubmit
}: ScholarshipApplicationWizardProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    personalStatement: '',
    references: ['', ''],
    documents: {} as Record<string, File>
  });

  const steps = [
    {
      title: 'Personal Statement',
      component: (
        <FormField
          label="Personal Statement"
          as="textarea"
          value={formData.personalStatement}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            personalStatement: e.target.value
          }))}
          helperText="Explain why you deserve this scholarship"
        />
      )
    },
    {
      title: 'References',
      component: (
        <div className="space-y-4">
          {formData.references.map((ref, index) => (
            <FormField
              key={index}
              label={`Reference ${index + 1}`}
              value={ref}
              onChange={(e) => {
                const newRefs = [...formData.references];
                newRefs[index] = e.target.value;
                setFormData(prev => ({ ...prev, references: newRefs }));
              }}
              placeholder="Enter reference email"
            />
          ))}
        </div>
      )
    },
    {
      title: 'Documents',
      component: (
        <div className="space-y-4">
          {scholarship.documents.map((doc) => (
            <div
              key={doc.name}
              className="p-4 bg-black/20 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-white/60">{doc.description}</p>
                </div>
                {formData.documents[doc.name] ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <FileText className="w-5 h-5 text-white/40" />
                )}
              </div>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: {
                        ...prev.documents,
                        [doc.name]: file
                      }
                    }));
                  }
                }}
                className="hidden"
                id={`file-${doc.name}`}
              />
              <label
                htmlFor={`file-${doc.name}`}
                className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition-colors"
              >
                {formData.documents[doc.name] ? 'Change File' : 'Upload File'}
              </label>
            </div>
          ))}
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 max-w-2xl w-full"
    >
      <h2 className="text-2xl font-bold mb-6">Apply for Scholarship</h2>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/60">
            Step {step + 1} of {steps.length}
          </span>
          <h3 className="font-medium">{steps[step].title}</h3>
        </div>
        <div className="h-1 bg-white/10 rounded-full">
          <div
            className="h-full bg-[hsl(var(--gold))] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        {steps[step].component}
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={step === 0 ? onClose : () => setStep(prev => prev - 1)}
          className="flex-1"
        >
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
        >
          {step === steps.length - 1 ? 'Submit Application' : 'Continue'}
        </Button>
      </div>
    </motion.div>
  );
}