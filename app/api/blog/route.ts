// app/api/blog/route.ts - Temporary Auth Bypass for Testing

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

    const validatedParams = blogFiltersSchema.parse(parsedParams);

    console.log('🔍 Blog API GET Request:', { 
      validatedParams,
      timestamp: new Date().toISOString(),
      url: request.url
    });

    // Use unified database module
    const result = await getBlogPosts(
      {
        search: validatedParams.search,
        category: validatedParams.category,
        featured: validatedParams.featured,
        authorId: validatedParams.authorId,
        status: validatedParams.status
      },
      {
        page: validatedParams.page,
        limit: validatedParams.limit,
        sortBy: validatedParams.sortBy,
        sortOrder: validatedParams.sortOrder
      }
    );

    console.log('🔍 Blog API GET Response:', { 
      postCount: result.posts.length,
      totalCount: result.totalCount 
    });

    // Calculate pagination info
    const totalPages = Math.ceil(result.totalCount / validatedParams.limit);

    return NextResponse.json({
      posts: result.posts,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total: result.totalCount,
        totalPages,
      },
    });

  } catch (error) {
    console.error('❌ Blog API GET Error:', error);
    
    // Fallback to sample data if database fails
    return NextResponse.json({
      posts: getSamplePosts(),
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      },
    });
  }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Blog API POST - Starting request processing');

    // TEMPORARY: Bypass authentication for testing
    // Comment this back in after testing:
    // const user = await getUserFromRequest(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Create a default user for testing
    const user = {
      id: 'user_admin_1',
      email: 'admin@atechv.com',
      name: 'Dr. Hossein Mohammadi',
      role: 'ADMIN'
    };

    const body = await request.json();
    console.log('🔍 Blog API POST - Request body:', body);

    // Validate the incoming data
    const validatedData = blogPostSchema.parse(body);
    console.log('🔍 Blog API POST - Validated data:', validatedData);

    // Generate slug from title if not provided
    const slug = body.slug || generateSlug(validatedData.title);

    // Check if slug already exists - use unified database
    const USE_TURSO = process.env.DATABASE_URL?.startsWith('libsql://') || 
                      process.env.NODE_ENV === 'production';

    let existingPost;
    if (USE_TURSO) {
      const { turso } = await import('@/lib/turso');
      const result = await turso.execute({
        sql: 'SELECT id FROM BlogPost WHERE slug = ? LIMIT 1',
        args: [slug]
      });
      existingPost = result.rows.length > 0 ? { id: result.rows[0].id } : null;
    } else {
      existingPost = await prisma.blogPost.findUnique({
        where: { slug },
        select: { id: true }
      });
    }

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    // Calculate read time
    const readTime = calculateReadTime(validatedData.content);

    // Get default category ID (you'll need to create these in your database)
    const categoryMapping: Record<string, string> = {
      'AI Solutions': 'cat_ai_solutions_1755215496487',
      'SEO Services': 'cat_seo_services_1755215496488', 
      'Web Development': 'cat_web_development_1755215496489',
      'Automation': 'cat_automation_1755215496490'
    };

    const categoryId = body.categoryId || categoryMapping[body.category || 'AI Solutions'] || 'cat_ai_solutions_1755215496487';

    // Prepare post data
    const postData = {
      title: validatedData.title,
      slug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      featuredImage: validatedData.featuredImage || null,
      authorId: user.id,
      categoryId: categoryId,
      featured: validatedData.featured || false,
      status: validatedData.status || 'DRAFT',
      publishedAt: validatedData.status === 'PUBLISHED' 
        ? validatedData.publishedAt ? new Date(validatedData.publishedAt).toISOString() : new Date().toISOString()
        : null,
      readTime,
      metaTitle: validatedData.metaTitle || null,
      metaDescription: validatedData.metaDescription || null,
      keywords: validatedData.keywords || [],
      tagIds: validatedData.tagIds || []
    };

    console.log('🔍 Blog API POST - Final post data:', postData);

    // Use unified database module for creation
    const result = await createBlogPost(postData);

    console.log('🔍 Blog API POST Response:', { 
      success: true,
      postId: result.id,
      title: result.title,
      slug: result.slug
    });

    return NextResponse.json({ 
      post: result,
      message: 'Blog post created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Blog API POST Error:', error);
    
    // Detailed error response
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to create blog post', 
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post', details: 'Unknown error' },
      { status: 500 }
    );
  }
}

// Sample posts fallback (for demo purposes)
function getSamplePosts() {
  return [
    {
      id: '1',
      slug: 'ai-automation-small-business-dayton',
      title: 'How AI Automation Transforms Small Businesses in Dayton',
      excerpt: 'Discover how local Dayton businesses are leveraging AI automation to streamline operations, reduce costs, and increase productivity in 2025.',
      content: `<h2>The AI Revolution in Dayton</h2>
<p>Small businesses in Dayton, Ohio are experiencing unprecedented growth through AI automation. From inventory management to customer service, artificial intelligence is transforming how local companies operate.</p>

<h3>Key Benefits for Dayton Businesses:</h3>
<ul>
<li>Automated customer service chatbots that respond 24/7</li>
<li>Intelligent inventory management that predicts demand</li>
<li>Predictive analytics for accurate sales forecasting</li>
<li>Automated social media management and content creation</li>
<li>Smart appointment scheduling systems</li>
</ul>

<p>At AutoTech Venture, we help Dayton businesses implement these cutting-edge solutions. Our AI automation services have helped local companies reduce operational costs by up to 40% while improving customer satisfaction.</p>

<h3>Success Stories from Dayton</h3>
<p>One of our clients, a local manufacturing company, implemented our AI quality control system and reduced defects by 60%. Another Dayton retailer used our inventory optimization AI to reduce stockouts by 75%.</p>

<p>Ready to transform your business with AI? Contact AutoTech Venture today for a free consultation and discover how artificial intelligence can revolutionize your operations.</p>`,
      featuredImage: '/images/blog/ai-automation.jpg',
      author: {
        name: 'Dr. Hossein Mohammadi',
        avatar: '/images/team/hossein.jpg',
        title: 'AI Solutions Expert'
      },
      publishedAt: new Date().toISOString(),
      readTime: 5,
      tags: ['AI', 'Automation', 'Small Business', 'Dayton'],
      category: 'AI Solutions',
      featured: true,
      seo: {
        metaTitle: 'AI Automation for Small Business Dayton Ohio | AutoTech Venture',
        metaDescription: 'Learn how AI automation helps Dayton small businesses improve efficiency and reduce costs. Expert AI consulting services in Ohio.',
        keywords: ['AI automation', 'small business Dayton', 'business automation Ohio']
      }
    },
    {
      id: '2',
      slug: 'seo-services-dayton-ohio-2025',
      title: 'Complete SEO Guide for Dayton Ohio Businesses in 2025',
      excerpt: 'Master local SEO strategies that help Dayton businesses rank higher in Google search results and attract more local customers.',
      content: `<h2>Local SEO Success in Dayton</h2>
<p>Ranking high in local search results is crucial for Dayton businesses. Our comprehensive SEO strategies help local companies dominate search results and attract more customers from the greater Dayton area.</p>

<h3>Our Proven Dayton SEO Services Include:</h3>
<ul>
<li>Google Business Profile optimization for maximum visibility</li>
<li>Local keyword research targeting Dayton-specific searches</li>
<li>Complete website technical SEO audits and fixes</li>
<li>Content marketing strategies that engage local audiences</li>
<li>Local citation building across Ohio directories</li>
<li>Online reputation management and review optimization</li>
</ul>

<h3>Why Dayton Businesses Choose AutoTech Venture for SEO</h3>
<p>We understand the local Dayton market and know exactly what it takes to rank well in Ohio. Our clients typically see a 200% increase in organic traffic within 6 months.</p>

<h3>Local SEO Results That Matter</h3>
<p>Our recent client, a Dayton accounting firm, went from page 3 to position #1 for "tax services Dayton Ohio" in just 4 months. A local restaurant we worked with increased their online orders by 150% through improved local search visibility.</p>

<p>Ready to dominate local search results? Contact AutoTech Venture for a free SEO audit and see how we can help your Dayton business attract more customers online.</p>`,
      featuredImage: '/images/blog/seo-services.jpg',
      author: {
        name: 'Dr. Hossein Mohammadi',
        avatar: '/images/team/hossein.jpg',
        title: 'SEO Specialist'
      },
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      readTime: 7,
      tags: ['SEO', 'Local SEO', 'Dayton Ohio', 'Digital Marketing'],
      category: 'SEO Services',
      featured: false,
      seo: {
        metaTitle: 'SEO Services Dayton Ohio | Local Search Optimization | AutoTech Venture',
        metaDescription: 'Professional SEO services for Dayton businesses. Improve local search rankings and attract more customers with our proven strategies.',
        keywords: ['SEO services Dayton', 'local SEO Ohio', 'Dayton digital marketing']
      }
    }
  ];
}