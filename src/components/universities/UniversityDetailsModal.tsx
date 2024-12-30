import { motion } from 'framer-motion';
import { MapPin, Trophy, Calendar, GraduationCap, Building2, Users, X } from 'lucide-react';
import type { University } from '@/lib/types/university';
import { formatCurrency } from '@/utils/formatting';
import { Button } from '../ui/Button';

interface UniversityDetailsModalProps {
  university: University;
  onClose: () => void;
  onApply: (university: University) => void;
}

export function UniversityDetailsModal({
  university,
  onClose,
  onApply
}: UniversityDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{university.name}</h2>
        <div className="flex items-center gap-2 text-white/60">
          <MapPin className="w-4 h-4" />
          <span>{university.location.city}, {university.location.state}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {university.ranking.world && (
          <div className="p-4 bg-black/20 rounded-lg">
            <Trophy className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
            <h3 className="font-medium mb-1">World Ranking</h3>
            <p className="text-white/80">#{university.ranking.world}</p>
          </div>
        )}

        {university.ranking.national && (
          <div className="p-4 bg-black/20 rounded-lg">
            <Trophy className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
            <h3 className="font-medium mb-1">National Ranking</h3>
            <p className="text-white/80">#{university.ranking.national}</p>
          </div>
        )}

        <div className="p-4 bg-black/20 rounded-lg">
          <Calendar className="w-6 h-6 text-[hsl(var(--gold))] mb-2" />
          <h3 className="font-medium mb-1">Next Intake</h3>
          <p className="text-white/80">{university.programs[0]?.intakes[0]}</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Available Programs
          </h3>
          <div className="space-y-4">
            {university.programs.map((program) => (
              <div
                key={program.id}
                className="p-4 bg-black/20 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{program.name}</h4>
                  <span className="text-[hsl(var(--gold))] text-sm">
                    {program.level}
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Duration:</span>
                    <p className="text-white/80">{program.duration}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Tuition:</span>
                    <p className="text-white/80">
                      {formatCurrency(program.tuitionFee.amount)}/{program.tuitionFee.period}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/60">IELTS:</span>
                    <p className="text-white/80">{program.requirements.englishScore?.ielts || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Campus Facilities
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {university.facilities.map((facility) => (
              <div
                key={facility}
                className="p-3 bg-black/20 rounded-lg text-white/80"
              >
                {facility}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            International Student Support
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {university.internationalSupport.map((support) => (
              <div
                key={support}
                className="p-3 bg-black/20 rounded-lg text-white/80"
              >
                {support}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Close
        </Button>
        <Button
          onClick={() => onApply(university)}
          className="flex-1 bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
        >
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
}