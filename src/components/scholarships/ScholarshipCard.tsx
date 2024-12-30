import { motion } from 'framer-motion';
import { Calendar, DollarSign, GraduationCap, AlertCircle } from 'lucide-react';
import type { Scholarship } from '@/lib/types/scholarship';
import { formatCurrency } from '@/utils/formatting';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onSelect: (scholarship: Scholarship) => void;
}

export function ScholarshipCard({ scholarship, onSelect }: ScholarshipCardProps) {
  const isClosingSoon = scholarship.status === 'closing-soon';
  const deadlineDate = new Date(scholarship.deadline.date);
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
      onClick={() => onSelect(scholarship)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{scholarship.name}</h3>
          <p className="text-white/60 text-sm">{scholarship.provider}</p>
        </div>
        {scholarship.matchScore && (
          <div className="px-3 py-1 bg-[hsl(var(--gold))]/10 rounded-full">
            <span className="text-[hsl(var(--gold))] text-sm font-medium">
              {scholarship.matchScore}% Match
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-white/80">
          <DollarSign className="w-4 h-4" />
          <span>
            {formatCurrency(scholarship.amount.value)} - {scholarship.amount.coverage} coverage
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/80">
          <GraduationCap className="w-4 h-4" />
          <span>
            {scholarship.eligibility.fieldOfStudy?.join(', ') || 'All fields of study'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className={isClosingSoon ? 'text-red-400' : 'text-white/80'}>
            {isClosingSoon ? (
              <span className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Closing in {daysUntilDeadline} days
              </span>
            ) : (
              `Deadline: ${new Date(scholarship.deadline.date).toLocaleDateString()}`
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {scholarship.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}