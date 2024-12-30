import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calculator, PiggyBank } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { calculateFinancialPlan } from '@/lib/financial/calculator';
import type { FinancialRequirement, SavingsPlan } from '@/lib/financial/calculator';

const defaultRequirements: FinancialRequirement[] = [
  { type: 'tuition', amount: 30000, frequency: 'yearly', required: true },
  { type: 'living', amount: 21041, frequency: 'yearly', required: true },
  { type: 'insurance', amount: 1000, frequency: 'yearly', required: true },
  { type: 'travel', amount: 3000, frequency: 'once', required: true }
];

export default function FinancialPlanner() {
  const [plan, setPlan] = useState<SavingsPlan>({
    currentSavings: 0,
    monthlyContribution: 0,
    targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    requirements: defaultRequirements
  });

  const [result, setResult] = useState<ReturnType<typeof calculateFinancialPlan> | null>(null);

  const handleCalculate = () => {
    const calculationResult = calculateFinancialPlan(plan);
    setResult(calculationResult);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Financial Planner</h1>
        <p className="text-white/80">
          Plan your finances for studying in Australia with our comprehensive calculator.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Your Financial Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Savings (AUD)
              </label>
              <Input
                type="number"
                value={plan.currentSavings}
                onChange={(e) => setPlan(prev => ({
                  ...prev,
                  currentSavings: Number(e.target.value)
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Monthly Savings Capacity (AUD)
              </label>
              <Input
                type="number"
                value={plan.monthlyContribution}
                onChange={(e) => setPlan(prev => ({
                  ...prev,
                  monthlyContribution: Number(e.target.value)
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Target Start Date
              </label>
              <Input
                type="date"
                value={plan.targetDate.toISOString().split('T')[0]}
                onChange={(e) => setPlan(prev => ({
                  ...prev,
                  targetDate: new Date(e.target.value)
                }))}
              />
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
            >
              Calculate Plan
            </Button>
          </div>
        </Card>

        {result && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Financial Summary</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <span className="font-medium">Total Required</span>
                </div>
                <p className="text-2xl font-bold">
                  {result.totalRequired.toLocaleString()} AUD
                </p>
              </div>

              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <span className="font-medium">Required Monthly Savings</span>
                </div>
                <p className="text-2xl font-bold">
                  {result.requiredMonthlyContribution.toLocaleString()} AUD
                </p>
              </div>

              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <PiggyBank className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <span className="font-medium">Current Progress</span>
                </div>
                <p className="text-2xl font-bold">
                  {result.currentProgress.toFixed(1)}%
                </p>
              </div>

              {!result.isAchievable && (
                <div className="p-4 bg-red-500/20 rounded-lg">
                  <p className="text-red-200">
                    Your current monthly contribution may not be sufficient. 
                    Consider increasing it by {result.shortfall.toLocaleString()} AUD 
                    per month to reach your goal.
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}