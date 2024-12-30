import { motion } from 'framer-motion';
import { Plane, MapPin } from 'lucide-react';

export default function AustralianLogo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative flex items-center justify-center w-10 h-10 bg-[hsl(var(--gold))] rounded-lg"
    >
      <div className="relative">
        <Plane className="w-6 h-6 text-[hsl(var(--navy))]" />
        <MapPin className="w-4 h-4 text-[hsl(var(--navy))] absolute -bottom-1 -right-1" />
      </div>
    </motion.div>
  );
}