import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateMetaTags, siteMetadata } from '@/lib/seo/metadata';

interface PageMetadataProps {
  title?: string;
  description?: string;
  image?: string;
}

export function PageMetadata({ title, description, image }: PageMetadataProps) {
  const location = useLocation();
  const url = `${siteMetadata.siteUrl}${location.pathname}`;

  const metadata = generateMetaTags({
    title,
    description,
    image,
    url
  });

  useEffect(() => {
    // Update document title
    document.title = metadata.title;

    // Update meta tags
    metadata.meta.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metadata.link[0].href);

    // Cleanup
    return () => {
      metadata.meta.forEach(({ name, property }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const element = document.querySelector(selector);
        if (element) element.remove();
      });
    };
  }, [metadata]);

  return null;
}