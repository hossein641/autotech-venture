// app/api/blog/route.ts - Fixed for SQLite compatibility

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BlogPostData, BlogPostQueryResult } from '@/lib/types';
import { createPostSchema, blogFiltersSchema } from '@/lib/validation';
import { requireAuth } from '@/lib/auth';

// Updated transform function for SQLite
function transformPost(post: BlogPostQueryResult): BlogPostData {
  // Parse keywords from JSON string (SQLite adaptation)
  let parsedKeywords: string[] = [];
  try {
    parsedKeywords = post.keywords ? JSON.parse(post.keywords) : [];
  } catch (error) {
    parsedKeywords = [];
  }

  return {
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
      keywords: parsedKeywords, // ✅ Fixed: use parsedKeywords array
    },
  };
}

// GET /api/blog - Fetch blog posts with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = blogFiltersSchema.parse(Object.fromEntries(searchParams));

    const where: any = {};
    
    // Apply filters
    if (filters.status) {
      where.status = filters.status;
    } else {
      where.status = 'PUBLISHED'; // Default to published posts
    }

    if (filters.category) {
      where.category = { slug: filters.category };
    }

    if (filters.tag) {
      where.tags = {
        some: {
          tag: { slug: filters.tag }
        }
      };
    }

    if (filters.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters.authorId) {
      where.authorId = filters.authorId;
    }

    if (filters.search) {
      // SQLite-compatible search - remove mode: 'insensitive' and use LIKE
      const searchTerm = `%${filters.search}%`;
      where.OR = [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search } },
        { content: { contains: filters.search } },
      ];
    }

    // Calculate pagination
    const skip = (filters.page - 1) * filters.limit;

    // Fetch posts with relations - FIXED: Include all required relations
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: true,     // ✅ Include author relation
          category: true,   // ✅ Include category relation
          tags: {           // ✅ Include tags relation
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
        skip,
        take: filters.limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Transform posts to API format
    const transformedPosts = posts.map(post => transformPost(post as BlogPostQueryResult));

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
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
    // Check authentication
    const user = await requireAuth(['ADMIN', 'EDITOR', 'AUTHOR'])(request);
    if (user instanceof Response) return user;

    const body = await request.json();
    const data = createPostSchema.parse(body);

    // Generate slug from title if not provided
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check slug uniqueness
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 400 }
      );
    }

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = data.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Convert keywords array to JSON string for SQLite
    const keywordsJson = JSON.stringify(data.keywords || []);

    // Create post
    const createdPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: keywordsJson, // ✅ Store as JSON string for SQLite
        featured: data.featured,
        status: data.status,
        readTime,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        authorId: user.id,
        categoryId: data.categoryId,
        tags: {
          create: data.tagIds.map(tagId => ({
            tagId,
          })),
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

    return NextResponse.json(transformPost(createdPost as BlogPostQueryResult), { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}