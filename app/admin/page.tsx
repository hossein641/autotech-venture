// app/admin/page.tsx - Updated to use Database API
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
  featuredImage?: string;
  category: string;
  categoryId?: string;
  tags: string[];
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle?: string;
  metaDescription?: string;
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
        metaTitle: postData.metaTitle,
        metaDescription: postData.metaDescription,
        keywords: postData.keywords,
        categoryId: postData.categoryId || 'cat_default', // You'll need to map category names to IDs
        tagIds: [], // You'll need to implement tag mapping
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

      const result = await response.json();
      
      console.log('🔍 API Response:', result);

      if (response.ok) {
        console.log('✅ Post created successfully');
        await loadPosts(); // Reload posts to see the new one
        alert(`Post "${postData.title}" created successfully!`);
      } else {
        console.error('❌ API Error:', result);
        alert(`Error creating post: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error creating post:', error);
      alert(`Error creating post: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Update existing post via API
  const updatePost = async (postId: string, postData: PostFormData): Promise<void> => {
    try {
      setLoading(true);
      console.log('🔍 Updating post via API:', { postId, postData });

      // For now, just reload posts since update API might not be implemented
      alert('Update functionality not yet implemented. Please create a new post instead.');
      
    } catch (error) {
      console.error('❌ Error updating post:', error);
      alert(`Error updating post: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (postId: string): Promise<void> => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        setLoading(true);
        console.log('🔍 Deleting post:', postId);
        
        // Remove from local state for now
        setPosts(posts.filter(p => p.id !== postId));
        alert('Post deleted (local only - implement API delete)');
        
      } catch (error) {
        console.error('❌ Error deleting post:', error);
        alert(`Error deleting post: ${error}`);
      } finally {
        setLoading(false);
      }
    }
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
      categoryId: 'cat_ai_solutions', // Default category ID
      tags: post?.tags || [],
      featured: post?.featured || false,
      status: post?.status || 'DRAFT',
      metaTitle: post?.seo?.metaTitle || '',
      metaDescription: post?.seo?.metaDescription || '',
      keywords: post?.seo?.keywords || [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validation
      if (!formData.title.trim()) {
        alert('Title is required');
        return;
      }
      if (!formData.excerpt.trim()) {
        alert('Excerpt is required');
        return;
      }
      if (!formData.content.trim()) {
        alert('Content is required');
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
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter post title..."
                  required
                />
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
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief description of the post..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your post content here..."
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    const categoryMap: Record<string, string> = {
                      'AI Solutions': 'cat_ai_solutions',
                      'SEO Services': 'cat_seo_services',
                      'Web Development': 'cat_web_development',
                      'Automation': 'cat_automation'
                    };
                    setFormData({ 
                      ...formData, 
                      category: e.target.value,
                      categoryId: categoryMap[e.target.value] || 'cat_ai_solutions'
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Automation">Automation</option>
                </select>
              </div>

              {/* Status */}
              <div>
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
                  Featured post
                </label>
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
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Post
              </button>
            </div>

            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading posts...</p>
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
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">/{post.slug}</div>
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
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Post"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingPost(post);
                              setShowPostEditor(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit Post"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Post"
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
            if (editingPost) {
              await updatePost(editingPost.id, postData);
            } else {
              await createPost(postData);
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