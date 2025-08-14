import { prisma } from '@/lib/prisma';
import { BlogPostFilters, PaginationParams } from '@/lib/types';
import { PostStatus } from '@prisma/client';

export class BlogService {
  static async getPublishedPosts(
    filters: BlogPostFilters = {},
    pagination: PaginationParams = {}
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = pagination;

    const where: any = {
      status: PostStatus.PUBLISHED,
      publishedAt: { not: null },
    };

    // Apply filters
    if (filters.category) {
      where.category = { slug: filters.category };
    }

// ✅ Correct property name
if (filters.tags && filters.tags.length > 0) {
  where.tags = { some: { tag: { name: { in: filters.tags } } } };
}

    if (filters.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search} },
      ];
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: true,
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getFeaturedPosts(limit = 3) {
    return prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        featured: true,
        publishedAt: { not: null },
      },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }

  static async getRelatedPosts(postId: string, categoryId: string, limit = 3) {
    return prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        categoryId,
        id: { not: postId },
        publishedAt: { not: null },
      },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }

  static async getPostBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
    });
  }

  static async searchPosts(query: string, limit = 10) {
    return prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        OR: [
          { title: { contains: query} },
          { excerpt: { contains: query} },
          { content: { contains: query} },
        ],
      },
      include: {
        author: true,
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }
}