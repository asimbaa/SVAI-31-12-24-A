import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

interface Stat {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="p-6">
              {stat.icon && (
                <stat.icon className="w-8 h-8 text-[hsl(var(--gold))] mb-4" />
              )}
              <p className="text-sm text-white/60 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change !== undefined && (
                <p className={`text-sm mt-2 ${
                  stat.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}