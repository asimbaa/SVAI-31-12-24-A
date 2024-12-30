import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Card } from '../ui/Card';

const mockNotifications = [
  {
    id: 1,
    title: 'Document Verification',
    message: 'Your passport has been successfully verified.',
    time: '2 hours ago',
    type: 'success'
  },
  {
    id: 2,
    title: 'Upcoming Deadline',
    message: 'English test results due in 5 days.',
    time: '1 day ago',
    type: 'warning'
  },
  {
    id: 3,
    title: 'Application Update',
    message: 'New document requirements added.',
    time: '2 days ago',
    type: 'info'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No new notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{notification.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{notification.message}</p>
                      <span className="text-xs text-white/40">{notification.time}</span>
                    </div>
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}