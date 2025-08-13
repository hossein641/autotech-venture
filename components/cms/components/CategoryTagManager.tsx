// components/cms/components/CategoryTagManager.tsx
import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Category, Tag } from '../types';

interface CategoryTagManagerProps {
  categories: Category[];
  tags: Tag[];
  onCreateCategory: (data: {name: string, description?: string, color?: string}) => Promise<{success: boolean, error?: string}>;
  onUpdateCategory: (id: string, data: {name: string, description?: string, color?: string}) => Promise<{success: boolean, error?: string}>;
  onDeleteCategory: (id: string) => Promise<{success: boolean, error?: string}>;
  onCreateTag: (data: {name: string}) => Promise<{success: boolean, error?: string}>;
  onDeleteTag: (id: string) => Promise<{success: boolean, error?: string}>;
  isLoading?: boolean;
}

export const CategoryTagManager: React.FC<CategoryTagManagerProps> = ({
  categories,
  tags,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  onCreateTag,
  onDeleteTag,
  isLoading = false
}) => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#6366f1'
  });
  const [tagForm, setTagForm] = useState({ name: '' });

  const handleCategorySubmit = async () => {
    const result = editingCategory
      ? await onUpdateCategory(editingCategory.id, categoryForm)
      : await onCreateCategory(categoryForm);

    if (result.success) {
      setShowCategoryForm(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '', color: '#6366f1' });
    }
  };

  const handleTagSubmit = async () => {
    const result = await onCreateTag(tagForm);
    if (result.success) {
      setShowTagForm(false);
      setTagForm({ name: '' });
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || '',
      color: category.color || '#6366f1'
    });
    setShowCategoryForm(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', description: '', color: '#6366f1' });
                setShowCategoryForm(true);
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Category
            </button>
          </div>
        </div>

        <div className="p-6">
          {showCategoryForm && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium mb-3">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="color"
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCategorySubmit}
                    disabled={!categoryForm.name.trim()}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                  <button
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    {category.description && (
                      <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {category.postCount || 0} posts
                  </span>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete category "${category.name}"?`)) {
                        onDeleteCategory(category.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
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
            <button
              onClick={() => {
                setTagForm({ name: '' });
                setShowTagForm(true);
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add Tag
            </button>
          </div>
        </div>

        <div className="p-6">
          {showTagForm && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium mb-3">Add New Tag</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={tagForm.name}
                    onChange={(e) => setTagForm({ name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tag name"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleTagSubmit}
                    disabled={!tagForm.name.trim()}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowTagForm(false)}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h3 className="font-medium text-gray-900">{tag.name}</h3>
                  <p className="text-sm text-gray-500">{tag.slug}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {tag.postCount || 0} posts
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete tag "${tag.name}"?`)) {
                        onDeleteTag(tag.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
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
};