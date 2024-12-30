import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { visaGrantData } from '@/lib/data/visaInsights';

export function LocationBreakdownChart() {
  const { locationBreakdown } = visaGrantData;

  return (
    <ChartContainer
      title="Student Distribution by State"
      icon={<MapPin className="w-5 h-5 text-[hsl(var(--gold))]" />}
      subtitle="Geographic distribution of international students"
    >
      <div className="grid grid-cols-2 gap-4">
        {locationBreakdown.map((location, index) => (
          <motion.div
            key={location.state}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-1">{location.state}</h3>
            <p className="text-2xl font-bold text-[hsl(var(--gold))]">
              {location.percentage}%
            </p>
            <p className="text-sm text-white/60">
              {location.count.toLocaleString()} students
            </p>
          </motion.div>
        ))}
      </div>
    </ChartContainer>
  );
}