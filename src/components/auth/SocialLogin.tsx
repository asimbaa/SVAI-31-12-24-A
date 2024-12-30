import { motion } from 'framer-motion';
import { Apple, Chrome, Mail } from 'lucide-react';

interface SocialLoginProps {
  onLogin: (provider: string) => Promise<void>;
}

export function SocialLogin({ onLogin }: SocialLoginProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black/40 text-white/60">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLogin('google')}
          className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Chrome className="w-5 h-5" />
          <span className="sr-only">Sign in with Google</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLogin('apple')}
          className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Apple className="w-5 h-5" />
          <span className="sr-only">Sign in with Apple</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLogin('microsoft')}
          className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span className="sr-only">Sign in with Microsoft</span>
        </motion.button>
      </div>
    </div>
  );
}