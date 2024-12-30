import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { SEOProvider } from './components/seo/SEOProvider';
import { AnalyticsProvider } from './components/seo/AnalyticsProvider';
import { ScrollToTop } from './components/navigation/ScrollToTop';
import ResourceGuides from './pages/resources/ResourceGuides';
import ResourceVideos from './pages/resources/ResourceVideos';
import ResourceLinks from './pages/resources/ResourceLinks';
import ResourceFAQ from './pages/resources/ResourceFAQ';
import ScholarshipExplorer from './pages/ScholarshipExplorer';
import FinancialPlanner from './pages/FinancialPlanner';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import EligibilityCheck from './pages/EligibilityCheck';
import VisaTypes from './pages/VisaTypes';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import CommunityForum from './pages/CommunityForum';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotificationCenter from './components/dashboard/NotificationCenter';
import ApplicationStatus from './pages/ApplicationStatus';
import DocumentUpload from './pages/DocumentUpload';
import { ApplicationTimeline } from './components/dashboard/ApplicationTimeline';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsProvider>
          <SEOProvider>
            <ScrollToTop />
            <div className="min-h-screen font-inter relative flex flex-col bg-[hsl(var(--navy))]">
              <Header />
              <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/dashboard">
                    <Route index element={<Navigate to="/dashboard/overview" />} />
                    <Route path="overview" element={<Dashboard />} />
                    <Route path="applications" element={<ApplicationStatus />} />
                    <Route path="documents" element={<DocumentUpload />} />
                    <Route path="eligibility" element={<EligibilityCheck />} />
                    <Route path="visa-types" element={<VisaTypes />} />
                    <Route path="timeline" element={<ApplicationTimeline />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="notifications" element={<NotificationCenter />} />
                  </Route>
                  <Route path="/resources" element={<Resources />}>
                    <Route index element={<Navigate to="/resources/guides" />} />
                    <Route path="guides" element={<ResourceGuides />} />
                    <Route path="videos" element={<ResourceVideos />} />
                    <Route path="links" element={<ResourceLinks />} />
                    <Route path="faq" element={<ResourceFAQ />} />
                    <Route path="scholarships" element={<ScholarshipExplorer />} />
                    <Route path="financial-planner" element={<FinancialPlanner />} />
                  </Route>
                  <Route path="/blog/*" element={<Blog />} />
                  <Route path="/community-forum" element={<CommunityForum />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </SEOProvider>
        </AnalyticsProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;