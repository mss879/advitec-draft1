import { MetadataRoute } from 'next';
import { blogPosts } from './blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://advitecint.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic blog post routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
