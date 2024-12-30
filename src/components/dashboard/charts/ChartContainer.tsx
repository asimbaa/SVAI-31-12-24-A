import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onDownload?: () => void;
  subtitle?: string;
}

export function ChartContainer({
  title,
  icon,
  children,
  onDownload,
  subtitle
}: ChartContainerProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2">
              {icon}
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-sm text-white/60 mt-1">{subtitle}</p>
            )}
          </div>
          {onDownload && (
            <Button
              variant="outline"
              onClick={onDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
}