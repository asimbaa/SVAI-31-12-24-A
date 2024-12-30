import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { GraduationCap } from 'lucide-react';

interface ScholarshipTrend {
  type: string;
  amount: number;
  recipients: number;
  changePercent: number;
}

const trends: ScholarshipTrend[] = [
  { type: 'Merit-Based', amount: 45000, recipients: 1200, changePercent: 15 },
  { type: 'Need-Based', amount: 35000, recipients: 800, changePercent: 22 },
  { type: 'Research', amount: 55000, recipients: 400, changePercent: 8 },
  { type: 'Sports', amount: 25000, recipients: 200, changePercent: -5 }
];

export function ScholarshipTrendsChart() {
  const maxAmount = Math.max(...trends.map(t => t.amount));

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-[hsl(var(--gold))]" />
          <h2 className="text-xl font-semibold">Scholarship Trends</h2>
        </div>

        <div className="space-y-6">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">{trend.type}</h3>
                  <p className="text-sm text-white/60">{trend.recipients} recipients</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${trend.amount.toLocaleString()}</p>
                  <p className={`text-sm ${
                    trend.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trend.changePercent > 0 ? '+' : ''}{trend.changePercent}% from last year
                  </p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(trend.amount / maxAmount) * 100}%` }}
                  className="h-full bg-[hsl(var(--gold))] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}