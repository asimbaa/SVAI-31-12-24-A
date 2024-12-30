import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { UniversityFilters } from '@/components/universities/UniversityFilters';
import { UniversityList } from '@/components/universities/UniversityList';
import { UniversityDetailsModal } from '@/components/universities/UniversityDetailsModal';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { University, UniversityFilters as Filters } from '@/lib/types/university';

// Mock data - replace with actual API call
const mockUniversities: University[] = [
  {
    id: '1',
    name: 'University of Sydney',
    location: {
      city: 'Sydney',
      state: 'NSW',
      country: 'Australia',
      coordinates: {
        latitude: -33.8882,
        longitude: 151.1875
      }
    },
    ranking: {
      world: 40,
      national: 2,
      year: 2024
    },
    programs: [
      {
        id: 'cs-bachelor',
        name: 'Bachelor of Computer Science',
        level: 'undergraduate',
        duration: '3 years',
        tuitionFee: {
          amount: 45000,
          currency: 'AUD',
          period: 'year'
        },
        intakes: ['February 2024', 'July 2024'],
        requirements: {
          academicScore: 85,
          englishScore: {
            ielts: 6.5
          }
        }
      }
    ],
    facilities: [
      'Modern Libraries',
      'Research Labs',
      'Sports Complex'
    ],
    internationalSupport: [
      'Airport Pickup',
      'Orientation Program',
      'Language Support'
    ],
    matchScore: 92
  }
];

export default function UniversityExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
  };

  const handleApply = (university: University) => {
    // Handle university application
    console.log('Applying to:', university.name);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">University Explorer</h1>
        <p className="text-white/80">
          Find the perfect Australian university and program for your academic journey.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <UniversityFilters
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
                placeholder="Search universities and programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <UniversityList
            universities={mockUniversities}
            onSelect={handleUniversitySelect}
          />
        </div>
      </div>

      {selectedUniversity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <UniversityDetailsModal
            university={selectedUniversity}
            onClose={() => setSelectedUniversity(null)}
            onApply={handleApply}
          />
        </div>
      )}
    </div>
  );
}