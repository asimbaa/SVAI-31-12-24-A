import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { visaGrantData } from '@/lib/data/visaInsights';

export function SourceCountriesChart() {
  const { topSourceCountries } = visaGrantData;
  const maxPercentage = Math.max(...topSourceCountries.map(c => c.percentage));

  return (
    <ChartContainer
      title="Top Source Countries"
      icon={<Globe className="w-5 h-5 text-[hsl(var(--gold))]" />}
      subtitle="Distribution of student visa grants by country of origin"
    >
      <div className="space-y-4">
        {topSourceCountries.map((country, index) => (
          <motion.div
            key={country.country}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-white/80">{country.country}</span>
              <span className="text-white/60">
                {country.count.toLocaleString()} ({country.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(country.percentage / maxPercentage) * 100}%` }}
                className="h-full bg-[hsl(var(--gold))] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </ChartContainer>
  );
}