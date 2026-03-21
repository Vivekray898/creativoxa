import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Add any folders you want to hide from Google
    },
    sitemap: 'https://creativoxa.in/sitemap.xml',
  };
}