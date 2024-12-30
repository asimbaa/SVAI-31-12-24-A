import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface EvaluationResult {
  status: 'eligible' | 'conditional' | 'ineligible';
  message: string;
  recommendations: string[];
}

interface ProfileEvaluationProps {
  data: Record<string, string>;
}

export function ProfileEvaluation({ data }: ProfileEvaluationProps) {
  const evaluateProfile = (): EvaluationResult => {
    const hasFinancials = data.financialRequirements === 'Yes';
    const hasDependents = data.dependents === 'Yes';

    if (hasFinancials && !hasDependents) {
      return {
        status: 'eligible',
        message: 'Based on your responses, you appear eligible for a student visa.',
        recommendations: [
          'Prepare financial documentation',
          'Begin gathering required documents',
          'Consider taking an English proficiency test'
        ]
      };
    }

    if (hasFinancials && hasDependents) {
      return {
        status: 'conditional',
        message: 'You may be eligible, but additional requirements apply for dependents.',
        recommendations: [
          'Additional financial proof needed for dependents',
          'Prepare dependent documentation',
          'Consider health insurance requirements'
        ]
      };
    }

    return {
      status: 'ineligible',
      message: 'You may need to address some requirements before proceeding.',
      recommendations: [
        'Review financial requirements',
        'Consider speaking with a financial advisor',
        'Explore scholarship opportunities'
      ]
    };
  };

  const result = evaluateProfile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className={`p-6 rounded-lg ${
        result.status === 'eligible' ? 'bg-green-500/20 border-green-200' :
        result.status === 'conditional' ? 'bg-yellow-500/20 border-yellow-200' :
        'bg-red-500/20 border-red-200'
      } border`}>
        <div className="flex items-start gap-4">
          {result.status === 'eligible' ? (
            <CheckCircle className="w-6 h-6 text-green-200" />
          ) : result.status === 'conditional' ? (
            <AlertCircle className="w-6 h-6 text-yellow-200" />
          ) : (
            <XCircle className="w-6 h-6 text-red-200" />
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-white">
              {result.status === 'eligible' ? 'Eligible' :
               result.status === 'conditional' ? 'Conditionally Eligible' :
               'Additional Requirements Needed'}
            </h3>
            <p className="text-white/80 mb-4">{result.message}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium text-white">Next Steps:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-white/80">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}