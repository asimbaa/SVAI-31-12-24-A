export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image || 'https://studentvisaai.com/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'StudentVisaAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://studentvisaai.com/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

export function generateBlogSchema(post: {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'StudentVisaAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://studentvisaai.com/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url
    }
  };
}
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider
    },
    url: course.url,
    timeRequired: course.duration,
    startDate: course.startDate,
    endDate: course.endDate,
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'AUD'
    }
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StudentVisaAI',
    alternateName: 'Student Visa AI Assistant',
    url: 'https://studentvisaai.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://studentvisaai.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

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
      'https://linkedin.com/company/studentvisaai',
      'https://instagram.com/studentvisaai'
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+61-2-3456-7890',
      contactType: 'customer service',
      areaServed: ['AU', 'NP'],
      availableLanguage: ['English', 'Nepali']
    }]
  };
}