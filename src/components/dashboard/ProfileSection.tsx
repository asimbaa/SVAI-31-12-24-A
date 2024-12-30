import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Edit2 } from 'lucide-react';
import type { ProfileData } from '@/lib/types/profile';

interface ProfileSectionProps {
  title: string;
  data: Partial<ProfileData>;
  onEdit: () => void;
}

export function ProfileSection({ title, data, onEdit }: ProfileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {title === 'Personal Information' && data.personalInfo && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Full Name</p>
              <p className="font-medium">{data.personalInfo.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Date of Birth</p>
              <p className="font-medium">{data.personalInfo.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Nationality</p>
              <p className="font-medium">{data.personalInfo.nationality}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Passport Number</p>
              <p className="font-medium">{data.personalInfo.passportNumber}</p>
            </div>
          </div>
        )}

        {title === 'Educational Background' && data.education && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Highest Qualification</p>
              <p className="font-medium">{data.education.highestQualification}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Institution</p>
              <p className="font-medium">{data.education.institution}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Field of Study</p>
              <p className="font-medium">{data.education.fieldOfStudy}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">English Proficiency</p>
              <p className="font-medium">
                {data.education.englishProficiency.testType} - {data.education.englishProficiency.overallScore}
              </p>
            </div>
          </div>
        )}

        {title === 'Visa Information' && data.visaInfo && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Study Level</p>
              <p className="font-medium">{data.visaInfo.studyLevel}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Intended Course</p>
              <p className="font-medium">{data.visaInfo.intendedCourse}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Expected Start Date</p>
              <p className="font-medium">{data.visaInfo.expectedStartDate}</p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}