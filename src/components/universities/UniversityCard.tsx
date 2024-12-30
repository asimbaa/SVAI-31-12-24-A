import { motion } from 'framer-motion';
import { MapPin, Trophy, Calendar, DollarSign } from 'lucide-react';
import type { University } from '@/lib/types/university';
import { formatCurrency } from '@/utils/formatting';

interface UniversityCardProps {
  university: University;
  onSelect: (university: University) => void;
}

export function UniversityCard({ university, onSelect }: UniversityCardProps) {
  const lowestTuition = Math.min(
    ...university.programs.map(p => p.tuitionFee.amount)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
      onClick={() => onSelect(university)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{university.name}</h3>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{university.location.city}, {university.location.state}</span>
          </div>
        </div>
        {university.matchScore && (
          <div className="px-3 py-1 bg-[hsl(var(--gold))]/10 rounded-full">
            <span className="text-[hsl(var(--gold))] text-sm font-medium">
              {university.matchScore}% Match
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {university.ranking.world && (
          <div className="flex items-center gap-2 text-white/80">
            <Trophy className="w-4 h-4" />
            <span>World Rank: #{university.ranking.world}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-white/80">
          <Calendar className="w-4 h-4" />
          <span>
            Next Intake: {university.programs[0]?.intakes[0]}
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <DollarSign className="w-4 h-4" />
          <span>
            From {formatCurrency(lowestTuition)}/year
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {university.programs.slice(0, 3).map((program) => (
          <span
            key={program.id}
            className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60"
          >
            {program.name}
          </span>
        ))}
        {university.programs.length > 3 && (
          <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60">
            +{university.programs.length - 3} more
          </span>
        )}
      </div>
    </motion.div>
  );
}