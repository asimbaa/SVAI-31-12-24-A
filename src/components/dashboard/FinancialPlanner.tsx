import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PiggyBank } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';

interface FinancialPlannerProps {
  data: {
    totalRequired: number;
    currentSavings: number;
    monthlyTarget: number;
    currency: string;
  };
  onViewDetails: () => void;
}

export function FinancialPlanner({ data, onViewDetails }: FinancialPlannerProps) {
  const progress = Math.round((data.currentSavings / data.totalRequired) * 100);

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Financial Planning</h2>
          <button
            onClick={onViewDetails}
            className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
          >
            View Details →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <ProgressRing progress={progress} />
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-black/20 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-[hsl(var(--gold))]" />
                <span className="font-medium">Total Required</span>
              </div>
              <p className="text-2xl font-bold">{data.totalRequired.toLocaleString()} {data.currency}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-black/20 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <PiggyBank className="w-4 h-4 text-[hsl(var(--gold))]" />
                <span className="font-medium">Current Savings</span>
              </div>
              <p className="text-2xl font-bold">{data.currentSavings.toLocaleString()} {data.currency}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-black/20 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--gold))]" />
                <span className="font-medium">Monthly Target</span>
              </div>
              <p className="text-2xl font-bold">{data.monthlyTarget.toLocaleString()} {data.currency}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
}