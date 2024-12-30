import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';

const tasks = [
  {
    title: 'English Test Booking',
    deadline: 'March 1, 2024',
    timeLeft: '5 days left',
    priority: 'high',
    description: 'Book your IELTS test at an approved center'
  },
  {
    title: 'Bank Statement Update',
    deadline: 'March 15, 2024',
    timeLeft: '2 weeks left',
    priority: 'medium',
    description: 'Upload latest 3 months of bank statements'
  },
  {
    title: 'Health Check',
    deadline: 'March 30, 2024',
    timeLeft: '4 weeks left',
    priority: 'low',
    description: 'Schedule medical examination with approved physician'
  }
];

export function UpcomingTasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-[hsl(var(--gold))]" />
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {task.title}
                    {task.priority === 'high' && (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                  </h3>
                  <p className="text-sm text-white/60">{task.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">{task.deadline}</div>
                  <div className="flex items-center text-sm text-white/60">
                    <Clock className="w-3 h-3 mr-1" />
                    {task.timeLeft}
                  </div>
                </div>
              </div>
              <div className={`h-1 rounded-full mt-3 ${
                task.priority === 'high' ? 'bg-red-400' :
                task.priority === 'medium' ? 'bg-yellow-400' :
                'bg-green-400'
              }`} />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Upcoming deadlines</span>
            <span className="text-[hsl(var(--gold))]">View Calendar →</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}