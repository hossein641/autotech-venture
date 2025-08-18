// app/blog/page.tsx - Updated to use API data
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import FeaturedPost from '@/components/blog/FeaturedPost';
import { BlogPostData } from '@/components/blog/BlogCard';
import { BookOpen, TrendingUp, Users, Calendar, Search, ArrowRight, Loader2 } from 'lucide-react';

interface BlogResponse {
  posts: BlogPostData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface Category {
  name: string;
  count: number;
  slug: string;
}

export default function BlogPage() {
  // Set page title and metadata
  useEffect(() => {
    document.title = 'AI & Automation Blog | AutoTech Venture | Expert Insights Dayton Ohio';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') || 
                           document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 
      'Expert insights on AI, automation, web development, and digital transformation from AutoTech Venture\'s PhD team.'
    );
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, []);

  // State management
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch blog posts from API
  // Update your blog page's fetchPosts function with better error handling

  const fetchPosts = async (page = 1, category = '', search = '') => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });
      
      if (category && category !== '') params.append('category', category);
      if (search && search !== '') params.append('search', search);

      console.log('Fetching:', `/api/blog?${params.toString()}`); // Debug log

      const response = await fetch(`/api/blog?${params}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: BlogResponse = await response.json();
      
      // Add safety checks
      if (!data || !Array.isArray(data.posts)) {
        throw new Error('Invalid API response format');
      }
      
      // Separate featured and regular posts
      const featured = data.posts.find(post => post.featured);
      const regular = data.posts.filter(post => !post.featured);
      
      setFeaturedPost(featured || data.posts[0] || null);
      setPosts(regular || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(data.pagination?.page || 1);
      
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      
      // Set fallback data
      setPosts([]);
      setFeaturedPost(null);
      setCategories([
        { name: 'AI Solutions', count: 0, slug: 'ai-solutions' },
        { name: 'Process Automation', count: 0, slug: 'process-automation' },
        { name: 'Web Development', count: 0, slug: 'web-development' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for filters
  // Also update your categories fetch with better error handling
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        // Use fallback categories if API fails
        setCategories([
          { name: 'AI Solutions', count: 0, slug: 'ai-solutions' },
          { name: 'Process Automation', count: 0, slug: 'process-automation' },
          { name: 'Web Development', count: 0, slug: 'web-development' },
          { name: 'Digital Transformation', count: 0, slug: 'digital-transformation' }
        ]);
      }
    } catch (err) {
      console.error('Categories fetch error:', err);
      // Use fallback categories
      setCategories([
        { name: 'AI Solutions', count: 0, slug: 'ai-solutions' },
        { name: 'Process Automation', count: 0, slug: 'process-automation' },
        { name: 'Web Development', count: 0, slug: 'web-development' }
      ]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(1, selectedCategory, searchQuery);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchPosts(page, selectedCategory, searchQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchPosts()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-indigo-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI & Automation Insights
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Expert insights on AI, automation, and digital transformation from our PhD team. 
              Stay ahead of the curve with cutting-edge strategies and real-world case studies.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !loading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
              <p className="text-lg text-gray-600">Don't miss our latest in-depth analysis</p>
            </div>
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                // Temporary debug version of your blog page
                // Add this right before your BlogFilters component in the JSX

                {/* DEBUG INFO - Remove after fixing */}
                {process.env.NODE_ENV === 'production' && (
                  <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    right: 0, 
                    background: 'black', 
                    color: 'white', 
                    padding: '10px', 
                    fontSize: '12px',
                    zIndex: 9999,
                    maxWidth: '300px'
                  }}>
                    <div>Debug Info:</div>
                    <div>Categories: {categories ? categories.length : 'null'}</div>
                    <div>Selected: '{selectedCategory}'</div>
                    <div>Posts: {posts ? posts.length : 'null'}</div>
                    <div>Featured: {featuredPost ? 'exists' : 'null'}</div>
                    <div>Loading: {loading ? 'true' : 'false'}</div>
                    <div>Error: {error || 'none'}</div>
                    <div>API Test: 
                      <button 
                        onClick={() => {
                          fetch('/api/blog')
                            .then(r => r.json())
                            .then(d => console.log('API Response:', d))
                            .catch(e => console.error('API Error:', e));
                        }}
                        style={{ marginLeft: '5px', fontSize: '10px' }}
                      >
                        Test
                      </button>
                    </div>
                  </div>
                )}
                <BlogFilters 
                  categories={categories || []}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                
                {/* Newsletter Signup */}
                <div className="bg-indigo-50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Stay Updated</h3>
                  <p className="text-gray-600 mb-4">Get the latest AI and automation insights delivered to your inbox.</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Posts Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  <span className="ml-3 text-gray-600">Loading articles...</span>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                    {posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg ${
                            currentPage === page
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Our PhD experts can help you transform these insights into actionable results for your Ohio business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </a>
            <a
              href="/services"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-indigo-400"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}