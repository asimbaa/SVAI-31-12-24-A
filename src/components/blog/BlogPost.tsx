import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { PageMetadata } from '../seo/PageMetadata';
import { generateBlogSchema } from '@/lib/seo/schema';
import { updateHead } from '@/lib/seo/head';
import { Button } from '../ui/Button';
import { extractFrontmatter } from '@/lib/blog/parser';
import { getRelatedPosts } from '@/lib/blog/utils';
import { RelatedPosts } from './RelatedPosts';

// Import all blog posts
const blogPosts = import.meta.glob('../../content/blog/*.md', { eager: true });

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ content: string; metadata: any } | null>(null);

  useEffect(() => {
    const postPath = `../../content/blog/${slug}.md`;
    const postContent = blogPosts[postPath] as any;
    const baseUrl = 'https://studentvisaai.com';

    if (postContent) {
      const metadata = extractFrontmatter(postContent.default);
      const content = postContent.default.replace(/---\n[\s\S]*?\n---/, '').trim();
      setPost({ content, metadata });
      
      // Update head with schema
      updateHead({
        title: `${metadata.title} | StudentVisaAI Blog`,
        description: metadata.excerpt,
        canonical: `${baseUrl}/blog/${slug}`,
        schema: generateBlogSchema({
          title: metadata.title,
          date: metadata.date,
          author: metadata.author,
          excerpt: metadata.excerpt,
          url: `${baseUrl}/blog/${slug}`
        })
      });
    }
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageMetadata
        title={post.metadata.title}
        description={post.metadata.excerpt}
      />

      <Button
        variant="outline"
        className="mb-8"
        onClick={() => navigate('/blog')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Button>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
      >
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.metadata.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.metadata.author}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag: string) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <RelatedPosts
          posts={getRelatedPosts(post.metadata, Object.values(blogPosts).map(p => 
            extractFrontmatter((p as any).default)
          ))}
        />
      </motion.article>
    </div>
  );
}