import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/lib/seo/config';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/structuredData';

interface SEOTagsProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function SEOTags({
  title,
  description,
  image,
  noindex,
  nofollow
}: SEOTagsProps) {
  const location = useLocation();
  const url = `${seoConfig.siteUrl}${location.pathname}`;
  const fullTitle = title 
    ? `${title} | ${seoConfig.defaultTitle}`
    : seoConfig.defaultTitle;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update meta tags
    const metaTags = {
      description: description || seoConfig.defaultDescription,
      'og:title': fullTitle,
      'og:description': description || seoConfig.defaultDescription,
      'og:url': url,
      'og:image': image || `${seoConfig.siteUrl}/og-image.jpg`,
      'twitter:title': fullTitle,
      'twitter:description': description || seoConfig.defaultDescription,
      'twitter:image': image || `${seoConfig.siteUrl}/og-image.jpg`,
      robots: `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Add schema markup
    const schemas = [
      generateOrganizationSchema(),
      generateWebsiteSchema()
    ];

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);

    // Cleanup
    return () => {
      Object.keys(metaTags).forEach(name => {
        const meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) meta.remove();
      });
      script?.remove();
    };
  }, [fullTitle, description, image, url, noindex, nofollow]);

  return null;
}