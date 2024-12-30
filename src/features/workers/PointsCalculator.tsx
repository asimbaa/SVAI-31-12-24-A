import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { calculatePoints } from '@/utils/pointsCalculation';
import { PointsSection } from './components/PointsSection';

interface PointsCalculatorProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function PointsCalculator({ data, onUpdate, onNext }: PointsCalculatorProps) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [sections, setSections] = useState({
    age: 0,
    english: 0,
    education: 0,
    experience: 0
  });

  useEffect(() => {
    const points = calculatePoints(sections);
    setTotalPoints(points);
    onUpdate({ ...data, points: sections, totalPoints: points });
  }, [sections]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Points Calculator</h2>
        <div className="text-xl font-bold text-[hsl(var(--gold))]">
          Total Points: {totalPoints}
        </div>
      </div>

      <PointsSection
        title="Age"
        options={[
          { label: '18-24 years', value: 25 },
          { label: '25-32 years', value: 30 },
          { label: '33-39 years', value: 25 },
          { label: '40-44 years', value: 15 },
          { label: '45+ years', value: 0 }
        ]}
        value={sections.age}
        onChange={(value) => setSections({ ...sections, age: value })}
      />

      <PointsSection
        title="English Language Ability"
        options={[
          { label: 'Superior - IELTS 8+', value: 20 },
          { label: 'Proficient - IELTS 7+', value: 10 },
          { label: 'Competent - IELTS 6+', value: 0 }
        ]}
        value={sections.english}
        onChange={(value) => setSections({ ...sections, english: value })}
      />

      <PointsSection
        title="Educational Qualifications"
        options={[
          { label: 'Doctorate', value: 20 },
          { label: 'Masters Degree', value: 15 },
          { label: 'Bachelor Degree', value: 10 }
        ]}
        value={sections.education}
        onChange={(value) => setSections({ ...sections, education: value })}
      />

      <PointsSection
        title="Work Experience"
        options={[
          { label: '8+ years', value: 15 },
          { label: '5-7 years', value: 10 },
          { label: '3-4 years', value: 5 },
          { label: '0-2 years', value: 0 }
        ]}
        value={sections.experience}
        onChange={(value) => setSections({ ...sections, experience: value })}
      />

      <div className="flex justify-between pt-6 border-t border-white/10">
        <Button variant="outline" onClick={() => onNext()}>
          Save Progress
        </Button>
        <Button
          onClick={() => onNext()}
          disabled={totalPoints < 65}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}