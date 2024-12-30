export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StudentVisaAI',
    url: 'https://studentvisaai.com',
    logo: 'https://studentvisaai.com/logo.svg',
    sameAs: [
      'https://facebook.com/studentvisaai',
      'https://twitter.com/studentvisaai',
      'https://linkedin.com/company/studentvisaai'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-2-3456-7890',
      contactType: 'customer service',
      availableLanguage: ['English', 'Nepali']
    }
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StudentVisaAI',
    url: 'https://studentvisaai.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://studentvisaai.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}