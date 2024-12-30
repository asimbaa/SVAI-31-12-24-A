import { type ScholarshipFilters } from '@/lib/types/scholarship';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface ScholarshipFiltersProps {
  filters: ScholarshipFilters;
  onFilterChange: (filters: ScholarshipFilters) => void;
}

export function ScholarshipFilters({ filters, onFilterChange }: ScholarshipFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Minimum Amount
          </label>
          <Input
            type="number"
            value={filters.amount?.min || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              amount: { ...filters.amount, min: Number(e.target.value) }
            })}
            placeholder="Min amount"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Coverage Type
          </label>
          <Select
            value={filters.coverage?.[0] || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              coverage: [e.target.value as 'full' | 'partial' | 'fixed']
            })}
            options={[
              { value: 'full', label: 'Full Coverage' },
              { value: 'partial', label: 'Partial Coverage' },
              { value: 'fixed', label: 'Fixed Amount' }
            ]}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Field of Study
        </label>
        <Select
          value={filters.fieldOfStudy?.[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            fieldOfStudy: [e.target.value]
          })}
          options={[
            { value: 'computer-science', label: 'Computer Science' },
            { value: 'business', label: 'Business' },
            { value: 'engineering', label: 'Engineering' },
            { value: 'arts', label: 'Arts & Humanities' }
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Status
        </label>
        <Select
          value={filters.status?.[0] || ''}
          onChange={(e) => onFilterChange({
            ...filters,
            status: [e.target.value as 'open' | 'closing-soon' | 'closed']
          })}
          options={[
            { value: 'open', label: 'Open' },
            { value: 'closing-soon', label: 'Closing Soon' },
            { value: 'closed', label: 'Closed' }
          ]}
        />
      </div>
    </div>
  );
}