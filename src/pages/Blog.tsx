import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { BlogList } from '@/components/blog/BlogList';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogTags } from '@/components/blog/BlogTags';
import { PageMetadata } from '@/components/seo/PageMetadata';
import { extractFrontmatter } from '@/lib/blog/parser';
import { getAllTags, getAllCategories } from '@/lib/blog/utils';

// Import all blog posts
const blogPosts = import.meta.glob('../content/blog/*.md', { eager: true });

const posts = Object.entries(blogPosts).map(([path, content]: [string, any]) => ({
  ...extractFrontmatter(content.default),
  path: path.replace('../content/blog/', '').replace('.md', '')
}));

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = getAllCategories(posts);
  const tags = getAllTags(posts);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageMetadata
        title="Blog"
        description="Latest insights, guides, and updates about Australian immigration and student visas"
      />

      <PageHeader
        title="Blog"
        description="Latest insights, guides, and updates about Australian immigration"
      />

      <BlogSearch
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <BlogTags
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />

      <BlogList
        posts={posts}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}