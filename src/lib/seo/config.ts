export const seoConfig = {
  titleTemplate: '%s | StudentVisaAI',
  defaultTitle: 'Student Visa: AI Powered Immigration Assistant',
  defaultDescription: "Australia's leading AI-powered student visa application platform. Get personalized guidance for your study journey.",
  siteUrl: 'https://studentvisaai.com',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    site_name: 'StudentVisaAI'
  },
  additionalMetaTags: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#000000' }
  ],
  additionalLinkTags: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
    { rel: 'manifest', href: '/manifest.json' }
  ]
};