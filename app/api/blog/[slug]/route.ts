// app/api/blog/[slug]/route.ts - Complete with all imports
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog/[slug] - Fetch single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    console.log('Fetching post with slug:', slug);

    // Use findFirst() instead of findUnique() with OR conditions
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ],
        status: 'PUBLISHED'
      },
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    console.log('Found post:', post ? 'Yes' : 'No');

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Transform the response
    let parsedKeywords: string[] = [];
    try {
      parsedKeywords = post.keywords ? JSON.parse(post.keywords) : [];
    } catch (error) {
      parsedKeywords = [];
    }

    const result = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: {
        name: post.author.name,
        avatar: post.author.avatar || '',
        title: post.author.title || '',
      },
      publishedAt: post.publishedAt?.toISOString() || '',
      updatedAt: post.updatedAt.toISOString(),
      readTime: post.readTime,
      tags: post.tags.map((pt) => pt.tag.name),
      category: post.category.name,
      featured: post.featured,
      seo: {
        metaTitle: post.metaTitle || undefined,
        metaDescription: post.metaDescription || undefined,
        keywords: parsedKeywords,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog post', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}