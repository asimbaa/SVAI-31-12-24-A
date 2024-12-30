import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';

interface FinancialOverviewProps {
  data: {
    totalRequired: number;
    currentSavings: number;
    monthlyTarget: number;
    monthlyActual: number;
    currency: string;
    expenses: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
}

export function FinancialOverview({ data }: FinancialOverviewProps) {
  const progress = Math.round((data.currentSavings / data.totalRequired) * 100);
  const monthlyProgress = Math.round((data.monthlyActual / data.monthlyTarget) * 100);

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Financial Overview</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <div className="relative">
              <ProgressRing progress={progress} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-white/60">Saved</span>
                <span className="text-lg font-bold">{progress}%</span>
              </div>
            </div>
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
              <p className="text-2xl font-bold">
                {data.totalRequired.toLocaleString()} {data.currency}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-black/20 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--gold))]" />
                <span className="font-medium">Monthly Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  {monthlyProgress}%
                </p>
                <span className="text-sm text-white/60">
                  {data.monthlyActual.toLocaleString()} / {data.monthlyTarget.toLocaleString()} {data.currency}
                </span>
              </div>
            </motion.div>

            {monthlyProgress < 100 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-red-500/20 rounded-lg flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <p className="text-sm text-red-200">
                  You're {data.monthlyTarget - data.monthlyActual} {data.currency} below your monthly target.
                  Consider reducing expenses or finding additional income sources.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {data.expenses.map((expense) => (
              <div key={expense.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{expense.category}</span>
                  <span className="text-white/60">
                    {expense.amount.toLocaleString()} {data.currency} ({expense.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--gold))] rounded-full transition-all"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}