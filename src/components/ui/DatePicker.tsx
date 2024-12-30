import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate years from 70 years ago to 16 years ago
const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: 54 }, // 70 - 16 = 54 years range
  (_, i) => currentYear - 70 + i
).reverse();

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  min,
  max,
  className,
  placeholder = 'Select date of birth'
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    // Default to 21 years ago
    const date = new Date();
    date.setFullYear(date.getFullYear() - 21);
    return value ? new Date(value) : date;
  });

  const formattedDate = value ? new Date(value).toLocaleDateString() : '';

  const handleDateSelect = (date: Date) => {
    const dateString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toISOString().split('T')[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const handleMonthChange = (increment: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  const handleYearChange = (increment: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + increment);
      return newDate;
    });
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const isDisabled = (min && dateString < min) || (max && dateString > max);

      days.push(
        <button
          key={i}
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled || false}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm",
            dateString === value ? "bg-[hsl(var(--gold))] text-[hsl(var(--navy))]" : "hover:bg-white/10",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal bg-black/20 border border-white/10 hover:bg-black/30",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4 bg-black/90 border border-white/10 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => handleYearChange(-1)}
              className="p-1 hover:bg-white/10 rounded"
            >
              ‹‹
            </button>
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-1 hover:bg-white/10 rounded"
            >
              ‹
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowMonthSelect(!showMonthSelect);
                  setShowYearSelect(false);
                }}
                className="text-sm font-medium hover:bg-white/10 px-2 py-1 rounded flex items-center gap-1"
              >
                {MONTHS[currentDate.getMonth()]}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setShowYearSelect(!showYearSelect);
                  setShowMonthSelect(false);
                }}
                className="text-sm font-medium hover:bg-white/10 px-2 py-1 rounded flex items-center gap-1"
              >
                {currentDate.getFullYear()}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-1 hover:bg-white/10 rounded"
            >
              ›
            </button>
            <button
              onClick={() => handleYearChange(1)}
              className="p-1 hover:bg-white/10 rounded"
            >
              ››
            </button>
          </div>

          {showMonthSelect && (
            <div className="absolute z-10 w-32 max-h-48 overflow-y-auto bg-black/90 border border-white/10 rounded-lg mt-1">
              {MONTHS.map((month, index) => (
                <button
                  key={month}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(index);
                    setCurrentDate(newDate);
                    setShowMonthSelect(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1 hover:bg-white/10 text-sm",
                    index === currentDate.getMonth() && "bg-[hsl(var(--gold))]/10"
                  )}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {showYearSelect && (
            <div className="absolute z-10 w-24 max-h-48 overflow-y-auto bg-black/90 border border-white/10 rounded-lg mt-1">
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setFullYear(year);
                    setCurrentDate(newDate);
                    setShowYearSelect(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1 hover:bg-white/10 text-sm",
                    year === currentDate.getFullYear() && "bg-[hsl(var(--gold))]/10"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="w-8 h-8 flex items-center justify-center text-sm text-white/60">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays()}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}