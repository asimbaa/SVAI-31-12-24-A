import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailContent = `
Dear StudentVisaAI Team,

A new contact form submission has been received:

Contact Details:
---------------
Name: ${formData.name}
Email: ${formData.email}

Subject: ${formData.subject}

Message:
---------
${formData.message}

Best regards,
${formData.name}
    `.trim();

    // Create mailto link with pre-filled content
    const mailtoLink = `mailto:contact@studentvisaai.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailContent)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-white/80">
          Get in touch with our team for personalized immigration assistance.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-[hsl(var(--gold))] mr-4" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:contact@studentvisaai.com" className="text-white/80 hover:text-[hsl(var(--gold))]">
                    contact@studentvisaai.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[hsl(var(--gold))] mr-4" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+61040104335" className="text-white/80 hover:text-[hsl(var(--gold))]">
                    +61 04 010 44 335
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-[hsl(var(--gold))] mr-4" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-white/80">
                    15 Barton Rd<br />
                    Artarmon, NSW 2064<br />
                    Australia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-white/80">Monday - Friday:</span>
                <span>10:00 AM - 3:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span className="text-white/80">Saturday:</span>
                <span>10:00 AM - 11:00 AM</span>
              </p>
              <p className="flex justify-between">
                <span className="text-white/80">Sunday:</span>
                <span className="text-white/60">Closed</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20"
                  placeholder="Your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-semibold py-3 px-4 rounded-lg hover:bg-[hsl(var(--gold))]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}