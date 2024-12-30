export interface FinancialRequirement {
  type: 'tuition' | 'living' | 'insurance' | 'travel';
  amount: number;
  frequency: 'once' | 'yearly' | 'monthly';
  required: boolean;
}

export interface SavingsPlan {
  currentSavings: number;
  monthlyContribution: number;
  targetDate: Date;
  requirements: FinancialRequirement[];
}

export function calculateFinancialPlan(plan: SavingsPlan) {
  const totalRequired = plan.requirements.reduce((total, req) => {
    let amount = req.amount;
    if (req.frequency === 'yearly') {
      const years = Math.ceil((plan.targetDate.getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000));
      amount *= years;
    } else if (req.frequency === 'monthly') {
      const months = Math.ceil((plan.targetDate.getTime() - Date.now()) / (30 * 24 * 60 * 60 * 1000));
      amount *= months;
    }
    return total + amount;
  }, 0);

  const monthsUntilTarget = Math.ceil((plan.targetDate.getTime() - Date.now()) / (30 * 24 * 60 * 60 * 1000));
  const remainingAmount = totalRequired - plan.currentSavings;
  const requiredMonthlyContribution = remainingAmount / monthsUntilTarget;

  return {
    totalRequired,
    remainingAmount,
    requiredMonthlyContribution,
    currentProgress: (plan.currentSavings / totalRequired) * 100,
    isAchievable: plan.monthlyContribution >= requiredMonthlyContribution,
    shortfall: Math.max(0, requiredMonthlyContribution - plan.monthlyContribution)
  };
}