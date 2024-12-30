import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function Notification({
  id,
  type,
  message,
  onClose,
  duration = 5000
}: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle
  };

  const Icon = icons[type];

  const colors = {
    success: 'bg-green-500/20 text-green-200',
    error: 'bg-red-500/20 text-red-200',
    info: 'bg-blue-500/20 text-blue-200',
    warning: 'bg-yellow-500/20 text-yellow-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg backdrop-blur-sm ${colors[type]}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5" />
        <div className="flex-1">
          <p>{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}