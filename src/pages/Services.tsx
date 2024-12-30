import { motion } from 'framer-motion';
import { FileCheck, GraduationCap, Search, Home, Globe, MessageSquare } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    title: 'Visa Eligibility Check',
    description: 'Get instant AI-powered assessment of your student visa eligibility',
    icon: FileCheck,
    features: [
      'Personalized eligibility analysis',
      'Points calculator',
      'Document requirements list',
      'Success probability score'
    ]
  },
  {
    title: 'Scholarship Finder',
    description: 'Discover scholarships tailored to your academic profile',
    icon: GraduationCap,
    features: [
      'Personalized scholarship matches',
      'Application deadline tracking',
      'Required documents checklist',
      'Application tips and guides'
    ]
  },
  {
    title: 'Document Assistant',
    description: 'Streamline your document preparation with AI assistance',
    icon: Search,
    features: [
      'Document validation',
      'Auto-form filling',
      'Translation assistance',
      'Secure storage'
    ]
  },
  {
    title: 'Accommodation Guide',
    description: 'Find the perfect student housing near your university',
    icon: Home,
    features: [
      'University proximity search',
      'Budget planning tools',
      'Virtual tours',
      'Booking assistance'
    ]
  },
  {
    title: 'Cultural Integration',
    description: 'Prepare for life in Australia with cultural insights',
    icon: Globe,
    features: [
      'Australian customs guide',
      'Student life tips',
      'Local transport guide',
      'Social connection tools'
    ]
  },
  {
    title: '24/7 AI Support',
    description: 'Get instant answers to your visa-related questions',
    icon: MessageSquare,
    features: [
      'Real-time chat assistance',
      'Multi-language support',
      'Process guidance',
      'Updates tracking'
    ]
  }
];

const stats = [
  { number: '50,000+', label: 'Students Assisted' },
  { number: '98%', label: 'Success Rate' },
  { number: '24/7', label: 'AI Support' }
];

const testimonials = [
  {
    quote: "The scholarship finder saved me countless hours of research. I found the perfect opportunity!",
    author: "Sarah Chen",
    role: "International Student"
  },
  {
    quote: "The document assistant made sure I had everything perfect before submitting my application.",
    author: "Michael Kim",
    role: "International Student"
  },
  {
    quote: "24/7 AI support answered all my questions instantly. It's like having an expert always available.",
    author: "Emma Singh",
    role: "International Student"
  }
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Services to Simplify Your Student Visa Journey"
        description="Comprehensive AI-powered tools and support for your Australian study adventure"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:border-white/20 transition-colors">
                <CardHeader>
                  <Icon className="w-8 h-8 text-[hsl(var(--gold))] mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-[hsl(var(--gold))] mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
            >
              <p className="text-white/80 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-white/60">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students who have achieved their dreams of studying in Australia
          with StudentVisaAI.
        </p>
        <Button
          className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-8 py-3"
        >
          Get Started Today
        </Button>
      </motion.div>
    </div>
  );
}