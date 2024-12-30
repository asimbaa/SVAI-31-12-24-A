import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/blog/utils';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            <Link to={`/blog/${post.path}`}>
              <h3 className="font-medium mb-2 line-clamp-2 hover:text-[hsl(var(--gold))] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-white/60 mb-2">{formatDate(post.date)}</p>
              <p className="text-sm text-white/80 line-clamp-3">{post.excerpt}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}