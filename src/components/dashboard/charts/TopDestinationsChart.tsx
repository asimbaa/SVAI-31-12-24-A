import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { MapPin } from 'lucide-react';

interface Destination {
  city: string;
  students: number;
  universities: number;
  growth: number;
}

const destinations: Destination[] = [
  { city: 'Sydney', students: 85000, universities: 7, growth: 12.5 },
  { city: 'Melbourne', students: 78000, universities: 8, growth: 15.2 },
  { city: 'Brisbane', students: 45000, universities: 5, growth: 18.7 },
  { city: 'Perth', students: 32000, universities: 4, growth: 10.3 },
  { city: 'Adelaide', students: 28000, universities: 3, growth: 14.8 }
];

export function TopDestinationsChart() {
  const maxStudents = Math.max(...destinations.map(d => d.students));

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-[hsl(var(--gold))]" />
          <h2 className="text-xl font-semibold">Top Student Destinations</h2>
        </div>

        <div className="space-y-4">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex justify-between mb-1">
                <span className="text-white/80">{destination.city}</span>
                <span className="text-white/60">{destination.students.toLocaleString()} students</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(destination.students / maxStudents) * 100}%` }}
                  className="h-full bg-[hsl(var(--gold))] rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-white/40">{destination.universities} universities</span>
                <span className={destination.growth >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {destination.growth > 0 ? '+' : ''}{destination.growth}% growth
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}