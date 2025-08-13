// components/cms/components/PostEditor.tsx
import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { BlogPost, Category, Tag } from '../types';

interface PostEditorProps {
  post?: BlogPost | null;
  categories: Category[];
  tags: Tag[];
  onSave: (postData: Partial<BlogPost>) => Promise<{success: boolean, error?: string}>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  categories,
  tags,
  onSave,
  onCancel,
  isLoading = false
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 50) {
      newErrors.excerpt = 'Excerpt must be at least 50 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 100) {
      newErrors.content = 'Content must be at least 100 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    const categoryId = categories.find(c => c.name === formData.category)?.id;
    
    const postData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      featuredImage: formData.featuredImage || undefined,
      categoryId,
      featured: formData.featured,
      status: formData.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      seo: {
        metaTitle: formData.metaTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
        keywords: formData.keywords.length > 0 ? formData.keywords : undefined
      },
      tags: formData.tags
    };

    const result = await onSave(postData);
    
    if (result.success) {
      onCancel(); // Close editor on success
    } else {
      setErrors({ submit: result.error || 'Failed to save post' });
    }

    setIsSaving(false);
  };

  const handleTagsChange = (value: string) => {
    const tagArray = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData({ ...formData, tags: tagArray });
  };

  const handleKeywordsChange = (value: string) => {
    const keywordArray = value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
    setFormData({ ...formData, keywords: keywordArray });
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter post title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.excerpt ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the post"
                />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Write your post content here..."
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="AI, Business, Automation"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
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
                <h3 className="text-sm font-medium text-gray-700 mb-3">SEO Settings</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Custom meta title"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500">{formData.metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Meta Description</label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Meta description for search engines"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters</p>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={formData.keywords.join(', ')}
                      onChange={(e) => handleKeywordsChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="SEO keywords, separated by commas"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    </div>
  );
};
