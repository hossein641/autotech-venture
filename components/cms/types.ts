// components/cms/types.ts

// Core Blog Post Interface (matches your existing backend)
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    title?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Category Interface
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount?: number;
}

// Tag Interface
export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR';
  avatar?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface TagsResponse {
  tags: Tag[];
}

export interface UsersResponse {
  users: User[];
}

// Form Data Types
export interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  categoryId?: string;
  tags: string[];
  tagIds?: string[];
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  publishedAt?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  color?: string;
}

export interface TagFormData {
  name: string;
}

export interface UserFormData {
  email: string;
  name: string;
  password?: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR';
  title?: string;
  avatar?: string;
}

// Filter and Search Types
export interface PostFilters {
  search?: string;
  status?: string;
  category?: string;
  tag?: string;
  authorId?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'publishedAt' | 'createdAt' | 'title' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: any;
}

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}

// Authentication Types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Hook Return Types
export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<ApiResponse>;
  logout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

export interface UsePostsReturn {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: (filters?: PostFilters) => Promise<void>;
  createPost: (postData: Partial<BlogPost>) => Promise<ApiResponse>;
  updatePost: (id: string, postData: Partial<BlogPost>) => Promise<ApiResponse>;
  deletePost: (id: string) => Promise<ApiResponse>;
}

export interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (categoryData: CategoryFormData) => Promise<ApiResponse>;
  updateCategory: (id: string, categoryData: CategoryFormData) => Promise<ApiResponse>;
  deleteCategory: (id: string) => Promise<ApiResponse>;
}

export interface UseTagsReturn {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
  createTag: (tagData: TagFormData) => Promise<ApiResponse>;
  deleteTag: (id: string) => Promise<ApiResponse>;
}

// Component Props Types
export interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<ApiResponse>;
  isLoading?: boolean;
}

export interface SidebarProps {
  currentUser: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export interface DashboardProps {
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  onCreatePost: () => void;
  onViewChange: (view: string) => void;
}

export interface PostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

export interface PostEditorProps {
  post?: BlogPost | null;
  categories: Category[];
  tags: Tag[];
  onSave: (postData: Partial<BlogPost>) => Promise<ApiResponse>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CategoryTagManagerProps {
  categories: Category[];
  tags: Tag[];
  onCreateCategory: (data: CategoryFormData) => Promise<ApiResponse>;
  onUpdateCategory: (id: string, data: CategoryFormData) => Promise<ApiResponse>;
  onDeleteCategory: (id: string) => Promise<ApiResponse>;
  onCreateTag: (data: TagFormData) => Promise<ApiResponse>;
  onDeleteTag: (id: string) => Promise<ApiResponse>;
  isLoading?: boolean;
}

// Database Types (for backend compatibility)
export interface BlogPostQueryResult {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  readTime: number;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
  keywords: string; // JSON string in SQLite
  author: {
    name: string;
    avatar?: string;
    title?: string;
  };
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  tags: Array<{
    tag: {
      name: string;
      slug: string;
    };
  }>;
}

// Utility Types
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type UserRole = 'ADMIN' | 'EDITOR' | 'AUTHOR';
export type SortOrder = 'asc' | 'desc';
export type ViewType = 'dashboard' | 'posts' | 'categories' | 'users' | 'settings';

// Constants
export const POST_STATUSES: PostStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
export const USER_ROLES: UserRole[] = ['ADMIN', 'EDITOR', 'AUTHOR'];
export const SORT_ORDERS: SortOrder[] = ['asc', 'desc'];