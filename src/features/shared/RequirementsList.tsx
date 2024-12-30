import { Check, AlertCircle } from 'lucide-react';

interface Requirement {
  id: string;
  title: string;
  description: string;
  met: boolean;
  importance: 'required' | 'recommended';
}

interface RequirementsListProps {
  requirements: Requirement[];
}

export function RequirementsList({ requirements }: RequirementsListProps) {
  return (
    <div className="space-y-4">
      {requirements.map((req) => (
        <div
          key={req.id}
          className="p-4 bg-black/20 border border-white/10 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 ${
              req.met ? 'text-green-500' : 'text-yellow-500'
            }`}>
              {req.met ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{req.title}</h4>
                {req.importance === 'required' && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded-full">
                    Required
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm">{req.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}