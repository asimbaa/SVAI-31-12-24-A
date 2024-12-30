import { motion } from 'framer-motion';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TimelineProgressProps {
  events: TimelineEvent[];
}

export function TimelineProgress({ events }: TimelineProgressProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute top-0 bottom-0 left-3 w-px bg-white/10" />
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className={`absolute -left-8 w-6 h-6 rounded-full border-2 ${
              event.completed
                ? 'bg-[hsl(var(--gold))] border-[hsl(var(--gold))]'
                : 'bg-black/20 border-white/20'
            }`} />
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-white/60">{event.date}</span>
                <h4 className="font-medium">{event.title}</h4>
              </div>
              <p className="text-white/80 text-sm">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}