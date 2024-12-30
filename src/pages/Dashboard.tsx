import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ApplicationStatus } from '@/components/dashboard/ApplicationStatus';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { StatisticsGrid } from '@/components/dashboard/StatisticsGrid';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DocumentStatus } from '@/components/dashboard/DocumentStatus';
import { ApplicationTimeline } from '@/components/dashboard/ApplicationTimeline';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { AccountOverview } from '@/components/dashboard/AccountOverview';
import { ScholarshipOverview } from '@/components/dashboard/ScholarshipOverview';
import { VisaGrantsChart } from '@/components/dashboard/VisaGrantsChart';
import { FinancialPlanner } from '@/components/dashboard/FinancialPlanner';
import { VisaProcessingTimesChart } from '@/components/dashboard/charts/VisaProcessingTimesChart';
import { TopDestinationsChart } from '@/components/dashboard/charts/TopDestinationsChart';
import { ScholarshipTrendsChart } from '@/components/dashboard/charts/ScholarshipTrendsChart';
import { SourceCountriesChart } from '@/components/dashboard/charts/SourceCountriesChart';
import { LocationBreakdownChart } from '@/components/dashboard/charts/LocationBreakdownChart';
import { CreateProfileForm } from '@/components/profile/CreateProfileForm';
import { useAuthContext } from '@/components/auth/AuthProvider';
import type { ProfileData } from '@/lib/types/profile';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname === '/dashboard/account' ? 'account' : 'overview');
  const { user } = useAuthContext();
  const [hasProfile, setHasProfile] = useState(Boolean(user?.hasProfile));

  useEffect(() => {
    // Update active tab based on URL
    if (location.pathname === '/dashboard/account') {
      setActiveTab('account');
    }
  }, [location]);

  const handleProfileSubmit = (data: ProfileData) => {
    // In a real app, this would save to your backend
    console.log('Profile data:', data);
    setHasProfile(true);
    navigate('/dashboard');
    setActiveTab('overview');
  };

  return (
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <StatisticsGrid />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <ApplicationStatus />
              <QuickActions />
              <RecentActivity />
            </div>

            <div className="mb-8 bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Visa Statistics & Trends</h2>
              <VisaGrantsChart />
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <SourceCountriesChart />
                <LocationBreakdownChart />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <VisaProcessingTimesChart />
                <TopDestinationsChart />
                <ScholarshipTrendsChart />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <DocumentStatus />
              <ApplicationTimeline />
              <ScholarshipOverview
                scholarships={[]} // Add mock data here
                onViewAll={() => navigate('/resources/scholarships')}
              />
              <FinancialPlanner
                data={{
                  totalRequired: 50000,
                  currentSavings: 20000,
                  monthlyTarget: 2500,
                  currency: 'AUD'
                }}
                onViewDetails={() => navigate('/resources/financial-planner')}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AIRecommendations />
              <UpcomingTasks />
            </div>
          </TabsContent>

          <TabsContent value="account">
            {!hasProfile ? (
              <CreateProfileForm onSubmit={handleProfileSubmit} />
            ) : (
              <AccountOverview />
            )}
          </TabsContent>
        </Tabs>
      </div>
  );
}