import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/lib/seo/config';
import { preloadResources, addResourceHints, addSecurityHeaders } from '@/lib/seo/performance';
import { generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo/schema';

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Add base meta tags
    document.title = seoConfig.defaultTitle;
    
    // Add performance optimizations
    preloadResources();
    addResourceHints();
    addSecurityHeaders();

    // Add schema markup
    const schemas = [
      generateWebSiteSchema(),
      generateOrganizationSchema()
    ];

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);
  }, [location]);

  return <>{children}</>;
}