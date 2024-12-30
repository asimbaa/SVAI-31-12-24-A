import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Zhang',
    country: 'International Student',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    quote: 'StudentVisaAI made my application process so much smoother. The AI guidance was incredibly helpful!'
  },
  {
    name: 'Michael Lee',
    country: 'International Student',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    quote: 'The eligibility checker saved me time and gave me confidence in my application.'
  },
  {
    name: 'Emma Chen',
    country: 'International Student',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    quote: 'The document checklist feature ensured I had everything ready for my visa application.'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-white/80">
            Join thousands of successful students who achieved their Australian study dreams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}