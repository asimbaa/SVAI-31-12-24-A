import { motion } from 'framer-motion';
import { Calendar, DollarSign, GraduationCap, FileText, X } from 'lucide-react';
import type { Scholarship } from '@/lib/types/scholarship';
import { formatCurrency } from '@/utils/formatting';
import { Button } from '../ui/Button';

interface ScholarshipDetailsModalProps {
  scholarship: Scholarship;
  onClose: () => void;
  onApply: (scholarship: Scholarship) => void;
}

export function ScholarshipDetailsModal({ 
  scholarship, 
  onClose,
  onApply 
}: ScholarshipDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{scholarship.name}</h2>
        <p className="text-white/60">{scholarship.provider}</p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
          <DollarSign className="w-6 h-6 text-[hsl(var(--gold))]" />
          <div>
            <h3 className="font-medium">Funding Amount</h3>
            <p className="text-white/80">
              {formatCurrency(scholarship.amount.value)} - {scholarship.amount.coverage} coverage
            </p>
            <p className="text-sm text-white/60">{scholarship.amount.details}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
          <Calendar className="w-6 h-6 text-[hsl(var(--gold))]" />
          <div>
            <h3 className="font-medium">Application Deadline</h3>
            <p className="text-white/80">
              {new Date(scholarship.deadline.date).toLocaleDateString()}
            </p>
            {scholarship.deadline.type === 'rolling' && (
              <p className="text-sm text-white/60">Rolling admissions</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-[hsl(var(--gold))]" />
            <h3 className="font-medium">Eligibility Requirements</h3>
          </div>
          
          <div className="space-y-3">
            {scholarship.eligibility.academicRequirements.minGPA && (
              <p className="text-white/80">
                • Minimum GPA: {scholarship.eligibility.academicRequirements.minGPA}
              </p>
            )}
            
            {scholarship.eligibility.academicRequirements.minEnglishScore && (
              <p className="text-white/80">
                • Minimum IELTS: {scholarship.eligibility.academicRequirements.minEnglishScore.ielts}
              </p>
            )}
            
            {scholarship.eligibility.fieldOfStudy && (
              <p className="text-white/80">
                • Fields of Study: {scholarship.eligibility.fieldOfStudy.join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[hsl(var(--gold))]" />
            <h3 className="font-medium">Required Documents</h3>
          </div>
          
          <div className="space-y-3">
            {scholarship.documents.map((doc) => (
              <div key={doc.name} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2" />
                <div>
                  <p className="text-white/80">{doc.name}</p>
                  <p className="text-sm text-white/60">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          onClick={() => onApply(scholarship)}
          className="flex-1 bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
        >
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
}