import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Application } from '@/lib/types/application';

interface ApplicationStatusCardProps {
  application: Application;
  onClick: () => void;
}

export function ApplicationStatusCard({ application, onClick }: ApplicationStatusCardProps) {
  const getStatusIcon = () => {
    switch (application.status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'under-review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-white/60" />;
    }
  };

  const getStatusColor = () => {
    switch (application.status) {
      case 'approved':
        return 'bg-green-500/20 text-green-200';
      case 'rejected':
        return 'bg-red-500/20 text-red-200';
      case 'under-review':
        return 'bg-yellow-500/20 text-yellow-200';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {application.type === 'scholarship' ? 'Scholarship Application' : 'University Application'}
          </h3>
          <p className="text-white/60 text-sm">
            Last updated: {new Date(application.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm capitalize">{application.status.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Documents Verified</span>
          <span className="text-white/80">
            {application.documents.filter(d => d.status === 'verified').length} of {application.documents.length}
          </span>
        </div>

        {application.nextSteps && application.nextSteps.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Next Steps:</h4>
            <ul className="space-y-1">
              {application.nextSteps.map((step, index) => (
                <li key={index} className="text-sm text-white/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}