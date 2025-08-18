// app/blog/page.tsx - Complete production-ready blog page
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import FeaturedPost from '@/components/blog/FeaturedPost';
import { BlogPostData } from '@/components/blog/BlogCard';
import { BookOpen, TrendingUp, Users, Calendar, ArrowRight, Loader2 } from 'lucide-react';

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
  // State management
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPostData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Set page metadata
  useEffect(() => {
    document.title = 'AI & Automation Blog | AutoTech Venture | Expert Insights Dayton Ohio';
    
    const metaDescription = document.querySelector('meta[name="description"]') || 
                           document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 
      'Expert insights on AI, automation, web development, and digital transformation from AutoTech Venture\'s PhD team in Dayton, Ohio.'
    );
    
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, []);

  // Fetch blog posts with filters
  const fetchPosts = async (page = 1, category: string | null = null, search = '', append = false) => {
    try {
      if (!append) setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });
      
      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const response = await fetch(`/api/blog?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data: BlogResponse = await response.json();
      
      // Handle posts
      if (append) {
        setPosts(prev => [...prev, ...data.posts]);
      } else {
        setPosts(data.posts);
      }
      
      // Handle featured post (first featured post or first post overall)
      if (!append) {
        const featured = data.posts.find(post => post.featured) || data.posts[0];
        setFeaturedPost(featured || null);
      }
      
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
      setHasMore(data.pagination.page < data.pagination.totalPages);
      
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Categories error:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts(1, selectedCategory, searchTerm);
    fetchCategories();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    if (currentPage === 1) {
      fetchPosts(1, selectedCategory, searchTerm);
    } else {
      setCurrentPage(1);
      fetchPosts(1, selectedCategory, searchTerm);
    }
  }, [selectedCategory, searchTerm]);

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle search change
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  // Load more posts
  const loadMorePosts = () => {
    if (hasMore && !loading) {
      fetchPosts(currentPage + 1, selectedCategory, searchTerm, true);
    }
  };

  const displayPosts = posts.filter(post => post.id !== featuredPost?.id);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                AI & Automation Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Expert Technology
              <span className="text-indigo-600 block">Insights & Guidance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay ahead with cutting-edge insights on AI, automation, and digital transformation 
              from our PhD-led team of technology experts in Dayton, Ohio.
            </p>
          </div>

          {/* Blog Stats */}
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">Latest Trends</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">PhD Experts</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              <span className="font-semibold">Weekly Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && !loading && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Article
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular and impactful content
              </p>
            </div>
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <BlogFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 
                   selectedCategory ? `${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory} Articles` :
                   'Latest Articles'}
                </h2>
                {displayPosts.length > 0 && (
                  <p className="text-gray-600">
                    {displayPosts.length} article{displayPosts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Loading State */}
              {loading && currentPage === 1 && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  <span className="ml-2 text-gray-600">Loading articles...</span>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-20">
                  <div className="text-red-600 mb-4">⚠️ {error}</div>
                  <button 
                    onClick={() => fetchPosts(1, selectedCategory, searchTerm)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Posts Grid */}
              {!loading && !error && displayPosts.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {displayPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center">
                      <button 
                        onClick={loadMorePosts}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Load More Articles
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!loading && !error && displayPosts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedCategory 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Check back soon for new content!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Expert Technology Guidance?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Our blog provides insights, but our consulting provides results. Let's discuss how 
            we can implement these strategies for your Ohio business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </a>
            <a
              href="/services"
              className="bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-indigo-400"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}