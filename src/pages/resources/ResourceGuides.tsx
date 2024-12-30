import { FileText } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard';

const guides = [
  {
    title: 'Complete Visa Application Guide',
    description: 'Step-by-step guide to applying for Australian visas',
    icon: FileText,
    link: '/guides/visa-application.pdf',
    type: 'guide' as const
  },
  {
    title: 'Skills Assessment Handbook',
    description: 'Understanding the skills assessment process',
    icon: FileText,
    link: '/guides/skills-assessment.pdf',
    type: 'guide' as const
  },
  {
    title: 'Settlement Guide',
    description: 'Essential information for settling in Australia',
    icon: FileText,
    link: '/guides/settlement.pdf',
    type: 'guide' as const
  }
];

export default function ResourceGuides() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Downloadable Guides</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <ResourceCard
            key={guide.title}
            {...guide}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}