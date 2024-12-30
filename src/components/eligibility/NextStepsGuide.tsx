import { motion } from 'framer-motion';
import { FileText, GraduationCap, DollarSign, Heart, BookOpen, CheckSquare } from 'lucide-react';

interface NextStepsGuideProps {
  steps: string[];
}

interface StepCategory {
  title: string;
  Icon: typeof FileText;
  key: string;
  steps: string[];
}

export function NextStepsGuide({ steps }: NextStepsGuideProps) {
  // Categorize steps
  const categories: StepCategory[] = [
    {
      title: "Documentation",
      Icon: FileText,
      key: "documentation",
      steps: steps.filter(step => 
        step.toLowerCase().includes('document') ||
        step.toLowerCase().includes('statement') ||
        step.toLowerCase().includes('evidence')
      )
    },
    {
      title: "Academic Requirements",
      Icon: GraduationCap,
      key: "academic",
      steps: steps.filter(step => 
        step.toLowerCase().includes('english') ||
        step.toLowerCase().includes('test') ||
        step.toLowerCase().includes('course') ||
        step.toLowerCase().includes('academic')
      )
    },
    {
      title: "Financial Preparation",
      Icon: DollarSign,
      key: "financial",
      steps: steps.filter(step => 
        step.toLowerCase().includes('financial') ||
        step.toLowerCase().includes('fund') ||
        step.toLowerCase().includes('bank') ||
        step.toLowerCase().includes('sponsor')
      )
    },
    {
      title: "Health & Insurance",
      Icon: Heart,
      key: "health",
      steps: steps.filter(step => 
        step.toLowerCase().includes('health') ||
        step.toLowerCase().includes('oshc') ||
        step.toLowerCase().includes('medical') ||
        step.toLowerCase().includes('insurance')
      )
    },
    {
      title: "Study Plans",
      Icon: BookOpen,
      key: "study",
      steps: steps.filter(step => 
        step.toLowerCase().includes('study') ||
        step.toLowerCase().includes('career') ||
        step.toLowerCase().includes('plan') ||
        step.toLowerCase().includes('research')
      )
    }
  ];

  // Add remaining steps to a general category
  const categorizedSteps = new Set(categories.flatMap(cat => cat.steps));
  const remainingSteps = steps.filter(step => !categorizedSteps.has(step));
  
  if (remainingSteps.length > 0) {
    categories.push({
      title: "Additional Steps",
      Icon: CheckSquare,
      key: "additional",
      steps: remainingSteps
    });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => {
          if (category.steps.length === 0) return null;

          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <category.Icon className="w-5 h-5 text-[hsl(var(--gold))]" />
                <h4 className="font-semibold">{category.title}</h4>
                <span className="ml-auto text-sm text-white/60">{category.steps.length} steps</span>
              </div>
              
              <ol className="space-y-3">
                {category.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                      {stepIndex + 1}
                    </span>
                    <span className="text-white/80 hover:text-white transition-colors cursor-default">{step}</span>
                  </li>
                ))}
              </ol>
              {category.key === 'documentation' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60">
                    💡 Tip: Start gathering these documents early to avoid delays
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}