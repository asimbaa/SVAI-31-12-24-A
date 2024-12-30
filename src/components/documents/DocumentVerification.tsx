import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface VerificationResult {
  isValid: boolean;
  confidence: number;
  issues?: string[];
  suggestions?: string[];
}

interface DocumentVerificationProps {
  result: VerificationResult;
  onRetry: () => void;
}

export function DocumentVerification({ result, onRetry }: DocumentVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10"
    >
      <div className="flex items-start gap-4">
        {result.isValid ? (
          <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
        ) : result.confidence > 0.5 ? (
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400 mt-1" />
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">
              Document Verification Result
            </h4>
            <span className="text-sm text-white/60">
              Confidence: {Math.round(result.confidence * 100)}%
            </span>
          </div>

          {result.issues && result.issues.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-red-400 mb-1">Issues:</p>
              <ul className="list-disc pl-5 space-y-1">
                {result.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-red-300">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.suggestions && result.suggestions.length > 0 && (
            <div>
              <p className="text-sm font-medium text-yellow-400 mb-1">
                Suggestions:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-yellow-300">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!result.isValid && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
            >
              Upload New Document
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}