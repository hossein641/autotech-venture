// app/blog/page.tsx - Test BlogCard component
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';                    // ← ADD THIS BACK
// import BlogFilters from '@/components/blog/BlogFilters';           // ← Keep commented
// import FeaturedPost from '@/components/blog/FeaturedPost';         // ← Keep commented
import { BookOpen, TrendingUp, Users, Calendar, Search, ArrowRight, Loader2 } from 'lucide-react';

// ... keep all your interfaces and component logic exactly the same ...

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

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
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Set page title and metadata
  useEffect(() => {
    document.title = 'AI & Automation Blog | AutoTech Venture | Expert Insights Dayton Ohio';
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Fetching: /api/blog?page=1&limit=9');
        
        const response = await fetch('/api/blog?page=1&limit=9');
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data: BlogResponse = await response.json();
        console.log('Posts fetched:', data);
        
        setPosts(data.posts || []);
        setFeaturedPost(data.posts?.[0] || null);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/blog/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
          console.log('Categories fetched:', data.categories);
        }
      } catch (err) {
        console.error('Categories error:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Expert Technology
              <span className="text-indigo-600 block">Insights & Guidance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay ahead with cutting-edge insights on AI, automation, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Test BlogCard Component */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Testing BlogCard Component</h2>
            
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <span className="ml-2 text-gray-600">Loading articles...</span>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-20">
                <div className="text-red-600 mb-4">⚠️ {error}</div>
              </div>
            )}

            {!loading && !error && posts.length > 0 && (
              <div>
                <p className="text-lg text-gray-600 mb-8">
                  Testing BlogCard with {posts.length} posts
                </p>
                
                {/* TEST: BlogCard Components */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <p className="text-gray-600">No posts found</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}