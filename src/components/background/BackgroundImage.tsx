import { motion } from 'framer-motion';
import type { BackgroundImageProps } from './types';

export function BackgroundImage({ imageUrl, isActive }: BackgroundImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0.5 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-[hsl(var(--navy))]/80" />
    </motion.div>
  );
}