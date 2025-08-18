// components/blog/RelatedPosts.tsx - Production version with API integration
'use client';

import { useState, useEffect } from 'react';
import { BlogPostData } from './BlogCard';
import BlogCard from './BlogCard';
import { ArrowRight, BookOpen } from 'lucide-react';

interface RelatedPostsProps {
  currentPostId: string;
  category?: string;
  tags?: string[];
  maxPosts?: number;
  className?: string;
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

export default function RelatedPosts({ 
  currentPostId, 
  category, 
  tags = [], 
  maxPosts = 3,
  className = ''
}: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let posts: BlogPostData[] = [];
        
        // Strategy 1: Try to find posts in the same category
        if (category) {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const categoryResponse = await fetch(`/api/blog?category=${categorySlug}&limit=${maxPosts + 2}`);
          
          if (categoryResponse.ok) {
            const categoryData: BlogResponse = await categoryResponse.json();
            posts = categoryData.posts.filter(post => post.id !== currentPostId);
          }
        }
        
        // Strategy 2: If we don't have enough posts, get recent posts
        if (posts.length < maxPosts) {
          const recentResponse = await fetch(`/api/blog?limit=${maxPosts + 2}&sortBy=publishedAt&sortOrder=desc`);
          
          if (recentResponse.ok) {
            const recentData: BlogResponse = await recentResponse.json();
            const recentPosts = recentData.posts.filter(post => 
              post.id !== currentPostId && 
              !posts.some(existingPost => existingPost.id === post.id)
            );
            
            posts = [...posts, ...recentPosts];
          }
        }
        
        // Strategy 3: If still not enough, get featured posts
        if (posts.length < maxPosts) {
          const featuredResponse = await fetch(`/api/blog?featured=true&limit=${maxPosts + 2}`);
          
          if (featuredResponse.ok) {
            const featuredData: BlogResponse = await featuredResponse.json();
            const featuredPosts = featuredData.posts.filter(post => 
              post.id !== currentPostId && 
              !posts.some(existingPost => existingPost.id === post.id)
            );
            
            posts = [...posts, ...featuredPosts];
          }
        }
        
        // Limit to maxPosts and set the results
        setRelatedPosts(posts.slice(0, maxPosts));
        
      } catch (err) {
        console.error('Error fetching related posts:', err);
        setError('Failed to load related posts');
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, category, maxPosts]);

  // Don't render if no related posts found and not loading
  if (!loading && relatedPosts.length === 0 && !error) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Related Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover more insights and expert guidance from our team
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: maxPosts }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-300 rounded mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Related Posts Grid */}
        {!loading && relatedPosts.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center">
              <a
                href="/blog"
                className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && relatedPosts.length === 0 && !error && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Related Articles</h3>
            <p className="text-gray-600 mb-6">
              Check out our latest insights and expert guidance
            </p>
            <a
              href="/blog"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Browse All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}