// app/api/blog/route.ts - Fixed version with proper imports

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

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post
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