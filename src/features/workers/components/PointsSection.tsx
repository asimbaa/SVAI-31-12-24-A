import { RadioGroup } from '@/components/ui/RadioGroup';

interface PointsOption {
  label: string;
  value: number;
}

interface PointsSectionProps {
  title: string;
  options: PointsOption[];
  value: number;
  onChange: (value: number) => void;
}

export function PointsSection({ title, options, value, onChange }: PointsSectionProps) {
  return (
    <div className="p-4 bg-black/20 border border-white/10 rounded-lg">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <RadioGroup
        options={options.map(opt => ({
          label: `${opt.label} (${opt.value} points)`,
          value: opt.value.toString()
        }))}
        value={value.toString()}
        onChange={(val) => onChange(Number(val))}
      />
    </div>
  );
}