import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/database';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.autotech-venture.com';
  
  // Static pages based on your ACTUAL app folder structure
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    
    // Main Services Page
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // AI & Automation Service Pages (as they exist in your project)
    {
      url: `${baseUrl}/ai-solutions-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-consultant-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/process-automation-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-development-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/data-analytics-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Web Design Service Page (as it exists)
    {
      url: `${baseUrl}/web-design-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // SEO Service Page (as it exists)
    {
      url: `${baseUrl}/seo-services-dayton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Blog Section
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },

    // Company Pages (as they exist)
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch all published blog posts from your database
    const { posts } = await getBlogPosts({
      status: 'PUBLISHED',
      page: 1,
      limit: 1000, // Get all published posts
    });

    console.log(`📋 Sitemap: Found ${posts.length} published blog posts`);

    // Generate blog post URLs using actual post structure
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.6,
    }));

    console.log('✅ Sitemap generated successfully:', {
      staticPages: staticRoutes.length,
      blogPosts: blogRoutes.length,
      total: staticRoutes.length + blogRoutes.length
    });

    // Combine static and dynamic routes
    return [...staticRoutes, ...blogRoutes];

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    // Return static routes if database fails
    console.log('📋 Falling back to static sitemap');
    return staticRoutes;
  }
}