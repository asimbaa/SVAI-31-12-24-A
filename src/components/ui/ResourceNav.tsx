import { Link, useLocation } from 'react-router-dom';
import { Card } from './Card';
import { FileText, Video, Link as LinkIcon, HelpCircle, GraduationCap, DollarSign } from 'lucide-react';

const resourceTabs = [
  { path: 'guides', label: 'Downloadable Guides', icon: FileText },
  { path: 'videos', label: 'Relevant Videos', icon: Video },
  { path: 'links', label: 'Useful Links', icon: LinkIcon },
  { path: 'faq', label: 'FAQs', icon: HelpCircle },
  { path: 'scholarships', label: 'Scholarship Finder', icon: GraduationCap },
  { path: 'financial-planner', label: 'Financial Planner', icon: DollarSign }
];

export function ResourceNav() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <Card className="mb-8">
      <div className="p-1 flex flex-wrap gap-2">
        {resourceTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={`/resources/${tab.path}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPath === tab.path
                  ? 'bg-[hsl(var(--gold))] text-[hsl(var(--navy))]'
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}