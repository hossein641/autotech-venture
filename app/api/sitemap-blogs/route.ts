import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/database';

export async function GET() {
  try {
    const { posts } = await getBlogPosts({
      status: 'PUBLISHED',
      page: 1,
      limit: 1000,
    });

    const blogXml = posts.map((post: any) => `  <url>
    <loc>https://autotech-venture.com/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.featured ? '0.8' : '0.6'}</priority>
  </url>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogXml}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    return new NextResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}