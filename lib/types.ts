// lib/types.ts - Fixed for SQLite compatibility

import { BlogPost, User, Category, Tag, PostStatus } from '@prisma/client';

// Your existing BlogPostData interface (unchanged)
export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[]; // ✅ This stays as array for the API interface
  };
}

// Database post with relations (for SQLite - more flexible typing)
export type BlogPostWithRelations = BlogPost & {
  author: User;
  category: Category;
  tags: Array<{
    tag: Tag;
  }>;
};

// Flexible type for transform function (handles Prisma query results)
export type BlogPostQueryResult = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
  readTime: number;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string; // JSON string in SQLite
  author: {
    name: string;
    avatar: string | null;
    title: string | null;
  };
  category: {
    name: string;
  };
  tags: Array<{
    tag: {
      name: string;
    };
  }>;
};

// API request/response types - Updated for SQLite
export interface CreatePostRequest {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categoryId: string;
  tagIds: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[]; // ✅ API accepts array, converts to JSON string internally
  featured?: boolean;
  status?: PostStatus;
  publishedAt?: string;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface BlogPostFilters {
  category?: string;
  tag?: string;
  status?: PostStatus;
  featured?: boolean;
  search?: string;
  authorId?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: 'publishedAt' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Helper functions for SQLite keyword handling
export function keywordsToString(keywords: string[]): string {
  return JSON.stringify(keywords || []);
}

export function keywordsFromString(keywordsString: string): string[] {
  try {
    return keywordsString ? JSON.parse(keywordsString) : [];
  } catch (error) {
    console.warn('Failed to parse keywords:', keywordsString);
    return [];
  }
}

// Transform function for converting DB result to API format
export function transformPostFromDB(post: BlogPostQueryResult): BlogPostData {
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
      keywords: keywordsFromString(post.keywords), // ✅ Convert JSON string to array
    },
  };
}