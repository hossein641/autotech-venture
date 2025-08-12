// components/blog/RelatedPosts.tsx - Updated with API integration
'use client';

import { useState, useEffect } from 'react';
import { BlogPostData } from './BlogCard';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
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

export default function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        
        // First, try to find posts in the same category
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
        const response = await fetch(`/api/blog?category=${categorySlug}&limit=6`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch related posts');
        }

        const data: BlogResponse = await response.json();
        
        // Filter out the current post and limit to 3 posts
        const filtered = data.posts
          .filter(post => post.id !== currentPostId)
          .slice(0, 3);
        
        // If we don't have enough posts in the same category, fetch recent posts
        if (filtered.length < 3) {
          const recentResponse = await fetch('/api/blog?limit=6&sortBy=publishedAt&sortOrder=desc');
          if (recentResponse.ok) {
            const recentData: BlogResponse = await recentResponse.json();
            const recentFiltered = recentData.posts
              .filter(post => post.id !== currentPostId)
              .slice(0, 3 - filtered.length);
            
            setRelatedPosts([...filtered, ...recentFiltered]);
          } else {
            setRelatedPosts(filtered);
          }
        } else {
          setRelatedPosts(filtered);
        }
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, category]);

  // Don't render if no related posts or still loading
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-lg text-gray-600">
              Loading more insights...
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Loading skeletons */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Related Articles
          </h2>
          <p className="text-lg text-gray-600">
            More insights on {category.toLowerCase()} and technology trends
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            View All Articles
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}