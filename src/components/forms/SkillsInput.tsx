import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';

interface SkillsInputProps {
  initialSkills: string[];
  onSubmit: (skills: string[]) => void;
}

export function SkillsInput({ initialSkills, onSubmit }: SkillsInputProps) {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          placeholder="Enter a skill..."
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
        />
        <Button onClick={addSkill}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full"
          >
            <span className="text-sm text-white">{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSubmit(skills)}
        disabled={skills.length === 0}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}