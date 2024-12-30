import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, Phone, Building2 } from 'lucide-react';
import { XIcon } from './icons/XIcon';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: XIcon, href: 'https://x.com/StudentVisaAI', label: 'X (Twitter)' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Visa Types', path: '/visa-types' },
  { label: 'Eligibility Check', path: '/eligibility' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Contact', path: '/contact' }
];

const resourceLinks = [
  { label: 'Guides', path: '/resources/guides' },
  { label: 'Videos', path: '/resources/videos' },
  { label: 'Useful Links', path: '/resources/links' },
  { label: 'FAQ', path: '/resources/faq' },
  { label: 'Scholarship Finder', path: '/resources/scholarships' },
  { label: 'Financial Planner', path: '/resources/financial-planner' }
];

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">StudentVisaAI</h3>
            <p className="text-white/60 mb-4">
              The world's most advanced AI platform for Australian student visa applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@studentvisaai.com"
                className="flex items-center text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@studentvisaai.com
              </a>
              <a
                href="tel:+61040104335"
                className="flex items-center text-white/60 hover:text-[hsl(var(--gold))] transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                +61 04 010 44 335
              </a>
              <div className="flex items-center text-white/60 mt-2">
                <Building2 className="w-5 h-5 mr-2" />
                <p className="text-sm">
                15 Barton Rd<br />
                Artarmon, NSW 2064<br />
                Australia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          <p>© {new Date().getFullYear()} StudentVisaAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}