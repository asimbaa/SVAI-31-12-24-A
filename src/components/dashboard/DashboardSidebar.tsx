import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Upload, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  LogOut,
} from 'lucide-react';
import { useAuthContext } from '@/components/auth/AuthProvider';

const menuItems = [
  { icon: Home, label: 'Overview', path: '/dashboard' },
  { icon: FileText, label: 'Documents', path: '/document-upload' },
  { icon: Upload, label: 'Applications', path: '/applications' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: BookOpen, label: 'Resources', path: '/resources' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/support' }
];

export function DashboardSidebar() {
  const location = useLocation();
  const { logout } = useAuthContext();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10"
    >
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <span className="text-xl font-bold">Student Visa AI</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]' 
                    : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--text-primary))]/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-4 py-3 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--text-primary))]/5 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
}