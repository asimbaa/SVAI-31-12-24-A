import { useState } from 'react';
import { mockPosts, type ForumPost as ForumPostType } from '../data/forumData';
import ForumPostComponent from '../components/ForumPost';
import { Search, Filter } from 'lucide-react';

export default function CommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState<ForumPostType['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Create Post
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-white placeholder-white/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ForumPostType['category'] | 'all')}
              className="pl-10 pr-8 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-white"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="visa">Visa</option>
              <option value="jobs">Jobs</option>
              <option value="housing">Housing</option>
              <option value="culture">Culture</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <span className="text-sm text-white/60">Popular tags:</span>
          {['skills-assessment', 'english-test', 'accommodation'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <ForumPostComponent key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}