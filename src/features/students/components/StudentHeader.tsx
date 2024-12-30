import { motion } from 'framer-motion';

interface StudentHeaderProps {
  title: string;
  description: string;
}

export const StudentHeader = ({ title, description }: StudentHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-white/80">{description}</p>
    </motion.div>
  );
};