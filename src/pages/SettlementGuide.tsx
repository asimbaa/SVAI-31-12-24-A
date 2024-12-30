import { useState } from 'react';
import { settlementGuides } from '../data/settlementData';
import SettlementCard from '../components/SettlementCard';
import { Search } from 'lucide-react';

export default function SettlementGuide() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = settlementGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settlement Guide</h1>
      <p className="text-gray-600 mb-8">
        Essential information and resources to help you settle into life in Australia.
        Find guidance on housing, healthcare, banking, and more.
      </p>

      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-6">
        {filteredGuides.map((guide) => (
          <SettlementCard key={guide.id} guide={guide} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-4">
          Our community forum is a great place to ask questions and connect with
          other Nepalese immigrants who have settled in Australia.
        </p>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Visit Community Forum
        </button>
      </div>
    </div>
  );
}