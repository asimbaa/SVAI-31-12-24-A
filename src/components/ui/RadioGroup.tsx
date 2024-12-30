import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  'aria-label'?: string;
}

export function RadioGroup({ 
  options, 
  value, 
  onChange, 
  className, 
  required,
  'aria-label': ariaLabel 
}: RadioGroupProps) {
  return (
    <div className={cn("space-y-2", className)} role="radiogroup" aria-label={ariaLabel}>
      {options.map(({ value: optionValue, label, description }) => (
        <label
          key={optionValue}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            value={optionValue}
            checked={value === optionValue}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="h-4 w-4 text-[hsl(var(--gold))] border-white/10 bg-black/20 focus:ring-[hsl(var(--gold))]/20"
            aria-describedby={description ? `${optionValue}-description` : undefined}
          />
          <div>
            <span className="text-sm text-white">{label}</span>
            {description && (
              <p id={`${optionValue}-description`} className="text-xs text-white/60 mt-1">{description}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}