import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
    >
      <Link to={`/blog/${post.path}`}>
        <div className="mb-4">
          <span className="text-sm text-[hsl(var(--gold))]">{post.category}</span>
          <h2 className="text-xl font-semibold mt-2 mb-3 group-hover:text-[hsl(var(--gold))] transition-colors">{post.title}</h2>
          <p className="text-white/80 text-sm mb-4">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </Link>
    </motion.article>
  );
}