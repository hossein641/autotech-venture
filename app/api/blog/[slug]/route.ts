// app/api/blog/[slug]/route.ts - PRODUCTION ONLY (Turso)
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/database';
import { blogPostSchema } from '@/lib/validation';
import { generateSlug, calculateReadTime } from '@/lib/types';
import { createClient } from '@libsql/client';

// Initialize Turso client for this route
const DATABASE_URL = process.env.DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

const turso = createClient({
  url: DATABASE_URL!,
  authToken: TURSO_AUTH_TOKEN!
});

// GET /api/blog/[slug] - Fetch individual post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    console.log('🔍 Individual Post API Request:', { 
      slug,
      timestamp: new Date().toISOString(),
      url: request.url
    });

    const post = await getBlogPostBySlug(slug);

    if (!post) {
      console.log('❌ Post not found:', { slug });
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('✅ Individual Post API Response:', { 
      title: post.title,
      slug: post.slug,
      status: post.status || 'PUBLISHED'
    });

    return NextResponse.json(post);

  } catch (error) {
    console.error('❌ Individual Post API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update existing post by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('🔧 PUT /api/blog/[slug] - Updating post:', params.slug);

    // Parse request body
    const body = await request.json();
    console.log('📝 Update request body received:', {
      title: body.title,
      status: body.status,
      category: body.category,
      hasContent: !!body.content,
      hasExcerpt: !!body.excerpt
    });

    // Basic validation before processing
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!body.excerpt) {
      return NextResponse.json(
        { error: 'Excerpt is required' },
        { status: 400 }
      );
    }

    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Check if post exists first
    const existingPost = await getBlogPostBySlug(params.slug);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Category name to ID mapping (your exact production mapping)
    const getCategoryId = (categoryName: string): string => {
      const categoryMap: Record<string, string> = {
        "AI Solutions": "cat_ai",
        "SEO Services": "cat_seo", 
        "Web Development": "cat_web",
        "Automation": "cat_auto"
      };
      
      return categoryMap[categoryName] || "cat_ai";
    };

    // Process the data before validation
    const processedBody = {
      title: body.title,
      excerpt: body.excerpt, 
      content: body.content,
      featuredImage: body.featuredImage,
      featured: body.featured || false,
      status: body.status || 'DRAFT',
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords || [],
      categoryId: body.categoryId || getCategoryId(body.category || "AI Solutions"),
      authorId: body.authorId || "author_hossein_1755215496184",
      slug: body.slug || params.slug,
      readTime: body.readTime || calculateReadTime(body.content || '')
    };

    console.log('🔧 Processed update data:', {
      title: processedBody.title,
      categoryId: processedBody.categoryId,
      slug: processedBody.slug,
      status: processedBody.status
    });

    // Validate the processed data
    const validation = blogPostSchema.safeParse(processedBody);
    if (!validation.success) {
      console.log('❌ Validation failed:', validation.error.format());
      return NextResponse.json(
        { error: 'Invalid blog post data', details: validation.error.format() },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Set publishedAt if status is PUBLISHED and it wasn't published before
    if (validatedData.status === 'PUBLISHED' && !existingPost.publishedAt) {
      validatedData.publishedAt = new Date().toISOString();
      console.log(`📅 Set publishedAt: ${validatedData.publishedAt}`);
    }

    // Update in Turso database
    const now = new Date().toISOString();
    
    const sql = `
      UPDATE BlogPost SET
        title = ?,
        excerpt = ?,
        content = ?,
        featuredImage = ?,
        categoryId = ?,
        status = ?,
        featured = ?,
        metaTitle = ?,
        metaDescription = ?,
        keywords = ?,
        readTime = ?,
        updatedAt = ?,
        publishedAt = CASE 
          WHEN ? = 'PUBLISHED' AND publishedAt IS NULL THEN ?
          ELSE publishedAt
        END
      WHERE slug = ?
    `;

    const args = [
      validatedData.title,
      validatedData.excerpt,
      validatedData.content,
      validatedData.featuredImage || null,
      processedBody.categoryId,
      validatedData.status,
      validatedData.featured ? 1 : 0,
      validatedData.metaTitle || null,
      validatedData.metaDescription || null,
      JSON.stringify(validatedData.keywords || []),
      Number(processedBody.readTime),
      now,
      validatedData.status,
      now,
      params.slug,
    ];

    const result = await turso.execute({ sql, args });
    
    if (result.rowsAffected === 0) {
      throw new Error('Post not found or no changes made');
    }

    console.log('✅ Turso update successful, rows affected:', result.rowsAffected);

    // Return the updated post
    const updatedPost = await getBlogPostBySlug(params.slug);
    
    if (!updatedPost) {
      throw new Error('Failed to retrieve updated post');
    }

    return NextResponse.json({
      ...updatedPost,
      status: updatedPost.status || validatedData.status
    });

  } catch (error) {
    console.error('❌ PUT /api/blog/[slug] error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'A post with this slug already exists', details: error.message },
          { status: 409 }
        );
      }
      
      if (error.message.includes('SQLITE_ERROR')) {
        return NextResponse.json(
          { error: 'Database error - check if categories and users exist', details: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete existing post by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('🗑️ DELETE /api/blog/[slug] - Deleting post:', params.slug);

    // Check if post exists first
    const existingPost = await getBlogPostBySlug(params.slug);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Get the post ID first
    const postResult = await turso.execute({
      sql: 'SELECT id FROM BlogPost WHERE slug = ?',
      args: [params.slug]
    });

    if (postResult.rows.length === 0) {
      throw new Error('Post not found');
    }

    const postId = String(postResult.rows[0].id);
    console.log('🔍 Deleting post with ID:', postId);

    // Delete the blog post from Turso
    const deleteResult = await turso.execute({
      sql: 'DELETE FROM BlogPost WHERE slug = ?',
      args: [params.slug]
    });

    if (deleteResult.rowsAffected === 0) {
      throw new Error('Post not found or already deleted');
    }

    console.log('✅ Turso delete successful, rows affected:', deleteResult.rowsAffected);

    return NextResponse.json(
      { message: 'Post deleted successfully', slug: params.slug },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ DELETE /api/blog/[slug] error:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}