import { motion } from 'framer-motion';
import { FileText, CheckSquare, MessageSquare, Upload } from 'lucide-react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

const actions = [
  {
    icon: FileText,
    label: 'Eligibility Check',
    path: '/eligibility-check',
    color: 'text-blue-400'
  },
  {
    icon: Upload,
    label: 'Upload Documents',
    path: '/document-upload',
    color: 'text-green-400'
  },
  {
    icon: CheckSquare,
    label: 'Track Progress',
    path: '/progress',
    color: 'text-purple-400'
  },
  {
    icon: MessageSquare,
    label: 'Get Help',
    path: '/support',
    color: 'text-orange-400'
  }
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="h-full">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.path}
                className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors group"
              >
                <Icon className={`w-6 h-6 ${action.color} mb-2`} />
                <span className="text-sm font-medium group-hover:text-[hsl(var(--gold))] transition-colors">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}