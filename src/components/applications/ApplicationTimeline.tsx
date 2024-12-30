import { motion } from 'framer-motion';
import type { Application } from '@/lib/types/application';

interface ApplicationTimelineProps {
  application: Application;
}

export function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute top-0 bottom-0 left-3 w-px bg-white/10" />
      
      <div className="space-y-8">
        {application.timeline.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className={`absolute -left-8 w-6 h-6 rounded-full border-2 ${
              event.status === 'approved'
                ? 'bg-green-500 border-green-500'
                : event.status === 'rejected'
                ? 'bg-red-500 border-red-500'
                : 'bg-black/20 border-white/20'
            }`} />
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-white/60">
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  event.status === 'approved'
                    ? 'bg-green-500/20 text-green-200'
                    : event.status === 'rejected'
                    ? 'bg-red-500/20 text-red-200'
                    : 'bg-white/10 text-white/60'
                }`}>
                  {event.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-white/80">{event.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}