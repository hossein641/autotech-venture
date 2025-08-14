import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPostSchema } from '@/lib/validation';

// POST /api/webhooks/blog - n8n webhook for automated post creation
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const webhookSecret = request.headers.get('x-webhook-secret');
    if (webhookSecret !== process.env.N8N_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = createPostSchema.parse(body);

    // Generate unique slug
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure slug uniqueness
    let counter = 1;
    let uniqueSlug = slug;
    while (await prisma.blogPost.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // Find default author for automated posts
    const defaultAuthor = await prisma.user.findFirst({
      where: { email: process.env.DEFAULT_AUTHOR_EMAIL || 'admin@atechv.com' },
    });

    if (!defaultAuthor) {
      return NextResponse.json(
        { error: 'Default author not found' },
        { status: 500 }
      );
    }

    // Calculate read time
    const wordCount = data.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Create post
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: JSON.stringify(data.keywords || []),
        featured: data.featured,
        status: process.env.AUTO_PUBLISH_ENABLED === 'true' 
          ? 'PUBLISHED' 
          : 'DRAFT',
        readTime,
        publishedAt: process.env.AUTO_PUBLISH_ENABLED === 'true' 
          ? new Date() 
          : undefined,
        authorId: defaultAuthor.id,
        categoryId: data.categoryId,
        tags: {
          create: (data.tagIds || []).map(tagId => ({ tagId })),
        },
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
    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        author: {
          name: post.author.name,
          avatar: post.author.avatar,
          title: post.author.title,
        },
        publishedAt: post.publishedAt,
        readTime: post.readTime,
        tags: post.tags.map(pt => pt.tag.name),
        category: post.category.name,
        featured: post.featured,
        seo: {
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          keywords: JSON.parse(post.keywords || '[]'),
        },
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}