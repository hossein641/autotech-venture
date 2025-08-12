import { z } from 'zod';
import { PostStatus } from '@prisma/client';

export const createPostSchema = z.object({
  title: z.string().min(1).max(500),
  excerpt: z.string().min(50).max(300),
  content: z.string().min(100),
  featuredImage: z.string().url().optional(),
  categoryId: z.string().cuid(),
  tagIds: z.array(z.string().cuid()).default([]),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  publishedAt: z.string().datetime().optional(),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().cuid(),
});

export const blogFiltersSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.nativeEnum(PostStatus).optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
  authorId: z.string().cuid().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.enum(['publishedAt', 'createdAt', 'title']).default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});