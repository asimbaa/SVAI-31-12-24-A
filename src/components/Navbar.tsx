import { Link } from 'react-router-dom';
import { useState } from 'react';
import AustralianLogo from './AustralianLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-navy/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <AustralianLogo />
            <span className="text-lg font-semibold text-white">
              Nepal-Aus Immigration
            </span>
          </Link>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className={`${
            isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-navy/95 border-b border-white/10 p-4 space-y-4' : 'hidden'
          } md:flex md:flex-row md:static md:items-center md:space-x-4 md:space-y-0 text-sm`}>
            <Link to="/dashboard" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Dashboard
            </Link>
            <Link to="/profile" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Profile
            </Link>
            <Link to="/document-upload" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Documents
            </Link>
            <Link to="/interview-prep" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Interview Prep
            </Link>
            <Link to="/community" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Community
            </Link>
            <Link to="/jobs" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Jobs
            </Link>
            <Link to="/settlement-guide" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Settlement Guide
            </Link>
            <Link to="/news" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              News & Updates
            </Link>
            <Link to="/support" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Support & FAQ
            </Link>
            <Link to="/settings" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Settings
            </Link>
            <Link to="/eligibility-check" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Eligibility Check
            </Link>
            <Link to="/visa-types" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Visa Types
            </Link>
            <Link to="/document-checklist" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Document Checklist
            </Link>
            <Link to="/application-guide" className="text-white/80 hover:text-[hsl(var(--gold))] transition-colors">
              Application Guide
            </Link>
            <Link to="/contact" className="md:ml-4 px-4 py-2 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] rounded-lg hover:bg-[hsl(var(--gold))]/90 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}