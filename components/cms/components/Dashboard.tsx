// components/cms/components/Dashboard.tsx
import React from 'react';
import { BarChart3, CheckCircle, AlertCircle, FolderOpen, Plus, Tag } from 'lucide-react';
import { BlogPost, Category } from '../types';

interface DashboardProps {
  posts: BlogPost[];
  categories: Category[];
  onCreatePost: () => void;
  onViewChange: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  posts, 
  categories, 
  onCreatePost, 
  onViewChange 
}) => {
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'PUBLISHED').length,
    drafts: posts.filter(p => p.status === 'DRAFT').length,
    categories: categories.length
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your blog content and settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.published}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.drafts}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FolderOpen className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Posts */}
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
              onClick={onCreatePost}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              Create New Post
            </button>
            <button
              onClick={() => onViewChange('categories')}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 flex items-center justify-center"
            >
              <Tag size={18} className="mr-2" />
              Manage Categories
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
