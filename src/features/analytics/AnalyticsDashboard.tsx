import { useEffect, useState } from 'react';
import { analyticsTracker } from '@/lib/analytics/tracker';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Card } from '@/components/ui/Card';

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    duration: 0,
    completionRate: 0,
    currentStep: ''
  });

  useEffect(() => {
    const updateAnalytics = () => {
      setAnalytics(analyticsTracker.getSessionAnalytics());
    };

    const interval = setInterval(updateAnalytics, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Completion Progress</h3>
        <div className="flex items-center justify-center">
          <ProgressRing progress={analytics.completionRate * 100} />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Time Spent</h3>
        <p className="text-2xl font-bold text-center">
          {Math.floor(analytics.duration / 60000)} minutes
        </p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Current Step</h3>
        <p className="text-lg text-center text-white/80">
          {analytics.currentStep || 'Not started'}
        </p>
      </Card>
    </div>
  );
}