// lib/validation.ts - Complete validation schemas for CMS

import { z } from 'zod';

// Blog Post Validation Schema (for creating/updating posts)
export const blogPostSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(500, 'Title must be less than 500 characters'),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters').max(300, 'Excerpt must be less than 300 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  featuredImage: z.string().url('Featured image must be a valid URL').optional().or(z.literal('')),
  categoryId: z.string().cuid('Invalid category ID'),
  tagIds: z.array(z.string().cuid()).optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('DRAFT'),
  publishedAt: z.string().datetime().optional(),
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional(),
  keywords: z.array(z.string()).optional(),
});

// Create Post Schema (alias for blogPostSchema - used in API routes)
export const createPostSchema = blogPostSchema;

// Blog Filters Schema (for GET /api/blog query parameters)
export const blogFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  authorId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  sortBy: z.enum(['publishedAt', 'createdAt', 'title', 'updatedAt']).optional().default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Blog Search Schema (alternative name for compatibility)
export const blogSearchSchema = blogFiltersSchema;

// User Login Validation Schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Category Validation Schema
export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must be less than 100 characters'),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color').optional(),
});

// Tag Validation Schema
export const tagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters'),
});

// User Creation Schema
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'EDITOR', 'AUTHOR']).optional().default('AUTHOR'),
  title: z.string().max(100, 'Title must be less than 100 characters').optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
});

// Update User Schema (password optional for updates)
export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'AUTHOR']).optional(),
  title: z.string().max(100, 'Title must be less than 100 characters').optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
});

// Type exports for better TypeScript integration
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type BlogFiltersInput = z.infer<typeof blogFiltersSchema>;
export type BlogSearchInput = z.infer<typeof blogSearchSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TagInput = z.infer<typeof tagSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;