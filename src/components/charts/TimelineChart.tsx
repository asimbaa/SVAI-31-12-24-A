import { motion } from 'framer-motion';

interface TimelineEvent {
  date: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineChartProps {
  events: TimelineEvent[];
}

export function TimelineChart({ events }: TimelineChartProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10"
          >
            <div
              className={`absolute left-[14px] w-2.5 h-2.5 rounded-full ${
                event.status === 'completed' ? 'bg-green-400' :
                event.status === 'current' ? 'bg-[hsl(var(--gold))]' :
                'bg-white/20'
              }`}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">{event.date}</span>
              <span className={`text-sm ${
                event.status === 'completed' ? 'text-green-400' :
                event.status === 'current' ? 'text-[hsl(var(--gold))]' :
                'text-white/40'
              }`}>
                {event.status}
              </span>
            </div>
            <h4 className="font-medium mt-1">{event.title}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}