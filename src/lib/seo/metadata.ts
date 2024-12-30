export const siteMetadata = {
  title: 'Student Visa: AI Powered Immigration Assistant',
  description: "Australia's leading AI-powered student visa application platform. Get personalized guidance for your study journey.",
  siteUrl: 'https://studentvisaai.com',
  author: 'StudentVisaAI',
  twitterHandle: '@studentvisaai',
  defaultImage: '/og-image.jpg',
};

export const generateMetaTags = (pageMetadata: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) => {
  const title = pageMetadata.title 
    ? `${pageMetadata.title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const description = pageMetadata.description || siteMetadata.description;
  const image = pageMetadata.image || siteMetadata.defaultImage;
  const url = pageMetadata.url || siteMetadata.siteUrl;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  };
};