import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Users, TrendingUp, Clock, Award } from 'lucide-react';

import { visaGrantData } from '@/lib/data/visaInsights';

const statistics = [
  {
    label: 'Total Applications',
    value: visaGrantData.totalGranted.toLocaleString(),
    change: `+${visaGrantData.yearOverYearGrowth}%`,
    icon: Users,
    color: 'text-blue-400'
  },
  {
    label: 'Average Processing Time',
    value: `${visaGrantData.processingTimes.student500.seventyFifthPercentile} days`,
    change: '-12.5%',
    icon: Clock,
    color: 'text-green-400'
  },
  {
    label: 'Success Rate',
    value: '94.8%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-[hsl(var(--gold))]'
  },
  {
    label: 'Scholarships Awarded',
    value: '2,845',
    change: '+28.4%',
    icon: Award,
    color: 'text-purple-400'
  }
];

export function StatisticsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statistics.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-black/20 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change} from last year
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}