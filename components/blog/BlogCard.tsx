// components/blog/BlogCard.tsx - Fixed with image fallbacks
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

export interface BlogPostData {
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

interface BlogCardProps {
  post: BlogPostData;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ Safe image URLs with fallbacks
  const featuredImageSrc = post.featuredImage && post.featuredImage !== '' 
    ? post.featuredImage 
    : 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80'; // Tech fallback

  const authorAvatarSrc = post.author?.avatar && post.author.avatar !== '' 
    ? post.author.avatar 
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'; // Professional avatar fallback

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={featuredImageSrc}
            alt={post.title || 'Blog post image'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // ✅ Fallback if image fails to load
              e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {post.category || 'Blog'}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="mr-4">{formatDate(post.publishedAt)}</span>
          <Clock className="w-4 h-4 mr-2" />
          <span>{post.readTime || 5} min read</span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title || 'Untitled Post'}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || 'No excerpt available.'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={authorAvatarSrc}
              alt={post.author?.name || 'Author'}
              width={32}
              height={32}
              className="rounded-full mr-3"
              onError={(e) => {
                // ✅ Fallback if avatar fails to load
                e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80';
              }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author?.name || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500">
                {post.author?.title || 'Author'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {(post.tags || []).slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}