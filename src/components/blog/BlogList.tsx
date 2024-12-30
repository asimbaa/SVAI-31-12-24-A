import { BlogCard } from './BlogCard';
import type { BlogPost } from '@/types/blog';

interface BlogListProps {
  posts: BlogPost[];
  searchQuery: string;
  selectedCategory: string;
}

export function BlogList({ posts, searchQuery, selectedCategory }: BlogListProps) {
  const filteredPosts = posts
    .filter(post => 
      selectedCategory === 'all' || post.category === selectedCategory
    )
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map((post, index) => (
        <BlogCard
          key={post.path}
          post={post}
          index={index}
        />
      ))}
    </div>
  );
}