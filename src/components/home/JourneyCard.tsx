import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface JourneyCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function JourneyCard({ to, icon: Icon, title, description }: JourneyCardProps) {
  return (
    <Link
      to={to}
      className="group p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
    >
      <Icon className="w-12 h-12 text-[hsl(var(--gold))] mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-[hsl(var(--gold))] transition-colors">
        {title}
      </h2>
      <p className="text-white/80">{description}</p>
    </Link>
  );
}