// app/admin/page.tsx - Complete Updated Version with Working Edit/Delete
'use client';

import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';

// Types
interface BlogPost {
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

interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  categoryId: string;
  tags: string[];
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  role: string;
}

// Main Admin Component
const AutoTechCMS: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'posts' | 'categories' | 'users' | 'settings'>('dashboard');
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Login form
  const LoginForm = () => {
    const [email, setEmail] = useState('admin@atechv.com');
    const [password, setPassword] = useState('admin123');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      // Simple authentication for demo
      if (email === 'admin@atechv.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'Dr. Hossein Mohammadi',
          email: 'admin@atechv.com',
          title: 'AI Solutions Expert & CEO',
          role: 'ADMIN'
        };
        setCurrentUser(user);
        setIsLoggedIn(true);
        loadPosts(); // Load posts after login
      } else {
        alert('Invalid credentials');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              AutoTech Venture CMS
            </h2>
            <p className="mt-2 text-center text-gray-600">Sign in to manage your blog</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Load posts from API
  const loadPosts = async () => {
    try {
      setLoading(true);
      console.log('🔍 Loading posts from API...');
      
      const response = await fetch('/api/blog?limit=100');
      const data = await response.json();
      
      console.log('🔍 API Response:', data);
      
      if (data.posts) {
        setPosts(data.posts);
        console.log(`✅ Loaded ${data.posts.length} posts`);
      } else {
        console.error('❌ No posts in API response');
        setPosts([]);
      }
    } catch (error) {
      console.error('❌ Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new post via API
  const createPost = async (postData: PostFormData): Promise<void> => {
    try {
      setLoading(true);
      console.log('🔍 Creating post via API:', postData);

      // Enhanced validation
      if (!postData.title?.trim()) {
        alert('Title is required');
        return;
      }
      if (!postData.excerpt?.trim() || postData.excerpt.length < 50) {
        alert('Excerpt is required and must be at least 50 characters');
        return;
      }
      if (!postData.content?.trim() || postData.content.length < 100) {
        alert('Content is required and must be at least 100 characters');
        return;
      }

      // Generate slug from title
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const requestData = {
        title: postData.title,
        slug: slug,
        excerpt: postData.excerpt,
        content: postData.content,
        featuredImage: postData.featuredImage || null,
        featured: postData.featured,
        status: postData.status,
        metaTitle: postData.metaTitle || null,
        metaDescription: postData.metaDescription || null,
        keywords: postData.keywords || [],
        category: postData.category,
        categoryId: postData.categoryId,
        tags: postData.tags || [],
        tagIds: [], // You'll need to implement tag mapping later
        publishedAt: postData.status === 'PUBLISHED' ? new Date().toISOString() : null
      };

      console.log('🔍 Sending to API:', requestData);

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('🔍 Response status:', response.status);

      const result = await response.json();
      console.log('🔍 API Response:', result);

      if (response.ok) {
        console.log('✅ Post created successfully');
        await loadPosts(); // Reload posts to see the new one
        alert(`✅ Post "${postData.title}" created successfully!`);
      } else {
        console.error('❌ API Error:', result);
        
        // Show detailed error information
        const errorMessage = result.error || 'Unknown error';
        const errorDetails = result.details || '';
        const fullError = errorDetails ? `${errorMessage}\n\nDetails: ${errorDetails}` : errorMessage;
        
        alert(`❌ Error creating post:\n${fullError}`);
      }
    } catch (error) {
      console.error('❌ Network/Parse Error:', error);
      alert(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE POST FUNCTION - FIXED VALIDATION ISSUES
  const updatePost = async (postId: string, postData: PostFormData): Promise<void> => {
    try {
      setLoading(true);
      console.log('🔧 Updating post via API:', { postId, postData });

      // Enhanced validation with proper length checks
      if (!postData.title?.trim() || postData.title.length < 10) {
        alert('Title is required and must be at least 10 characters');
        return;
      }
      if (postData.title.length > 500) {
        alert('Title must be less than 500 characters');
        return;
      }
      if (!postData.excerpt?.trim() || postData.excerpt.length < 50) {
        alert('Excerpt is required and must be at least 50 characters');
        return;
      }
      if (postData.excerpt.length > 300) {
        alert('Excerpt must be less than 300 characters');
        return;
      }
      if (!postData.content?.trim() || postData.content.length < 100) {
        alert('Content is required and must be at least 100 characters');
        return;
      }

      // Find the post to get its slug
      const existingPost = posts.find(p => p.id === postId);
      if (!existingPost) {
        alert('Post not found in current list');
        return;
      }

      // Category name to ID mapping (correct production IDs)
      const getCategoryId = (categoryName: string): string => {
        const categoryMap: Record<string, string> = {
          'AI Solutions': 'cat_ai',
          'SEO Services': 'cat_seo',
          'Web Development': 'cat_web',
          'Automation': 'cat_auto'
        };
        return categoryMap[categoryName] || 'cat_ai';
      };

      // Calculate read time (1 word per 200ms = ~300 words per minute)
      const calculateReadTime = (content: string): number => {
        const words = content.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 300));
      };

      // Format data exactly as API expects for UPDATE
      const requestData = {
        title: postData.title.trim(),
        excerpt: postData.excerpt.trim(),
        content: postData.content.trim(),
        featuredImage: postData.featuredImage?.trim() || '',
        categoryId: getCategoryId(postData.category),
        authorId: 'author_hossein_1755215496184', // Fixed author ID
        featured: Boolean(postData.featured),
        status: postData.status || 'DRAFT',
        metaTitle: postData.metaTitle?.trim() || '',
        metaDescription: postData.metaDescription?.trim() || '',
        keywords: Array.isArray(postData.keywords) ? postData.keywords.filter(k => k.trim()) : [],
        readTime: calculateReadTime(postData.content),
        // Don't send slug in update - let API handle it
        publishedAt: postData.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED' 
          ? new Date().toISOString() 
          : undefined
      };

      console.log('🔍 Sending PUT request to:', `/api/blog/${existingPost.slug}`);
      console.log('🔍 Update data (formatted):', requestData);

      const response = await fetch(`/api/blog/${existingPost.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('🔍 PUT Response status:', response.status);

      const result = await response.json();
      console.log('🔍 PUT API Response:', result);

      if (response.ok) {
        console.log('✅ Post updated successfully');
        await loadPosts(); // Reload posts to see the changes
        alert(`✅ Post "${postData.title}" updated successfully!`);
      } else {
        console.error('❌ Update API Error:', result);
        
        const errorMessage = result.error || 'Unknown error';
        let errorDetails = '';
        
        if (result.details && typeof result.details === 'object') {
          errorDetails = JSON.stringify(result.details, null, 2);
        } else if (result.details) {
          errorDetails = result.details;
        }
        
        const fullError = errorDetails ? `${errorMessage}\n\nValidation Details:\n${errorDetails}` : errorMessage;
        alert(`❌ Update failed:\n${fullError}`);
      }

    } catch (error) {
      console.error('❌ Update error:', error);
      alert(`❌ Update error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // DELETE POST FUNCTION - NOW CONNECTS TO WORKING DELETE API
  const deletePost = async (postId: string): Promise<void> => {
    try {
      console.log('🗑️ Deleting post via API:', postId);

      // Find the post to get its slug and title
      const existingPost = posts.find(p => p.id === postId);
      if (!existingPost) {
        alert('Post not found in current list');
        return;
      }

      // Confirm deletion
      const confirmed = confirm(`Are you sure you want to delete "${existingPost.title}"?\n\nThis action cannot be undone.`);
      if (!confirmed) {
        console.log('🚫 Delete cancelled by user');
        return;
      }

      setLoading(true);

      console.log('🔍 Sending DELETE request to:', `/api/blog/${existingPost.slug}`);

      const response = await fetch(`/api/blog/${existingPost.slug}`, {
        method: 'DELETE',
      });

      console.log('🔍 DELETE Response status:', response.status);

      const result = await response.json();
      console.log('🔍 DELETE API Response:', result);

      if (response.ok) {
        console.log('✅ Post deleted successfully');
        await loadPosts(); // Reload posts to see the changes
        alert(`✅ Post "${existingPost.title}" deleted successfully!`);
      } else {
        console.error('❌ Delete API Error:', result);
        const errorMessage = result.error || 'Unknown error';
        alert(`❌ Delete failed: ${errorMessage}`);
      }

    } catch (error) {
      console.error('❌ Delete error:', error);
      alert(`❌ Delete error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Button Click
  const handleEdit = (post: BlogPost) => {
    console.log('✏️ Handle edit for post:', post.title);
    setEditingPost(post);
    setShowPostEditor(true);
  };

  // Handle Delete Button Click
  const handleDelete = async (post: BlogPost) => {
    console.log('🗑️ Handle delete for post:', post.title);
    await deletePost(post.id);
  };

  // Post Editor Component
  const PostEditor: React.FC<{
    post?: BlogPost | null;
    onSave: (postData: PostFormData) => Promise<void>;
    onCancel: () => void;
  }> = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState<PostFormData>({
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      featuredImage: post?.featuredImage || '',
      category: post?.category || 'AI Solutions',
      categoryId: 'cat_ai', // Updated to use correct production IDs
      tags: post?.tags || [],
      featured: post?.featured || false,
      status: post?.status || 'DRAFT',
      metaTitle: post?.seo?.metaTitle || '',
      metaDescription: post?.seo?.metaDescription || '',
      keywords: post?.seo?.keywords || [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Enhanced validation matching API requirements
      if (!formData.title.trim() || formData.title.length < 10) {
        alert('Title is required and must be at least 10 characters');
        return;
      }
      if (formData.title.length > 500) {
        alert('Title must be less than 500 characters');
        return;
      }
      if (!formData.excerpt.trim() || formData.excerpt.length < 50) {
        alert('Excerpt is required and must be at least 50 characters');
        return;
      }
      if (formData.excerpt.length > 300) {
        alert('Excerpt must be less than 300 characters');
        return;
      }
      if (!formData.content.trim() || formData.content.length < 100) {
        alert('Content is required and must be at least 100 characters');
        return;
      }
      if (formData.metaTitle && formData.metaTitle.length > 60) {
        alert('Meta title must be less than 60 characters');
        return;
      }
      if (formData.metaDescription && formData.metaDescription.length > 160) {
        alert('Meta description must be less than 160 characters');
        return;
      }

      console.log('🔍 Submitting form data:', formData);
      await onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title * (10-500 characters)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter post title..."
                  required
                  minLength={10}
                  maxLength={500}
                />
                <p className={`mt-1 text-sm ${
                  formData.title.length < 10 
                    ? 'text-red-500' 
                    : formData.title.length > 500 
                    ? 'text-red-500' 
                    : 'text-green-600'
                }`}>
                  {formData.title.length}/500 characters (minimum 10)
                </p>
              </div>

              {/* Slug (auto-generated, read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (auto-generated)
                </label>
                <input
                  type="text"
                  value={formData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt * (50-300 characters)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief description of the post..."
                  required
                  minLength={50}
                  maxLength={300}
                />
                <p className={`mt-1 text-sm ${
                  formData.excerpt.length < 50 
                    ? 'text-red-500' 
                    : formData.excerpt.length > 300 
                    ? 'text-red-500' 
                    : 'text-green-600'
                }`}>
                  {formData.excerpt.length}/300 characters (minimum 50)
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content * (minimum 100 characters)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your post content here..."
                  required
                  minLength={100}
                />
                <p className={`mt-1 text-sm ${
                  formData.content.length < 100 
                    ? 'text-red-500' 
                    : 'text-green-600'
                }`}>
                  {formData.content.length} characters (minimum 100)
                </p>
              </div>

              {/* Featured Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Optional: URL to the featured image for this post
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    // Updated to use correct production category IDs
                    const categoryMap: Record<string, string> = {
                      'AI Solutions': 'cat_ai',
                      'SEO Services': 'cat_seo',
                      'Web Development': 'cat_web',
                      'Automation': 'cat_auto'
                    };
                    setFormData({ 
                      ...formData, 
                      category: e.target.value,
                      categoryId: categoryMap[e.target.value] || 'cat_ai'
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Automation">Automation</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Category ID: {formData.categoryId}
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    setFormData({ ...formData, tags });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="AI, automation, business, Dayton"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter tags separated by commas
                </p>
              </div>

              {/* SEO Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                
                {/* Meta Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="SEO-optimized title for search engines"
                    maxLength={60}
                  />
                  <p className={`mt-1 text-sm ${
                    formData.metaTitle.length > 60 
                      ? 'text-red-500' 
                      : formData.metaTitle.length > 50 
                      ? 'text-yellow-600' 
                      : 'text-gray-500'
                  }`}>
                    {formData.metaTitle.length}/60 characters
                  </p>
                </div>

                {/* Meta Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Brief description for search engine results"
                    maxLength={160}
                  />
                  <p className={`mt-1 text-sm ${
                    formData.metaDescription.length > 160 
                      ? 'text-red-500' 
                      : formData.metaDescription.length > 140 
                      ? 'text-yellow-600' 
                      : 'text-gray-500'
                  }`}>
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords.join(', ')}
                    onChange={(e) => {
                      const keywords = e.target.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
                      setFormData({ ...formData, keywords });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="AI automation, small business, Dayton Ohio"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Keywords for SEO optimization
                  </p>
                </div>
              </div>

              {/* Status and Featured Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Options</h3>
                
                {/* Status */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured post (appears prominently on homepage)
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Load posts on login
  useEffect(() => {
    if (isLoggedIn) {
      loadPosts();
    }
  }, [isLoggedIn]);

  // Main Layout
  const MainLayout = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">AutoTech Venture CMS</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser?.name}</span>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser(null);
                  setPosts([]);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="flex space-x-8 mb-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'dashboard'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('posts')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'posts'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Posts ({posts.length})
          </button>
        </nav>

        {/* Content */}
        {currentView === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Manage your AutoTech Venture blog content</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900">Total Posts</h3>
                <p className="text-3xl font-bold text-indigo-600">{posts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900">Published</h3>
                <p className="text-3xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'PUBLISHED').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900">Drafts</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {posts.filter(p => p.status === 'DRAFT').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <button
                onClick={() => setShowPostEditor(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-4"
                disabled={loading}
              >
                Create New Post
              </button>
              <button
                onClick={loadPosts}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh Posts'}
              </button>
            </div>
          </>
        )}

        {currentView === 'posts' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                <p className="text-gray-600">Manage your blog posts</p>
              </div>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setShowPostEditor(true);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                disabled={loading}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Post
              </button>
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-3"></div>
                  <p className="text-gray-600">Loading posts...</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">/{post.slug}</div>
                        {post.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'PUBLISHED' 
                            ? 'bg-green-100 text-green-800'
                            : post.status === 'DRAFT'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          {/* View Button */}
                          <button
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="text-indigo-600 hover:text-indigo-800 p-2 rounded hover:bg-indigo-50 transition-colors"
                            title="View Post"
                            disabled={loading}
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-green-600 hover:text-green-800 p-2 rounded hover:bg-green-50 transition-colors"
                            title="Edit Post"
                            disabled={loading}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(post)}
                            className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                            title="Delete Post"
                            disabled={loading}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {posts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts found. Create your first post!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Post Editor Modal */}
      {showPostEditor && (
        <PostEditor
          post={editingPost}
          onSave={async (postData) => {
            try {
              if (editingPost) {
                // Update existing post
                console.log('📝 Updating existing post:', editingPost.id);
                await updatePost(editingPost.id, postData);
              } else {
                // Create new post
                console.log('🆕 Creating new post');
                await createPost(postData);
              }
              
              // Close the editor on success
              setShowPostEditor(false);
              setEditingPost(null);
            } catch (error) {
              console.error('❌ Error in PostEditor onSave:', error);
              // Error is already handled in updatePost/createPost functions
            }
          }}
          onCancel={() => {
            setShowPostEditor(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );

  // Main Render
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return <MainLayout />;
};

export default AutoTechCMS;