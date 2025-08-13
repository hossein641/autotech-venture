import React, { useState } from 'react';
import { Search, Edit, Eye, Trash2, Plus, Star } from 'lucide-react';
import { BlogPost } from '../types';

interface PostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  onEdit,
  onDelete,
  onCreateNew,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (postId: string, postTitle: string) => {
    if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      onDelete(postId);
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
              onClick={onCreateNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <Plus size={16} className="mr-2" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : (
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
                        onClick={() => onEdit(post)}
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
                        onClick={() => handleDelete(post.id, post.title)}
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
      )}
    </div>
  );
};
