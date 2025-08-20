// app/api/blog/route.ts - COMPLETE UPDATED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { blogFiltersSchema, blogPostSchema } from '@/lib/validation';
import { generateSlug, calculateReadTime } from '@/lib/types';
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
    console.log('🚀 REQUEST HEADERS:', Object.fromEntries(request.headers.entries()));

    
    // Parse request body
    const body = await request.json();
    console.log('📝 RAW REQUEST BODY:', body);
    console.log('📝 REQUEST BODY STRINGIFIED:', JSON.stringify(body, null, 2));
    console.log('📝 REQUEST BODY KEYS:', Object.keys(body));
    console.log('📝 REQUEST BODY TYPES:', Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value])
    ));
    console.log('📝 Request body received:', {
      title: body.title,
      status: body.status,
      category: body.category,
      categoryId: body.categoryId,
      authorId: body.authorId,
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

    // Category name to ID mapping (FIXED with correct IDs)
    const getCategoryId = (categoryName: string): string => {
      const categoryMap: Record<string, string> = {
        "AI Solutions": "cat_ai",
        "SEO Services": "cat_seo", 
        "Web Development": "cat_web",
        "Automation": "cat_auto"
      };
      
      return categoryMap[categoryName] || "cat_ai"; // Default to AI Solutions
    };

    // Process and fix the data before validation
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
      // FIX: Map category name to categoryId
      categoryId: body.categoryId || getCategoryId(body.category || "AI Solutions"),
      // FIX: Set default authorId (corrected to match database)
      authorId: body.authorId || "author_hossein_1755215496184",
      // Generate slug if not provided
      slug: body.slug || generateSlug(body.title),
      // Calculate readTime if not provided (with safety check)
      readTime: body.readTime || calculateReadTime(body.content || '')
    };

    console.log('🔧 Processed data:', {
      title: processedBody.title,
      categoryId: processedBody.categoryId,
      authorId: processedBody.authorId,
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
    console.log('✅ Data validated successfully');

    // Set publishedAt if status is PUBLISHED and publishedAt is not set
    if (validatedData.status === 'PUBLISHED' && !validatedData.publishedAt) {
      validatedData.publishedAt = new Date().toISOString();
      console.log(`📅 Set publishedAt: ${validatedData.publishedAt}`);
    }

    // Combine validated data with our processed fields
    const finalPostData = {
      ...validatedData,
      authorId: processedBody.authorId,
      categoryId: processedBody.categoryId,
      slug: processedBody.slug,
      readTime: processedBody.readTime
    };

    console.log('💾 Creating post with final data:', {
      title: finalPostData.title,
      status: finalPostData.status,
      slug: finalPostData.slug,
      featured: finalPostData.featured,
      categoryId: finalPostData.categoryId,
      authorId: finalPostData.authorId,
      readTime: finalPostData.readTime
    });

    // Create blog post in database
    const newPost = await createBlogPost(finalPostData);
    
    console.log('✅ Post created successfully:', {
      id: newPost.id,
      title: newPost.title,
      status: newPost.status,
      slug: newPost.slug
    });

    // Return the created post with explicit status
    return NextResponse.json({
      ...newPost,
      status: newPost.status || validatedData.status // Ensure status is always present
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
      
      if (error.message.includes('SQLITE_ERROR')) {
        return NextResponse.json(
          { error: 'Database error - check if categories and users exist', details: error.message },
          { status: 500 }
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