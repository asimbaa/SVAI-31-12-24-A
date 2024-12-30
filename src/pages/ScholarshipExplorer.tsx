import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ScholarshipFilters } from '@/components/scholarships/ScholarshipFilters';
import { ScholarshipList } from '@/components/scholarships/ScholarshipList';
import { ScholarshipDetailsModal } from '@/components/scholarships/ScholarshipDetailsModal';
import { ScholarshipApplicationWizard } from '@/components/scholarships/ScholarshipApplicationWizard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { Scholarship, ScholarshipFilters as Filters } from '@/lib/types/scholarship';

// Mock data - replace with actual API call
const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Merit Scholarship 2024',
    provider: 'University of Sydney',
    description: 'Full tuition coverage for outstanding international students',
    amount: {
      value: 30000,
      currency: 'AUD',
      coverage: 'full',
      details: 'Covers full tuition fees for the duration of the program'
    },
    eligibility: {
      academicRequirements: {
        minGPA: 3.5,
        minEnglishScore: {
          ielts: 7.0
        }
      },
      fieldOfStudy: ['Computer Science', 'Engineering']
    },
    deadline: {
      date: '2024-05-15',
      type: 'fixed'
    },
    documents: [
      {
        name: 'Academic Transcript',
        required: true,
        description: 'Official academic records'
      }
    ],
    status: 'open',
    tags: ['merit-based', 'international', 'full-tuition'],
    matchScore: 85
  }
];

export default function ScholarshipExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleScholarshipSelect = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const handleApply = (_scholarship: Scholarship) => {
    setIsApplying(true);
  };

  const handleApplicationSubmit = async (data: any) => {
    try {
      // Handle application submission
      console.log('Submitting application:', data);
      setIsApplying(false);
      setSelectedScholarship(null);
    } catch (error) {
      console.error('Application submission failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Scholarship Explorer</h1>
        <p className="text-white/80">
          Discover scholarships that match your profile and academic goals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <ScholarshipFilters
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          </Card>
        </div>

        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <Input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScholarshipList
            scholarships={mockScholarships}
            onSelect={handleScholarshipSelect}
          />
        </div>
      </div>

      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {isApplying ? (
            <ScholarshipApplicationWizard
              scholarship={selectedScholarship}
              onClose={() => {
                setIsApplying(false);
                setSelectedScholarship(null);
              }}
              onSubmit={handleApplicationSubmit}
            />
          ) : (
            <ScholarshipDetailsModal
              scholarship={selectedScholarship}
              onClose={() => setSelectedScholarship(null)}
              onApply={handleApply}
            />
          )}
        </div>
      )}
    </div>
  );
}