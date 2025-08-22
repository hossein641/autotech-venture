// components/sections/BlogSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, ArrowRight, TrendingUp, Users, Loader2 } from 'lucide-react';

// Types matching your existing blog system
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    title?: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  status: string;
}

interface BlogResponse {
  posts: BlogPost[];
  pagination: {
    total: number;
  };
}

export default function BlogSection() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Blog stats (you can also fetch these from API if available)
  const blogStats = [
    { number: "50+", label: "Articles Published" },
    { number: "10K+", label: "Monthly Readers" },
    { number: "PhD", label: "Expert Authors" },
    { number: "Weekly", label: "New Content" }
  ];

  // Fetch recent blog posts from API
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        
        // Fetch latest 3 published posts for homepage
        const response = await fetch('/api/blog?status=PUBLISHED&limit=3&sortBy=publishedAt&sortOrder=desc');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data: BlogResponse = await response.json();
        setRecentPosts(data.posts || []);
        setError(null);
        
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
        
        // Fallback to empty array - component will handle gracefully
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  // Date formatting function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Expert Insights
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our
            <span className="text-indigo-600 block">Technology Blog</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Stay informed with cutting-edge insights on AI, automation, and digital transformation 
            from our PhD-led team of technology experts.
          </p>

          {/* Blog Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {blogStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-xl font-bold text-indigo-600 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="ml-2 text-gray-600">Loading latest articles...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">⚠️ {error}</div>
            <p className="text-gray-600 mb-6">Unable to load latest blog posts at the moment.</p>
            <Link 
              href="/blog"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Visit Blog Page
            </Link>
          </div>
        )}

        {/* Recent Blog Posts */}
        {!loading && !error && recentPosts.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recentPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{formatDate(post.publishedAt)}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readTime} min read</span>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                          {post.author.title && (
                            <p className="text-xs text-gray-500">{post.author.title}</p>
                          )}
                        </div>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link
                href="/blog"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold inline-flex items-center gap-2 shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                View All Articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}

        {/* No Posts State */}
        {!loading && !error && recentPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-600 mb-6">Our expert team is working on amazing content for you.</p>
            <Link 
              href="/contact"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Stay Tuned
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}