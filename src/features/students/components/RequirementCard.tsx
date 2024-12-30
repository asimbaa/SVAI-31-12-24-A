import { Check, AlertCircle } from 'lucide-react';

interface RequirementCardProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isRequired: boolean;
}

export function RequirementCard({
  title,
  description,
  isCompleted,
  isRequired
}: RequirementCardProps) {
  return (
    <div className="p-4 bg-black/20 border border-white/10 rounded-lg">
      <div className="flex items-start gap-4">
        <div className={isCompleted ? 'text-green-500' : 'text-yellow-500'}>
          {isCompleted ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white">{title}</h4>
            {isRequired && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded-full">
                Required
              </span>
            )}
          </div>
          {description && (
            <p className="text-white/80 text-sm">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}