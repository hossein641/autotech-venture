// components/blog/FeaturedPost.tsx - Production version with SEO-optimized CTAs
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import { BlogPostData } from './BlogCard';

interface FeaturedPostProps {
  post: BlogPostData | null;
  className?: string;
}

// ✅ Same image handling as BlogCard for consistency
function getImageUrl(imageUrl: string | null | undefined, type: 'featured' | 'avatar'): string {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  
  return type === 'featured' 
    ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&auto=format&q=80'
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80';
}

// ✅ Generate SEO-friendly CTA text for featured posts
function generateFeaturedCtaText(title: string, category: string): string {
  // For featured posts, create more compelling CTA text
  if (title.length > 45) {
    return `Read Full ${category} Article`;
  }
  
  // Use shortened title for better UX
  const shortTitle = title.length > 35 ? title.substring(0, 32) + "..." : title;
  return `Read: ${shortTitle}`;
}

export default function FeaturedPost({ post, className = '' }: FeaturedPostProps) {
  // ✅ Handle null post gracefully
  if (!post) {
    return (
      <div className={`bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-8 text-center ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Star className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Featured Post</h3>
          <p className="text-gray-600 mb-4">Check back soon for featured content from our experts.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredImageUrl = getImageUrl(post.featuredImage, 'featured');
  const authorAvatarUrl = getImageUrl(post.author?.avatar, 'avatar');
  
  // ✅ Generate SEO-friendly CTA text
  const ctaText = generateFeaturedCtaText(post.title, post.category);

  return (
    <article className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group ${className}`}>
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 lg:h-auto min-h-[400px]">
          <Image
            src={featuredImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&auto=format&q=80';
            }}
          />
          
          {/* Overlay with badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-none" />
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Featured Article
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="mr-6">{formatDate(post.publishedAt)}</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime} min read</span>
          </div>
          
          {/* Title as clickable link */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>
          
          {/* Excerpt */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Author and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={authorAvatarUrl}
                alt={post.author?.name || 'Author'}
                width={48}
                height={48}
                className="rounded-full mr-4 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80';
                }}
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author?.name}</p>
                <p className="text-sm text-gray-500">{post.author?.title}</p>
              </div>
            </div>
            
            {/* ✅ SEO-optimized CTA with descriptive text */}
            <Link
              href={`/blog/${post.slug}`}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
              aria-label={`Read full featured article: ${post.title}`}
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}