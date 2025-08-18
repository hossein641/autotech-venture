// components/blog/BlogFilters.tsx - Production version with API integration
'use client';

import { useState, useEffect } from 'react';
import { Filter, X, Search } from 'lucide-react';

interface Category {
  name: string;
  count: number;
  slug: string;
}

interface BlogFiltersProps {
  categories: Category[];
  selectedCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
  searchTerm?: string;
  onSearchChange?: (search: string) => void;
  className?: string;
}

export default function BlogFilters({ 
  categories = [],
  selectedCategory = null,
  onCategoryChange,
  searchTerm = '',
  onSearchChange,
  className = ''
}: BlogFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // ✅ Debounced search to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (onSearchChange && localSearch !== searchTerm) {
        onSearchChange(localSearch);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearch, onSearchChange, searchTerm]);

  // ✅ Update local search when external searchTerm changes
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      if (selectedCategory === categorySlug) {
        onCategoryChange(null); // Clear filter if same category clicked
      } else {
        onCategoryChange(categorySlug);
      }
    }
  };

  const clearAllFilters = () => {
    if (onCategoryChange) onCategoryChange(null);
    if (onSearchChange) onSearchChange('');
    setLocalSearch('');
  };

  const hasActiveFilters = selectedCategory || localSearch;

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Articles
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by title, content..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categories
        </label>
        
        {categories.length === 0 ? (
          <div className="text-gray-500 text-sm py-4 text-center">
            Loading categories...
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group ${
                  selectedCategory === category.slug
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Active filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {categories.find(cat => cat.slug === selectedCategory)?.name || selectedCategory}
                <button
                  onClick={() => onCategoryChange?.(null)}
                  className="ml-2 hover:text-indigo-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {localSearch && (
              <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                "{localSearch}"
                <button
                  onClick={() => {
                    setLocalSearch('');
                    onSearchChange?.('');
                  }}
                  className="ml-2 hover:text-gray-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}