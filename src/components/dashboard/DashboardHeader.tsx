import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from '../ui/Button';

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome to your student visa journey</p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
      </div>
    </motion.div>
  );
}