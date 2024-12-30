import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

const activities = [
  {
    action: 'Document uploaded',
    target: 'Passport.pdf',
    time: '2h ago',
    type: 'document'
  },
  {
    action: 'Profile updated',
    target: 'Personal information',
    time: '1d ago',
    type: 'profile'
  },
  {
    action: 'Eligibility check',
    target: 'Completed with 85% match',
    time: '2d ago',
    type: 'assessment'
  }
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="h-full">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-white/60">{activity.target}</p>
              </div>
              <span className="text-sm text-white/40">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}