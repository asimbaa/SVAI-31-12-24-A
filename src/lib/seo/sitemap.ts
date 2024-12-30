import type { BlogPost } from '@/types/blog';

export function generateSitemap(posts: BlogPost[]): string {
  const baseUrl = 'https://studentvisaai.com';
  const now = new Date().toISOString();

  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/eligibility-check', priority: 0.9, changefreq: 'weekly' },
    { url: '/visa-types', priority: 0.8, changefreq: 'weekly' },
    { url: '/blog', priority: 0.8, changefreq: 'daily' },
    { url: '/resources', priority: 0.7, changefreq: 'weekly' },
    { url: '/about', priority: 0.6, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' }
  ];

  const entries = [
    ...staticPages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`),
    ...posts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.path}</loc>
      <lastmod>${post.date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.join('')}
</urlset>`;
}