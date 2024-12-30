import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const slides = [
  {
    title: 'Study at Top Australian Universities',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920',
    description: 'Join prestigious institutions and unlock your potential'
  },
  {
    title: 'Discover Scholarship Opportunities',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920',
    description: 'Find financial support tailored to your profile'
  },
  {
    title: 'Navigate Your Visa Journey',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920',
    description: 'Get personalized guidance for your study visa application'
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-[hsl(var(--navy))]/80" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your Dream of Studying in Australia Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8"
          >
            Experience the world's most advanced AI-powered platform for Australian student visa applications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/dashboard/eligibility">
              <Button size="lg" className="w-full sm:w-auto">
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/dashboard/visa-types">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Visa Types
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}