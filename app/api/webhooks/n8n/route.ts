// app/api/webhooks/n8n/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('🔗 n8n Webhook received');
    
    // Authentication (uncomment to enable)
    const authHeader = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
    
    if (expectedSecret && authHeader !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized webhook' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    console.log('🔗 n8n Data received:', body);
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content'];
    const missing = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missing_fields: missing },
        { status: 400 }
      );
    }
    
    // Generate unique slug
    const baseSlug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
    
    let slug = baseSlug;
    let counter = 1;
    
    // Ensure slug uniqueness
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Calculate read time (200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // Create post directly in database (no internal HTTP call)
    const postData = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      categoryId: body.categoryId || 'cat_ai',
      authorId: body.authorId || 'author_hossein_1755215496184',
      status: body.status || 'DRAFT',
      featured: body.featured || false,
      readTime,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
      ...(body.featuredImage && { featuredImage: body.featuredImage }),
      ...(body.metaTitle && { metaTitle: body.metaTitle }),
      ...(body.metaDescription && { metaDescription: body.metaDescription }),
      ...(body.keywords && { keywords: JSON.stringify(body.keywords) })
    };
    
    // Create the post directly via Prisma (no HTTP call needed)
    const createdPost = await prisma.blogPost.create({
      data: postData,
      include: {
        author: {
          select: {
            name: true,
            avatar: true,
            title: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      }
    });
    
    console.log('✅ Post created successfully:', createdPost.slug);
    
    return NextResponse.json({
      success: true,
      message: 'Post created successfully via n8n webhook',
      post: {
        id: createdPost.id,
        slug: createdPost.slug,
        title: createdPost.title,
        status: createdPost.status,
        url: `https://www.autotech-venture.com/blog/${createdPost.slug}`
      }
    });
    
  } catch (error: any) {
    console.error('❌ n8n Webhook error:', error);
    
    // Handle Prisma/database errors specifically
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate entry - slug already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed', 
        details: error.message || 'Unknown database error'
      },
      { status: 500 }
    );
  }
}