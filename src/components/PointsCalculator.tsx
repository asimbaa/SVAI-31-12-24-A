import { useState } from 'react';
import { pointsSystem } from '../data/pointsSystem';

interface CalculatorProps {
  onPointsUpdate: (points: number) => void;
}

export default function PointsCalculator({ onPointsUpdate }: CalculatorProps) {
  const [selectedPoints, setSelectedPoints] = useState({
    age: 0,
    qualifications: 0,
    experience: 0,
    english: 0
  });

  const updatePoints = (category: keyof typeof selectedPoints, points: number) => {
    const newPoints = {
      ...selectedPoints,
      [category]: points
    };
    setSelectedPoints(newPoints);
    onPointsUpdate(Object.values(newPoints).reduce((a, b) => a + b, 0));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Age</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pointsSystem.age.map((option) => (
            <label
              key={option.range}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="age"
                className="form-radio"
                onChange={() => updatePoints('age', option.points)}
              />
              <div>
                <p className="font-medium">{option.range}</p>
                <p className="text-sm text-gray-600">{option.points} points</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Educational Qualifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pointsSystem.qualifications.map((option) => (
            <label
              key={option.level}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="qualifications"
                className="form-radio"
                onChange={() => updatePoints('qualifications', option.points)}
              />
              <div>
                <p className="font-medium capitalize">{option.level}</p>
                <p className="text-sm text-gray-600">{option.points} points</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pointsSystem.experience.map((option) => (
            <label
              key={option.years}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="experience"
                className="form-radio"
                onChange={() => updatePoints('experience', option.points)}
              />
              <div>
                <p className="font-medium">{option.years} years</p>
                <p className="text-sm text-gray-600">{option.points} points</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">English Language Proficiency</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pointsSystem.english.map((option) => (
            <label
              key={option.level}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="english"
                className="form-radio"
                onChange={() => updatePoints('english', option.points)}
              />
              <div>
                <p className="font-medium capitalize">{option.level}</p>
                <p className="text-sm text-gray-600">{option.points} points</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}