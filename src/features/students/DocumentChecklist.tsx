import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Circle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  tips: string[];
}

const studentDocuments: Document[] = [
  {
    id: 'passport',
    name: 'Valid Passport',
    description: 'Must have at least 6 months validity',
    required: true,
    tips: [
      'Ensure all pages are clear and readable',
      'Include all pages, even blank ones'
    ]
  },
  {
    id: 'academic',
    name: 'Academic Documents',
    description: 'Transcripts and certificates',
    required: true,
    tips: [
      'Must be certified copies',
      'Include English translations if applicable'
    ]
  },
  {
    id: 'english',
    name: 'English Test Results',
    description: 'IELTS, PTE, or equivalent',
    required: true,
    tips: [
      'Test must be taken within last 2 years',
      'Check minimum scores for your course'
    ]
  },
  {
    id: 'financial',
    name: 'Financial Documents',
    description: 'Proof of financial capacity',
    required: true,
    tips: [
      'Bank statements for last 3 months',
      'Include any scholarship letters'
    ]
  }
];

interface DocumentChecklistProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function DocumentChecklist({ data, onUpdate, onNext }: DocumentChecklistProps) {
  const [checkedDocs, setCheckedDocs] = useState<string[]>(data.checkedDocuments || []);

  const toggleDocument = (id: string) => {
    const newCheckedDocs = checkedDocs.includes(id)
      ? checkedDocs.filter(docId => docId !== id)
      : [...checkedDocs, id];
    
    setCheckedDocs(newCheckedDocs);
    onUpdate({ ...data, checkedDocuments: newCheckedDocs });
  };

  const requiredDocsChecked = studentDocuments
    .filter(doc => doc.required)
    .every(doc => checkedDocs.includes(doc.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Required Documents</h2>
        <span className="text-sm text-white/60">
          {checkedDocs.length} of {studentDocuments.length} complete
        </span>
      </div>

      <div className="space-y-4">
        {studentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="p-4 bg-black/20 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleDocument(doc.id)}
                className="mt-1 text-white/60 hover:text-white"
              >
                {checkedDocs.includes(doc.id) ? (
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--gold))]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{doc.name}</h3>
                  {doc.required && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-sm mb-2">{doc.description}</p>
                
                <div className="space-y-1">
                  {doc.tips.map((tip, index) => (
                    <p key={index} className="text-white/60 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/60" />
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={() => onNext()}>
          Save Progress
        </Button>
        <Button
          onClick={() => onNext()}
          disabled={!requiredDocsChecked}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}