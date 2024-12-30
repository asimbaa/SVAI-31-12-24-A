import { generateSitemap } from './sitemap';
import type { BlogPost } from '@/types/blog';

export async function generateSitemapFile(posts: BlogPost[]) {
  // Generate sitemap
  const sitemap = generateSitemap(posts);

  // In a browser environment, we'll return the sitemap string
  // instead of writing to the filesystem
  return sitemap;
}