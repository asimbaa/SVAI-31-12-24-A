import { useEffect, useState } from 'react';
import { PASSWORD_REQUIREMENTS } from '@/lib/auth/constants';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    hasValue: false
  });

  useEffect(() => {
    const newChecks = {
      length: password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH,
      hasValue: password.length > 0
    };

    setChecks(newChecks);
    setStrength(Object.values(newChecks).filter(Boolean).length);
  }, [password]);

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              level <= strength
                ? 'bg-[hsl(var(--gold))]'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <ul className="text-sm space-y-1">
        <li className={checks.length ? 'text-green-500' : 'text-white/60'}>
          • At least {PASSWORD_REQUIREMENTS.MIN_LENGTH} characters
        </li>
      </ul>
    </div>
  );
}