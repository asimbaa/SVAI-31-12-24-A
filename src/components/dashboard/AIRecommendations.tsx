import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

const recommendations = [
  {
    title: 'Improve English Score',
    description: 'Your current IELTS score is 6.5. Aim for 7.0+ to increase visa success chances.',
    action: 'View English Resources',
    path: '/resources/english'
  },
  {
    title: 'Financial Documentation',
    description: 'Update your bank statements to show consistent savings history.',
    action: 'Upload Documents',
    path: '/document-upload'
  },
  {
    title: 'Course Selection',
    description: 'Based on your profile, consider these top-rated universities.',
    action: 'Explore Courses',
    path: '/resources/courses'
  }
];

export function AIRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
          <h2 className="text-xl font-semibold">AI Recommendations</h2>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors group"
            >
              <h3 className="font-medium mb-2">{rec.title}</h3>
              <p className="text-sm text-white/60 mb-3">{rec.description}</p>
              <a
                href={rec.path}
                className="inline-flex items-center text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 transition-colors"
              >
                {rec.action}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}