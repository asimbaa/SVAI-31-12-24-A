import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ExperienceFormProps {
  onSubmit: (experience: string) => void;
  onBack: () => void;
}

export function ExperienceForm({ onSubmit, onBack }: ExperienceFormProps) {
  const [currentRole, setCurrentRole] = useState('');
  const [duration, setDuration] = useState('');

  const durationOptions = [
    { value: '1-2', label: '1-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-8', label: '5-8 years' },
    { value: '8+', label: '8+ years' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(`${currentRole} - ${duration} years`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Current/Most Recent Role
        </label>
        <Input
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          placeholder="e.g., Software Engineer"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">
          Years of Experience
        </label>
        <Select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          options={durationOptions}
          required
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={!currentRole || !duration}>
          Continue
        </Button>
      </div>
    </form>
  );
}