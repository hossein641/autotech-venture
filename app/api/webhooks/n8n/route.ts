// app/api/webhooks/n8n/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

export async function POST(request: NextRequest) {
  try {
    console.log('🔗 n8n Webhook received');
    
    // Authentication
    const authHeader = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
    
    if (expectedSecret && authHeader !== expectedSecret) {
      console.log('❌ Authentication failed:', { provided: authHeader, expected: !!expectedSecret });
      return NextResponse.json(
        { error: 'Unauthorized webhook' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    console.log('🔗 n8n Data received:', {
      title: body.title,
      excerpt: body.excerpt?.substring(0, 50) + '...',
      contentLength: body.content?.length,
      categoryId: body.categoryId,
      status: body.status
    });
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content'];
    const missing = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missing_fields: missing },
        { status: 400 }
      );
    }
    
    // Initialize Turso client directly (no Prisma)
    const DATABASE_URL = process.env.DATABASE_URL;
    const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;
    
    if (!DATABASE_URL || !TURSO_AUTH_TOKEN) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }
    
    const turso = createClient({
      url: DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN
    });
    
    // Generate unique slug (support custom slug or auto-generate)
    let baseSlug;
    if (body.slug && body.slug.trim()) {
      // Use provided slug
      baseSlug = body.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 50);
    } else {
      // Auto-generate from title
      baseSlug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 50);
    }

    // Check uniqueness (same logic)
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existingPost = await turso.execute({
        sql: 'SELECT id FROM BlogPost WHERE slug = ?',
        args: [slug]
      });
      
      if (existingPost.rows.length === 0) break;
      
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Generate post ID
    const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate read time (200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // Prepare post data
    const postData = {
      id: postId,
      slug,
      title: body.title.trim(),
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      categoryId: body.categoryId || 'cat_ai',
      authorId: body.authorId || 'author_hossein_1755215496184',
      status: body.status || 'DRAFT',
      featured: body.featured ? 1 : 0, // SQLite uses 1/0 for boolean
      readTime,
      publishedAt: body.status === 'PUBLISHED' ? new Date().toISOString() : null,
      featuredImage: body.featuredImage || null,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      keywords: JSON.stringify(body.keywords || []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Insert post directly via Turso
    await turso.execute({
      sql: `INSERT INTO BlogPost (
        id, slug, title, excerpt, content, categoryId, authorId, 
        status, featured, readTime, publishedAt, featuredImage, 
        metaTitle, metaDescription, keywords, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        postData.id,
        postData.slug,
        postData.title,
        postData.excerpt,
        postData.content,
        postData.categoryId,
        postData.authorId,
        postData.status,
        postData.featured,
        postData.readTime,
        postData.publishedAt,
        postData.featuredImage,
        postData.metaTitle,
        postData.metaDescription,
        postData.keywords,
        postData.createdAt,
        postData.updatedAt
      ]
    });
    
    console.log('✅ Post created successfully via Turso:', {
      id: postData.id,
      slug: postData.slug,
      title: postData.title,
      status: postData.status
    });
    
    return NextResponse.json({
      success: true,
      message: 'Post created successfully via n8n webhook',
      post: {
        id: postData.id,
        slug: postData.slug,
        title: postData.title,
        status: postData.status,
        url: `https://autotech-venture.com/blog/${postData.slug}`
      }
    });
    
  } catch (error: any) {
    console.error('❌ n8n Webhook error:', error);
    
    // Handle specific database errors
    if (error.message?.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'Duplicate entry - slug already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed', 
        details: error.message || 'Unknown database error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}