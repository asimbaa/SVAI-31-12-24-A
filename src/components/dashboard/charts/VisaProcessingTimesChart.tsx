import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Clock } from 'lucide-react';

interface ProcessingTime {
  visaType: string;
  days75thPercentile: number;
  days90thPercentile: number;
}

const processingTimes: ProcessingTime[] = [
  { visaType: 'Student (500)', days75thPercentile: 29, days90thPercentile: 48 },
  { visaType: 'Graduate (485)', days75thPercentile: 90, days90thPercentile: 120 },
  { visaType: 'Skilled Independent (189)', days75thPercentile: 180, days90thPercentile: 240 }
];

export function VisaProcessingTimesChart() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-[hsl(var(--gold))]" />
          <h2 className="text-xl font-semibold">Visa Processing Times</h2>
        </div>

        <div className="space-y-6">
          {processingTimes.map((visa, index) => (
            <motion.div
              key={visa.visaType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-white/80">{visa.visaType}</span>
                <span className="text-white/60">75% in {visa.days75thPercentile} days</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(visa.days75thPercentile / 240) * 100}%` }}
                  className="absolute h-full bg-[hsl(var(--gold))] rounded-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(visa.days90thPercentile / 240) * 100}%` }}
                  className="absolute h-full bg-[hsl(var(--gold))]/50 rounded-full"
                />
              </div>
              <p className="text-xs text-white/40">90% in {visa.days90thPercentile} days</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}