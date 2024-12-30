import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from './auth/AuthProvider';
import { Button } from './ui/Button';

const navItems = {
  public: [
  { path: '/', label: 'Home' },
  { path: '/contact', label: 'Contact Us' },
  {
    path: '/resources',
    label: 'Resources',
    children: [
      { path: '/resources/guides', label: 'Downloadable Guides' },
      { path: '/resources/videos', label: 'Relevant Videos' },
      { path: '/resources/links', label: 'Useful Links' },
      { path: '/resources/faq', label: 'FAQs' },
      { path: '/resources/scholarships', label: 'Scholarship Finder' },
      { path: '/resources/financial-planner', label: 'Financial Planner' }
    ]
  },
  { path: '/community-forum', label: 'Community' }
],
  dashboard: [
  { 
    path: '/dashboard',
    label: 'Dashboard',
    children: [
      { path: '/dashboard/overview', label: 'Overview' },
      { path: '/dashboard/applications', label: 'Applications' },
      { path: '/dashboard/documents', label: 'Documents' }
    ]
  },
  {
    path: '/dashboard/visa-journey',
    label: 'Visa Journey',
    children: [
      { path: '/dashboard/eligibility', label: 'Eligibility Check' },
      { path: '/dashboard/visa-types', label: 'Visa Types' },
      { path: '/dashboard/timeline', label: 'Application Timeline' }
    ]
  },
  {
    path: '/dashboard/profile',
    label: 'Profile & Settings',
    children: [
      { path: '/dashboard/profile', label: 'Profile' },
      { path: '/dashboard/settings', label: 'Settings' },
      { path: '/dashboard/notifications', label: 'Notifications' }
    ]
  }
]
};
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const currentNavItems = user ? navItems.dashboard : navItems.public;

  return (
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">Student Visa AI</span>
            <span className="text-sm text-white/60 hidden md:block">
              World's Leading AI Study Visa Assistant
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {currentNavItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.children ? (
                  <>
                    <button className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
                      {item.label}
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-black/90 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--navy))] px-4 py-2 rounded-lg font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signin" className="hidden md:flex items-center gap-2 text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link to="/register">
                  <Button className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--navy))] font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/10 bg-black/95 max-h-[80vh] overflow-y-auto"
        >
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {currentNavItems.map((item) => (
              <div key={item.path}>
                {item.children ? (
                  <div className="space-y-2">
                    <div className="font-medium text-white/80">{item.label}</div>
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block text-white/80 hover:text-[hsl(var(--gold))] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/signin"
              className="flex items-center gap-2 text-white/80 hover:text-[hsl(var(--gold))] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}