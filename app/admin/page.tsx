'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Save,
  X,
  Calendar,
  Tag,
  FolderOpen,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Types based on your existing backend
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

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR';
  avatar?: string;
  title?: string;
}

// Mock data for demo - replace with your API calls
const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-transformation-guide',
    title: 'AI Transformation Guide for Small Businesses',
    excerpt: 'Comprehensive guide on implementing AI solutions in small business operations.',
    content: '<h2>Introduction</h2><p>AI transformation is revolutionizing how small businesses operate...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    author: { name: 'Dr. Hossein Mohammadi', title: 'CEO' },
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    tags: ['AI', 'Business', 'Automation'],
    category: 'AI Solutions',
    featured: true,
    status: 'PUBLISHED',
    seo: {
      metaTitle: 'AI Transformation Guide | AutoTech Venture',
      metaDescription: 'Learn how to implement AI solutions in your small business',
      keywords: ['AI', 'transformation', 'small business']
    }
  },
  {
    id: '2',
    slug: 'nextjs-app-router-migration',
    title: 'Migrating to Next.js App Router: Complete Guide',
    excerpt: 'Step-by-step guide for migrating from Pages Router to App Router in Next.js.',
    content: '<h2>Why App Router?</h2><p>The new App Router in Next.js 13+ provides...</p>',
    author: { name: 'Dr. Maziyar Pouyan', title: 'CTO' },
    publishedAt: '2024-01-10T14:30:00Z',
    readTime: 12,
    tags: ['Next.js', 'React', 'Development'],
    category: 'Web Development',
    featured: false,
    status: 'PUBLISHED',
    seo: {
      metaTitle: 'Next.js App Router Migration Guide',
      metaDescription: 'Complete guide for migrating to Next.js App Router',
      keywords: ['Next.js', 'App Router', 'migration']
    }
  },
  {
    id: '3',
    slug: 'business-process-automation',
    title: 'Automating Business Processes with n8n',
    excerpt: 'How to streamline your business workflows using n8n automation platform.',
    content: '<h2>Getting Started</h2><p>Business process automation can save...</p>',
    author: { name: 'Sarah Johnson', title: 'Editor' },
    readTime: 6,
    tags: ['Automation', 'Business', 'n8n'],
    category: 'Automation',
    featured: false,
    status: 'DRAFT',
    seo: {
      metaTitle: 'Business Process Automation with n8n',
      metaDescription: 'Streamline your workflows with n8n automation',
      keywords: ['automation', 'business process', 'n8n']
    }
  }
];

const mockCategories: Category[] = [
  { id: '1', name: 'AI Solutions', slug: 'ai-solutions', color: '#3B82F6' },
  { id: '2', name: 'Automation', slug: 'automation', color: '#10B981' },
  { id: '3', name: 'Web Development', slug: 'web-development', color: '#8B5CF6' },
  { id: '4', name: 'Digital Strategy', slug: 'digital-strategy', color: '#F59E0B' }
];

const mockTags: Tag[] = [
  { id: '1', name: 'AI', slug: 'ai' },
  { id: '2', name: 'Machine Learning', slug: 'machine-learning' },
  { id: '3', name: 'Business', slug: 'business' },
  { id: '4', name: 'Automation', slug: 'automation' },
  { id: '5', name: 'Next.js', slug: 'nextjs' },
  { id: '6', name: 'React', slug: 'react' },
  { id: '7', name: 'Ohio', slug: 'ohio' }
];

const AutoTechCMS = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [isLoading, setIsLoading] = useState(false);
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Auth state management
  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    const user = localStorage.getItem('cms_user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  // Login Component
  const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async () => {
      setIsLoading(true);
      setError('');

      try {
        // Replace with your actual API call
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('cms_token', data.token);
          localStorage.setItem('cms_user', JSON.stringify(data.user));
          setCurrentUser(data.user);
          setIsLoggedIn(true);
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      }
      setIsLoading(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">AutoTech CMS</h1>
            <p className="text-gray-600">Sign in to manage your blog</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@atechv.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin123"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@atechv.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    );
  };

  // Post Editor Component
  const PostEditor = ({ post, onSave, onCancel }: { 
    post?: BlogPost | null; 
    onSave: (post: Partial<BlogPost>) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      featuredImage: post?.featuredImage || '',
      category: post?.category || '',
      tags: post?.tags || [],
      featured: post?.featured || false,
      status: post?.status || 'DRAFT',
      metaTitle: post?.seo?.metaTitle || '',
      metaDescription: post?.seo?.metaDescription || '',
      keywords: post?.seo?.keywords || []
    });

    const handleSave = () => {
      onSave({
        ...formData,
        seo: {
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords
        }
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your post content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(', ').filter(t => t.trim()) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AI, Business, Automation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Post</label>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">SEO Settings</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Custom meta title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Meta Description</label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Meta description for search engines"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Keywords</label>
                      <input
                        type="text"
                        value={formData.keywords.join(', ')}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(', ').filter(k => k.trim()) })}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SEO keywords, separated by commas"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Stats
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Posts</p>
            <p className="text-2xl font-semibold text-gray-900">{posts.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-2xl font-semibold text-gray-900">
              {posts.filter(p => p.status === 'PUBLISHED').length}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Drafts</p>
            <p className="text-2xl font-semibold text-gray-900">
              {posts.filter(p => p.status === 'DRAFT').length}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <FolderOpen className="text-purple-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );

  // Post List Component
  const PostsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredPosts = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const handleEdit = (post: BlogPost) => {
      setEditingPost(post);
      setShowPostEditor(true);
    };

    const handleDelete = (postId: string) => {
      if (confirm('Are you sure you want to delete this post?')) {
        setPosts(posts.filter(p => p.id !== postId));
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setShowPostEditor(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center whitespace-nowrap"
              >
                <Plus size={16} className="mr-2" />
                New Post
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                          {post.featured && <Star className="ml-2 text-yellow-500" size={14} fill="currentColor" />}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{post.excerpt.substring(0, 80)}...</p>
                        <div className="flex items-center mt-1 text-xs text-gray-400">
                          <span>By {post.author.name}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{post.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {post.status === 'PUBLISHED' && (
                        <button
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          className="text-green-600 hover:text-green-800"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Categories & Tags Management
  const CategoriesTagsManagement = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm">
              Add Category
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {posts.filter(p => p.category === category.name).length} posts
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={14} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm">
              Add Tag
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h3 className="font-medium text-gray-900">{tag.name}</h3>
                  <p className="text-sm text-gray-500">{tag.slug}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {posts.filter(p => p.tags.includes(tag.name)).length} posts
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={14} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Main Layout
  const MainLayout = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">AutoTech CMS</h1>
          <p className="text-sm text-gray-600">Welcome, {currentUser?.name}</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-3">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'posts', label: 'Posts', icon: Edit },
              { id: 'categories', label: 'Categories & Tags', icon: Tag },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-3 py-2 text-left rounded-md mb-1 transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => {
              localStorage.removeItem('cms_token');
              localStorage.removeItem('cms_user');
              setIsLoggedIn(false);
              setCurrentUser(null);
            }}
            className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Manage your blog content and settings</p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{post.title}</h3>
                        <p className="text-xs text-gray-500">{post.author.name} • {post.status}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        post.status === 'PUBLISHED' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setShowPostEditor(true);
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Plus size={18} className="mr-2" />
                    Create New Post
                  </button>
                  <button
                    onClick={() => setCurrentView('categories')}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 flex items-center justify-center"
                  >
                    <Tag size={18} className="mr-2" />
                    Manage Categories
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'posts' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
            <PostsList />
          </>
        )}

        {currentView === 'categories' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Categories & Tags</h1>
              <p className="text-gray-600">Organize your content</p>
            </div>
            <CategoriesTagsManagement />
          </>
        )}

        {currentView === 'users' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              <p className="text-gray-600">Manage user accounts and permissions</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">User management features coming soon...</p>
            </div>
          </>
        )}

        {currentView === 'settings' && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your blog settings</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </>
        )}
      </div>

      {/* Post Editor Modal */}
      {showPostEditor && (
        <PostEditor
          post={editingPost}
          onSave={(postData) => {
            if (editingPost) {
              // Update existing post
              setPosts(posts.map(p => p.id === editingPost.id ? { ...editingPost, ...postData } : p));
            } else {
              // Create new post
              const newPost: BlogPost = {
                id: String(Date.now()),
                slug: postData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '',
                ...postData,
                author: currentUser ? { name: currentUser.name, title: currentUser.title } : { name: 'Unknown' },
                publishedAt: postData.status === 'PUBLISHED' ? new Date().toISOString() : undefined,
                updatedAt: new Date().toISOString(),
                readTime: Math.ceil((postData.content?.split(' ').length || 0) / 200)
              } as BlogPost;
              setPosts([newPost, ...posts]);
            }
            setShowPostEditor(false);
            setEditingPost(null);
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