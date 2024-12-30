export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateBreadcrumbData(pathname: string): Array<{ name: string; url: string }> {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  let path = '';

  // Add home
  breadcrumbs.push({
    name: 'Home',
    url: 'https://studentvisaai.com'
  });

  // Build breadcrumb trail
  for (const part of parts) {
    path += `/${part}`;
    breadcrumbs.push({
      name: part.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      url: `https://studentvisaai.com${path}`
    });
  }

  return breadcrumbs;
}