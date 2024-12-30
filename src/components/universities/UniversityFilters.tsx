import { type UniversityFilters } from '@/lib/types/university';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface UniversityFiltersProps {
  filters: UniversityFilters;
  onFilterChange: (filters: UniversityFilters) => void;
}

export function UniversityFilters({ filters, onFilterChange }: UniversityFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Location
        </label>
        <Select
          value={filters.location?.cities?.[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            location: { ...filters.location, cities: [e.target.value] }
          })}
          options={[
            { value: 'sydney', label: 'Sydney' },
            { value: 'melbourne', label: 'Melbourne' },
            { value: 'brisbane', label: 'Brisbane' },
            { value: 'perth', label: 'Perth' }
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Program Level
        </label>
        <Select
          value={filters.programLevel?.[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            programLevel: [e.target.value as 'undergraduate' | 'postgraduate' | 'research' | 'diploma']
          })}
          options={[
            { value: 'undergraduate', label: 'Undergraduate' },
            { value: 'postgraduate', label: 'Postgraduate' },
            { value: 'research', label: 'Research' },
            { value: 'diploma', label: 'Diploma' }
          ]}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Min Tuition (AUD/year)
          </label>
          <Input
            type="number"
            value={filters.tuitionRange?.min || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              tuitionRange: { ...filters.tuitionRange, min: Number(e.target.value) }
            })}
            placeholder="Min tuition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Max Tuition (AUD/year)
          </label>
          <Input
            type="number"
            value={filters.tuitionRange?.max || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              tuitionRange: { ...filters.tuitionRange, max: Number(e.target.value) }
            })}
            placeholder="Max tuition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Intake
        </label>
        <Select
          value={filters.intake?.[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            intake: [e.target.value]
          })}
          options={[
            { value: 'february-2024', label: 'February 2024' },
            { value: 'july-2024', label: 'July 2024' },
            { value: 'february-2025', label: 'February 2025' }
          ]}
        />
      </div>
    </div>
  );
}