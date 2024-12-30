import { ChevronRight } from 'lucide-react';

interface Visa {
  code: string;
  name: string;
  description: string;
  requirements: string[];
  processingTime: string;
}

interface VisaOptionProps {
  visa: Visa;
  isSelected: boolean;
  onSelect: () => void;
}

export function VisaOption({ visa, isSelected, onSelect }: VisaOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${
        isSelected
          ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">
            {visa.name} (subclass {visa.code})
          </h3>
          <p className="text-white/80 text-sm mb-3">{visa.description}</p>
          
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-white/60">Processing time:</span>{' '}
              <span className="text-white">{visa.processingTime}</span>
            </div>
            
            <div className="space-y-1">
              {visa.requirements.map((req, index) => (
                <p key={index} className="text-sm text-white/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  {req}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 mt-1 transition-colors ${
          isSelected ? 'text-[hsl(var(--gold))]' : 'text-white/40'
        }`} />
      </div>
    </button>
  );
}