import type { BlogPost } from '@/types/blog';

export function extractFrontmatter(content: string): BlogPost {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) throw new Error('No frontmatter found');
  
  const frontmatter = match[1].split('\n').reduce((acc, line) => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      acc[key.trim()] = value.join(':').trim().replace(/^["']|["']$/g, '');
    }
    return acc;
  }, {} as any);

  // Parse tags from string to array
  if (frontmatter.tags) {
    frontmatter.tags = frontmatter.tags
      .replace(/[\[\]"]/g, '')
      .split(',')
      .map((tag: string) => tag.trim());
  }

  return frontmatter as BlogPost;
}