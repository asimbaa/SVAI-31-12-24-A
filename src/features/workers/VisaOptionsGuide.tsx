import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { VisaOption } from './components/VisaOption';
import { getRecommendedVisas } from '@/utils/visaRecommendations';

interface VisaOptionsGuideProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function VisaOptionsGuide({ data, onUpdate, onNext }: VisaOptionsGuideProps) {
  const [selectedVisa, setSelectedVisa] = useState<string | null>(data.selectedVisa || null);
  const recommendedVisas = getRecommendedVisas(data);

  const handleVisaSelect = (visaCode: string) => {
    setSelectedVisa(visaCode);
    onUpdate({ ...data, selectedVisa: visaCode });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Recommended Visa Options</h2>
        <p className="text-white/80">
          Based on your skills and experience, here are the most suitable visa options:
        </p>
      </div>

      <div className="space-y-4">
        {recommendedVisas.map((visa) => (
          <VisaOption
            key={visa.code}
            visa={visa}
            isSelected={selectedVisa === visa.code}
            onSelect={() => handleVisaSelect(visa.code)}
          />
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t border-white/10">
        <Button variant="outline" onClick={() => onNext()}>
          Save Progress
        </Button>
        <Button
          onClick={() => onNext()}
          disabled={!selectedVisa}
        >
          Continue with Selected Visa
        </Button>
      </div>
    </div>
  );
}