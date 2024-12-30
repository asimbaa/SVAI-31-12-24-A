import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  type: 'guide' | 'video' | 'link';
  delay?: number;
}

export default function ResourceCard({
  title,
  description,
  icon: Icon,
  link,
  type,
  delay = 0
}: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="h-full hover:border-white/20 transition-colors">
          <CardHeader>
            <Icon className="w-8 h-8 text-[hsl(var(--gold))] mb-4" />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              type === 'guide' ? 'bg-blue-500/20 text-blue-200' :
              type === 'video' ? 'bg-red-500/20 text-red-200' :
              'bg-green-500/20 text-green-200'
            }`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}