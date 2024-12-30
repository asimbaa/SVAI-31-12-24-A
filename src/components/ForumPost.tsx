import { type ForumPost as ForumPostType } from '../data/forumData';
import { MessageCircle, ThumbsUp, Tag } from 'lucide-react';

interface ForumPostProps {
  post: ForumPostType;
}

export default function ForumPost({ post }: ForumPostProps) {
  const getCategoryColor = (category: ForumPostType['category']) => {
    const colors = {
      general: 'bg-blue-500/20 text-blue-200',
      visa: 'bg-purple-500/20 text-purple-200',
      jobs: 'bg-green-500/20 text-green-200',
      housing: 'bg-yellow-500/20 text-yellow-200',
      culture: 'bg-pink-500/20 text-pink-200'
    };
    return colors[category];
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start gap-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full ring-2 ring-white/20"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
          <div className="flex items-center gap-3 text-sm text-white/60 mb-3">
            <span>{post.author.name}</span>
            <span>•</span>
            <span>{post.createdAt}</span>
          </div>
          <p className="text-white/80 mb-4">{post.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              {post.replies}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}