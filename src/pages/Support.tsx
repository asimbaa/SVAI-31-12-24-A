import { useState } from 'react';
import { faqCategories } from '../data/supportData';
import FAQAccordion from '../components/FAQAccordion';
import { Search, MessageCircle, Mail, Phone } from 'lucide-react';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqCategories
    .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
    .flatMap(category => category.faqs)
    .filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Support & FAQ</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
          <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            Start Chat
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm mb-4">Get help via email</p>
          <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            Send Email
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-600 text-sm mb-4">Call us directly</p>
          <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            View Number
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Categories</option>
            {faqCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <FAQAccordion key={faq.id} faq={faq} />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? Our community forum is a great place to ask
          questions and get help from other Nepalese immigrants.
        </p>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Visit Community Forum
        </button>
      </div>
    </div>
  );
}