import { Card } from '../ui/Card';
import { VisaGrantsBar } from './charts/VisaGrantsBar';
import { Button } from '../ui/Button';
import { Download } from 'lucide-react';

interface SectorData {
  name: string;
  count: number;
  percentage: number;
}

const sectorData: SectorData[] = [
  { name: 'Higher Education Sector', count: 86149, percentage: 65.4 },
  { name: 'Vocational Education and Training Sector', count: 20979, percentage: 15.9 },
  { name: 'Independent ELICOS Sector', count: 10916, percentage: 8.3 },
  { name: 'Non-Award Sector', count: 5137, percentage: 3.9 },
  { name: 'Postgraduate Research Sector', count: 3163, percentage: 2.4 },
  { name: 'Schools Sector', count: 4045, percentage: 3.1 },
  { name: 'Primary Foreign Affairs or Defence Sector', count: 1377, percentage: 1.0 }
];

export function VisaGrantsChart() {
  const totalVisas = sectorData.reduce((sum, sector) => sum + sector.count, 0);

  const handleDownload = () => {
    const csvContent = [
      ['Sector', 'Visas Granted', 'Percentage'],
      ...sectorData.map(sector => [
        sector.name,
        sector.count,
        `${sector.percentage}%`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visa-grants-by-sector.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Student Visa Grants by Sector (2023-24)</h2>
            <p className="text-sm text-white/60 mt-1">
              Total visas granted: {totalVisas.toLocaleString()}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
        
        <div className="space-y-4">
          {sectorData.map((sector, index) => (
            <VisaGrantsBar
              key={sector.name}
              sector={sector.name}
              count={sector.count}
              percentage={sector.percentage}
              index={index}
            />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-white/60">Total Sectors</p>
              <p className="text-lg font-semibold">{sectorData.length}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Total Visas</p>
              <p className="text-lg font-semibold">{totalVisas.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Largest Sector</p>
              <p className="text-lg font-semibold">{sectorData[0].name.split(' ')[0]}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Data Period</p>
              <p className="text-lg font-semibold">2023-24</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}