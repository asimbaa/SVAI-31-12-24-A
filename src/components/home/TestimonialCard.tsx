import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  country: string;
  image: string;
  quote: string;
  delay?: number;
}

export function TestimonialCard({ name, country, image, quote, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
        />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-white/60">{country}</p>
        </div>
      </div>
      <p className="text-white/80 italic">"{quote}"</p>
    </motion.div>
  );
}