import { motion } from 'framer-motion';
import { Users, Shield, Clock, Globe, BookOpen, Sparkles, Heart } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Excellence',
    description: 'Leading the industry with advanced AI technology for visa processing'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Supporting international students from all corners of the world'
  },
  {
    icon: Shield,
    title: 'Trusted Platform',
    description: 'Enterprise-grade security protecting your sensitive information'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock AI assistance when you need it most'
  }
];

const stats = [
  { number: '50,000+', label: 'Students Assisted' },
  { number: '98%', label: 'Success Rate' },
  { number: '24/7', label: 'AI Support' }
];

const values = [
  { icon: Users, label: 'Inclusivity' },
  { icon: Shield, label: 'Trust' },
  { icon: Globe, label: 'Global Access' },
  { icon: BookOpen, label: 'Innovation' },
  { icon: Heart, label: 'Student Success' }
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Students Worldwide
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Your AI companion for studying in Australia, making visa applications seamless and successful
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-white/80">
            To revolutionize the student visa application process through cutting-edge AI technology,
            empowering international students to achieve their academic dreams in Australia with confidence
            and ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-white/80">
            To be the world's leading AI platform for student visas, setting new standards in
            immigration technology and supporting millions of students in accessing quality education
            abroad.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-12">Our Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
              >
                <Icon className="w-8 h-8 text-[hsl(var(--gold))] mx-auto mb-4" />
                <h3 className="font-semibold">{value.label}</h3>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="text-4xl font-bold text-[hsl(var(--gold))] mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
            >
              <Icon className="w-8 h-8 text-[hsl(var(--gold))] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students who have achieved their dreams of studying in Australia
          with the help of StudentVisaAI.
        </p>
        <button className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-8 py-3 rounded-lg font-semibold hover:bg-[hsl(var(--gold))]/90 transition-colors">
          Get Started Today
        </button>
      </motion.div>
    </div>
  );
}