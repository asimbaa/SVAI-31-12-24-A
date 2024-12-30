import { useEffect, useState } from 'react';
import { calculateVisaProbability } from '@/utils/visaCalculations';
import { ProgressRing } from '@/components/ui/ProgressRing';

interface VisaProbabilityMeterProps {
  data: any;
}

export function VisaProbabilityMeter({ data }: VisaProbabilityMeterProps) {
  const [probability, setProbability] = useState(0);

  useEffect(() => {
    const score = calculateVisaProbability(data);
    setProbability(score);
  }, [data]);

  return (
    <div className="mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
      <h3 className="text-xl font-semibold mb-4">Visa Success Probability</h3>
      <div className="flex items-center gap-6">
        <ProgressRing progress={probability} />
        <div>
          <p className="text-lg font-medium mb-2">
            {probability}% Probability
          </p>
          <p className="text-white/80">
            Based on your provided information and current visa criteria
          </p>
        </div>
      </div>
    </div>
  );
}