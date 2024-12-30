import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  EligibilityForm,
  EligibilityResult as EligibilityResultComponent,
  calculateEligibility,
  type EligibilityFormData,
  type EligibilityResultType
} from '@/features/eligibility';

export default function EligibilityCheck() {
  const [result, setResult] = useState<EligibilityResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = useCallback(async (data: EligibilityFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculateEligibility(data);
      if (result) {
        setResult(result);
      } else {
        setError('Failed to calculate eligibility. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while calculating eligibility. Please try again.');
      console.error('Eligibility calculation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Check Your Student Visa Eligibility</h1>
        <p className="text-xl text-white/80">
          Answer a few questions to check your eligibility for an Australian student visa
        </p>
      </motion.div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="animate-pulse text-white/80">Calculating eligibility...</div>
        </div>
      ) : result ? (
        <EligibilityResultComponent result={result} onReset={handleReset} />
      ) : (
        <EligibilityForm onComplete={handleComplete} />
      )}
    </div>
  );
}