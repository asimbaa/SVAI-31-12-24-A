import { motion } from 'framer-motion';
import { CheckCircle, Users, Clock, Award } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureCard } from '../components/home/FeatureCard';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import AustralianLogo from '../components/AustralianLogo';

const features = [
  {
    icon: CheckCircle,
    title: 'Easy Process',
    description: 'Smart, AI-powered guidance customized to your unique situation'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join a global community of successful applicants'
  },
  {
    icon: Clock,
    title: '24/7 Assistance',
    description: 'Instant answers to your questions, anytime, anywhere'
  },
  {
    icon: Award,
    title: 'Expert Guidance',
    description: 'Built on real-time visa data and success patterns'
  }
];

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center"
        >
          <div className="mb-8">
            <AustralianLogo />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            The Future of Student Visa Applications
          </h1>
          <p className="text-xl text-white font-medium px-6 py-3 bg-black/60 rounded-full backdrop-blur-sm inline-block shadow-lg">
            World's Most Advanced AI Study Visa Assistant
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </div>
  );
}