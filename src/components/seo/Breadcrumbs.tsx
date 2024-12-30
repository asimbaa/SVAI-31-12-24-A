import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbData, generateBreadcrumbSchema } from '@/lib/seo/breadcrumbs';
import { useEffect } from 'react';

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const pathname = window.location.pathname;
  const items = generateBreadcrumbData(pathname);

  useEffect(() => {
    // Add schema markup
    const schema = generateBreadcrumbSchema(items);
    let script = document.querySelector('script[data-schema="breadcrumbs"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'breadcrumbs');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      script?.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
            )}
            {index === items.length - 1 ? (
              <span className="text-white/60">{item.name}</span>
            ) : (
              <Link
                to={item.url}
                className="text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}