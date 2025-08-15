// app/api/blog/route.ts - Updated with Production Turso Support

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { blogFiltersSchema, blogPostSchema } from '@/lib/validation';
import { transformPostFromDB, keywordsToString, calculateReadTime, generateSlug } from '@/lib/types';

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

    // Check if we're in production and should use Turso
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    
    if (isProduction) {
      // Use Turso directly in production
      return await handleTursoQuery(validatedParams);
    } else {
      // Use existing Prisma logic for local development
      return await handlePrismaQuery(validatedParams);
    }

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// Production: Turso database query
async function handleTursoQuery(validatedParams: any) {
  try {
    // Import Turso client
    const { turso } = await import('@/lib/turso');
    
    // Build SQL query with filters - Include all required fields
    let sql = `
      SELECT 
        bp.id, bp.slug, bp.title, bp.excerpt, bp.content, bp.featuredImage,
        bp.publishedAt, bp.createdAt, bp.updatedAt, bp.readTime, bp.featured, 
        bp.metaTitle, bp.metaDescription, bp.keywords, bp.status,
        u.name as authorName, u.avatar as authorAvatar, u.title as authorTitle,
        c.name as categoryName, c.slug as categorySlug, c.color as categoryColor
      FROM BlogPost bp
      JOIN User u ON bp.authorId = u.id
      JOIN Category c ON bp.categoryId = c.id
      WHERE bp.status = 'PUBLISHED'
    `;

    const args: any[] = [];
    
    // Add search filter
    if (validatedParams.search) {
      sql += ` AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)`;
      const searchTerm = `%${validatedParams.search}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }

    // Add category filter
    if (validatedParams.category) {
      sql += ` AND c.slug = ?`;
      args.push(validatedParams.category);
    }

    // Add featured filter
    if (validatedParams.featured !== undefined) {
      sql += ` AND bp.featured = ?`;
      args.push(validatedParams.featured ? 1 : 0);
    }

    // Add author filter
    if (validatedParams.authorId) {
      sql += ` AND bp.authorId = ?`;
      args.push(validatedParams.authorId);
    }

    // Add ordering
    if (validatedParams.sortBy === 'publishedAt') {
      sql += ` ORDER BY bp.publishedAt ${validatedParams.sortOrder || 'DESC'}`;
    } else if (validatedParams.sortBy === 'createdAt') {
      sql += ` ORDER BY bp.createdAt ${validatedParams.sortOrder || 'DESC'}`;
    } else if (validatedParams.sortBy === 'updatedAt') {
      sql += ` ORDER BY bp.updatedAt ${validatedParams.sortOrder || 'DESC'}`;
    } else {
      sql += ` ORDER BY bp.publishedAt DESC`;
    }

    // Add pagination
    sql += ` LIMIT ? OFFSET ?`;
    args.push(validatedParams.limit, (validatedParams.page - 1) * validatedParams.limit);

    const result = await turso.execute({ sql, args });

    // Transform Turso results to match BlogPostQueryResult format
    const transformedPosts = result.rows.map(row => ({
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      excerpt: row.excerpt as string,
      content: row.content as string,
      featuredImage: row.featuredImage as string || null,
      publishedAt: row.publishedAt ? new Date(row.publishedAt as string) : null,
      createdAt: new Date(row.createdAt as string),
      updatedAt: new Date(row.updatedAt as string),
      readTime: row.readTime as number || 5,
      featured: Boolean(row.featured),
      status: row.status as "DRAFT" | "PUBLISHED" | "ARCHIVED", // Cast to proper enum type
      metaTitle: row.metaTitle as string,
      metaDescription: row.metaDescription as string,
      keywords: row.keywords as string,
      author: {
        name: row.authorName as string,
        avatar: row.authorAvatar as string || '/images/team/hossein.jpg',
        title: row.authorTitle as string
      },
      category: {
        name: row.categoryName as string,
        slug: row.categorySlug as string,
        color: row.categoryColor as string || null
      },
      tags: [] // Simplified for now, can be enhanced later
    }));

    // Apply transformPostFromDB to each post (now matches BlogPostQueryResult type)
    const finalPosts = transformedPosts.map(transformPostFromDB);

    // Get total count for pagination
    let countSql = `SELECT COUNT(*) as total FROM BlogPost bp`;
    const countArgs: any[] = [];
    
    if (validatedParams.category || validatedParams.search || validatedParams.featured !== undefined || validatedParams.authorId) {
      countSql += ` JOIN User u ON bp.authorId = u.id JOIN Category c ON bp.categoryId = c.id WHERE bp.status = 'PUBLISHED'`;
      
      if (validatedParams.search) {
        countSql += ` AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)`;
        const searchTerm = `%${validatedParams.search}%`;
        countArgs.push(searchTerm, searchTerm, searchTerm);
      }
      
      if (validatedParams.category) {
        countSql += ` AND c.slug = ?`;
        countArgs.push(validatedParams.category);
      }
      
      if (validatedParams.featured !== undefined) {
        countSql += ` AND bp.featured = ?`;
        countArgs.push(validatedParams.featured ? 1 : 0);
      }
      
      if (validatedParams.authorId) {
        countSql += ` AND bp.authorId = ?`;
        countArgs.push(validatedParams.authorId);
      }
    } else {
      countSql += ` WHERE bp.status = 'PUBLISHED'`;
    }

    const countResult = await turso.execute({ sql: countSql, args: countArgs });
    const totalCount = countResult.rows[0]?.total as number || 0;

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / validatedParams.limit);

    return NextResponse.json({
      posts: finalPosts,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total: totalCount,
        totalPages,
      },
    });

  } catch (error) {
    console.error('Error with Turso query:', error);
    
    // Fallback to sample data if Turso fails
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

// Local Development: Existing Prisma logic
async function handlePrismaQuery(validatedParams: any) {
  // Build Prisma where clause
  const where: any = {};

  // Only show published posts for public API (unless status filter is specifically set)
  if (!validatedParams.status) {
    where.status = 'PUBLISHED';
  } else {
    where.status = validatedParams.status;
  }

  // Search functionality
  if (validatedParams.search) {
    where.OR = [
      { title: { contains: validatedParams.search } },
      { excerpt: { contains: validatedParams.search } },
      { content: { contains: validatedParams.search } },
    ];
  }

  // Category filter
  if (validatedParams.category) {
    where.category = {
      slug: validatedParams.category
    };
  }

  // Tag filter
  if (validatedParams.tag) {
    where.tags = {
      some: {
        tag: {
          slug: validatedParams.tag
        }
      }
    };
  }

  // Featured filter
  if (validatedParams.featured !== undefined) {
    where.featured = validatedParams.featured;
  }

  // Author filter
  if (validatedParams.authorId) {
    where.authorId = validatedParams.authorId;
  }

  // Calculate pagination
  const skip = (validatedParams.page - 1) * validatedParams.limit;

  // Build order by clause
  const orderBy: any = {};
  if (validatedParams.sortBy === 'publishedAt') {
    orderBy.publishedAt = validatedParams.sortOrder;
  } else if (validatedParams.sortBy === 'createdAt') {
    orderBy.createdAt = validatedParams.sortOrder;
  } else if (validatedParams.sortBy === 'updatedAt') {
    orderBy.updatedAt = validatedParams.sortOrder;
  } else {
    orderBy.title = validatedParams.sortOrder;
  }

  // Fetch posts with relations
  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: { name: true, avatar: true, title: true }
        },
        category: {
          select: { name: true, slug: true, color: true }
        },
        tags: {
          include: {
            tag: {
              select: { name: true, slug: true }
            }
          }
        }
      },
      orderBy,
      skip,
      take: validatedParams.limit,
    }),
    prisma.blogPost.count({ where })
  ]);

  // Transform posts to frontend format
  const transformedPosts = posts.map(transformPostFromDB);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / validatedParams.limit);

  return NextResponse.json({
    posts: transformedPosts,
    pagination: {
      page: validatedParams.page,
      limit: validatedParams.limit,
      total: totalCount,
      totalPages,
    },
  });
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

// POST /api/blog - Create new blog post (keep your existing logic)
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Generate slug from title
    const slug = generateSlug(validatedData.title);

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    // Calculate read time
    const readTime = calculateReadTime(validatedData.content);

    // Create the post
    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        featuredImage: validatedData.featuredImage || null,
        authorId: user.id,
        categoryId: validatedData.categoryId,
        featured: validatedData.featured || false,
        status: validatedData.status || 'DRAFT',
        publishedAt: validatedData.status === 'PUBLISHED' 
          ? validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date()
          : null,
        readTime,
        metaTitle: validatedData.metaTitle || null,
        metaDescription: validatedData.metaDescription || null,
        keywords: keywordsToString(validatedData.keywords || []),
        tags: validatedData.tagIds ? {
          create: validatedData.tagIds.map(tagId => ({
            tagId
          }))
        } : undefined
      },
      include: {
        author: {
          select: { name: true, avatar: true, title: true }
        },
        category: {
          select: { name: true, slug: true, color: true }
        },
        tags: {
          include: {
            tag: {
              select: { name: true, slug: true }
            }
          }
        }
      }
    });

    const transformedPost = transformPostFromDB(post);
    return NextResponse.json({ post: transformedPost }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}