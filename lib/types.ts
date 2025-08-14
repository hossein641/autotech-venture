// lib/types.ts - Fixed version with Prisma-compatible types

// Core Blog Post Interface (matches your existing frontend)
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
    keywords?: string[];
  };
}

// Prisma Database Query Result Type (handles null values from database)
export type BlogPostQueryResult = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;  // ✅ Changed to match Prisma output
  publishedAt: Date | null;       // ✅ Changed to match Prisma output
  updatedAt: Date | null;         // ✅ Changed to match Prisma output
  readTime: number;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle: string | null;       // ✅ Changed to match Prisma output
  metaDescription: string | null; // ✅ Changed to match Prisma output
  keywords: string; // JSON string in SQLite
  author: {
    name: string;
    avatar: string | null;        // ✅ Changed to match Prisma output
    title: string | null;         // ✅ Changed to match Prisma output
  };
  category: {
    name: string;
    slug: string;
    color?: string | null;        // ✅ Changed to match Prisma output
  };
  tags: Array<{
    tag: {
      name: string;
      slug: string;
    };
  }>;
}

// Helper functions for database compatibility
export function keywordsToString(keywords: string[]): string {
  return JSON.stringify(keywords);
}

export function keywordsFromString(keywordsString: string): string[] {
  try {
    return JSON.parse(keywordsString);
  } catch {
    return [];
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Transform database result to frontend format (handles null to undefined conversion)
export function transformPostFromDB(post: BlogPostQueryResult): BlogPostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage || '', // ✅ Convert null to empty string
    author: {
      name: post.author.name,
      avatar: post.author.avatar || '',       // ✅ Convert null to empty string
      title: post.author.title || '',         // ✅ Convert null to empty string
    },
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : '',
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    readTime: post.readTime,
    tags: post.tags.map(t => t.tag.name),
    category: post.category.name,
    featured: post.featured,
    seo: {
      metaTitle: post.metaTitle || undefined,         // ✅ Convert null to undefined
      metaDescription: post.metaDescription || undefined, // ✅ Convert null to undefined
      keywords: keywordsFromString(post.keywords),
    },
  };
}

// Add to lib/types.ts


export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;      // ✅ Add this
  sortOrder?: string;   // ✅ Add this
}

export interface BlogPostFilters {
  category?: string;
  featured?: boolean;
  status?: string;
  search?: string;
  tags?: string[];      // ✅ Keep as 'tags' (not 'tag')
}