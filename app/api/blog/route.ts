// app/api/blog/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { blogFiltersSchema, blogPostSchema } from '@/lib/validation';
import { transformPostFromDB, keywordsToString, calculateReadTime, generateSlug } from '@/lib/types';
import { getBlogPosts, createBlogPost } from '@/lib/database';

// GET /api/blog - Fetch blog posts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // Convert string values to appropriate types
    const parsedParams = {
      ...queryParams,
      page: queryParams.page ? parseInt(queryParams.page) : 1,
      limit: queryParams.limit ? parseInt(queryParams.limit) : 10,
      featured: queryParams.featured ? queryParams.featured === 'true' : undefined,
    };

    console.log('🔍 API GET request with params:', parsedParams);

    // Validate parameters
    const validation = blogFiltersSchema.safeParse(parsedParams);
    if (!validation.success) {
      console.log('❌ Validation failed:', validation.error.format());
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validation.error.format() },
        { status: 400 }
      );
    }

    // Get posts from database with proper status filtering
    const { posts, total } = await getBlogPosts(validation.data);

    console.log(`✅ API returning ${posts.length} posts, total: ${total}`);
    
    // Debug: Log status of first post to verify it's included
    if (posts.length > 0) {
      console.log('🔍 First post status check:', {
        title: posts[0].title,
        status: posts[0].status,
        hasStatus: 'status' in posts[0]
      });
    }

    return NextResponse.json({
      posts: posts.map((post: any) => ({
        ...post,
        // EXPLICITLY ensure status is included
        status: post.status || 'DRAFT'
      })),
      pagination: {
        page: validation.data.page,
        limit: validation.data.limit,
        total,
        pages: Math.ceil(total / validation.data.limit)
      }
    });

  } catch (error) {
    console.error('❌ API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 POST /api/blog - Creating new blog post');
    
    // Parse request body
    const body = await request.json();
    console.log('📝 Request body received:', {
      title: body.title,
      status: body.status,
      featured: body.featured,
      hasContent: !!body.content
    });

    // Validate blog post data
    const validation = blogPostSchema.safeParse(body);
    if (!validation.success) {
      console.log('❌ Validation failed:', validation.error.format());
      return NextResponse.json(
        { error: 'Invalid blog post data', details: validation.error.format() },
        { status: 400 }
      );
    }

    const validatedData = validation.data;
    console.log('✅ Data validated successfully');

    // CRITICAL FIX: Ensure status is explicitly set
    const postData = {
      ...validatedData,
      status: validatedData.status || 'DRAFT', // Default to DRAFT if not specified
      featured: validatedData.featured || false,
      slug: validatedData.slug || generateSlug(validatedData.title), // Generate slug if not provided
      readTime: validatedData.readTime || calculateReadTime(validatedData.content) // Calculate if not provided
    };

    // Set publishedAt if status is PUBLISHED and publishedAt is not set
    if (postData.status === 'PUBLISHED' && !postData.publishedAt) {
      postData.publishedAt = new Date().toISOString();
      console.log(`📅 Set publishedAt: ${postData.publishedAt}`);
    }

    console.log('💾 Creating post with data:', {
      title: postData.title,
      status: postData.status,
      slug: postData.slug,
      featured: postData.featured
    });

    // Create blog post in database
    const newPost = await createBlogPost(postData);
    
    console.log('✅ Post created successfully:', {
      id: newPost.id,
      title: newPost.title,
      status: newPost.status,
      slug: newPost.slug
    });

    // Return the created post with explicit status
    return NextResponse.json({
      ...newPost,
      status: newPost.status || postData.status // Ensure status is always present
    }, { status: 201 });

  } catch (error) {
    console.error('❌ POST /api/blog error:', error);
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'A post with this slug already exists', details: error.message },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create blog post', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown error occurred while creating blog post' },
      { status: 500 }
    );
  }
}