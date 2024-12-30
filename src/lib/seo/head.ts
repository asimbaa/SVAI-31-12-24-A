import { siteMetadata } from './metadata';

interface HeadOptions {
  title: string;
  description: string;
  canonical?: string;
  schema?: any;
  alternates?: { [key: string]: string };
  preload?: Array<{ href: string; as: string; type?: string }>;
  preconnect?: string[];
  prefetch?: string[];
  dns_prefetch?: string[];
}

export function updateHead(options: HeadOptions) {
  // Update title and meta description
  document.title = options.title;
  
  // Add preconnect hints
  if (options.preconnect) {
    options.preconnect.forEach(url => {
      let link = document.querySelector(`link[rel="preconnect"][href="${url}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', url);
        link.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(link);
      }
    });
  }

  // Add DNS prefetch
  if (options.dns_prefetch) {
    options.dns_prefetch.forEach(url => {
      let link = document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'dns-prefetch');
        link.setAttribute('href', url);
        document.head.appendChild(link);
      }
    });
  }

  // Update or create meta tags
  const metaTags = {
    description: options.description,
    'og:title': options.title,
    'og:description': options.description,
    'og:type': 'website',
    'og:site_name': siteMetadata.title,
    'og:locale': 'en_AU',
    'article:publisher': 'https://facebook.com/studentvisaai',
    'twitter:card': 'summary_large_image',
    'twitter:site': siteMetadata.twitterHandle,
    'twitter:title': options.title,
    'twitter:description': options.description,
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#000000'
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

  // Update canonical link
  if (options.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', options.canonical);
  }

  // Add alternate language versions
  if (options.alternates) {
    Object.entries(options.alternates).forEach(([lang, url]) => {
      let alternate = document.querySelector(`link[hreflang="${lang}"]`);
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', lang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute('href', url);
    });
  }

  // Add preload directives
  if (options.preload) {
    options.preload.forEach(({ href, as, type }) => {
      let link = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preload');
        link.setAttribute('href', href);
        link.setAttribute('as', as);
        if (type) link.setAttribute('type', type);
        document.head.appendChild(link);
      }
    });
  }

  // Add schema markup if provided
  if (options.schema) {
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(options.schema);
  }
}