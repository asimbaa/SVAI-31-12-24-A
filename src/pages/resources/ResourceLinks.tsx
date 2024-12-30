import { Link as LinkIcon } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard';

const links = [
  {
    title: 'Department of Home Affairs',
    description: 'Official Australian immigration website',
    icon: LinkIcon,
    link: 'https://immi.homeaffairs.gov.au',
    type: 'link' as const
  },
  {
    title: 'Skills Assessment Authority',
    description: 'Official skills assessment information',
    icon: LinkIcon,
    link: 'https://www.vetassess.com.au',
    type: 'link' as const
  }
];

export default function ResourceLinks() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Useful Links</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <ResourceCard
            key={link.title}
            {...link}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}