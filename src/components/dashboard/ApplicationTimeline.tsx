import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { CheckCircle, Clock } from 'lucide-react';

const timelineEvents = [
  {
    title: 'Application Started',
    description: 'Created account and completed eligibility check',
    date: 'Feb 15, 2024',
    status: 'completed'
  },
  {
    title: 'Document Collection',
    description: 'Upload required documents for verification',
    date: 'In Progress',
    status: 'current'
  },
  {
    title: 'Application Review',
    description: 'Internal review of submitted documents',
    date: 'Upcoming',
    status: 'pending'
  },
  {
    title: 'Visa Submission',
    description: 'Submit application to immigration authorities',
    date: 'Upcoming',
    status: 'pending'
  }
];

export function ApplicationTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <h2 className="text-xl font-semibold mb-6">Application Timeline</h2>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[21px] w-px bg-white/10" />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  {event.status === 'completed' ? (
                    <CheckCircle className="w-[18px] h-[18px] text-green-400" />
                  ) : event.status === 'current' ? (
                    <Clock className="w-[18px] h-[18px] text-[hsl(var(--gold))]" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full bg-white/10" />
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className={`text-sm ${
                      event.status === 'completed' ? 'text-green-400' :
                      event.status === 'current' ? 'text-[hsl(var(--gold))]' :
                      'text-white/40'
                    }`}>
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}