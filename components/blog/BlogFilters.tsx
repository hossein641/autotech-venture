// components/blog/BlogFilters.tsx - Fixed for your exact use case
import { Filter, X } from 'lucide-react';

interface Category {
  name: string;
  count: number;
  slug: string;
}

interface BlogFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange
}: BlogFiltersProps) {

  const handleCategoryClick = (categorySlug: string) => {
    // Toggle category: if already selected, clear it; otherwise select it
    if (selectedCategory === categorySlug) {
      onCategoryChange('');  // ✅ Use empty string as you're doing
    } else {
      onCategoryChange(categorySlug);
    }
  };

  const clearFilters = () => {
    onCategoryChange('');  // ✅ Use empty string as you're doing
  };

  // ✅ Add null safety checks
  const safeCategories = categories || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Categories</h3>
        </div>
        
        {selectedCategory && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {safeCategories.length === 0 ? (
          <div className="text-gray-500 text-sm py-4">
            Loading categories...
          </div>
        ) : (
          safeCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                selectedCategory === category.slug
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.slug
                  ? 'bg-indigo-200 text-indigo-800'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Show active filter */}
      {selectedCategory && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Active filter:</span>
            <div className="mt-2">
              <span className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {safeCategories.find(cat => cat.slug === selectedCategory)?.name || selectedCategory}
                <button
                  onClick={clearFilters}
                  className="ml-2 hover:text-indigo-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}