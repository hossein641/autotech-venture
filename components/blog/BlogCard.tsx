// components/blog/BlogCard.tsx - Production-ready with database URL support
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

// ✅ Production-ready image URL handler
function getImageUrl(imageUrl: string | null | undefined, type: 'featured' | 'avatar'): string {
  // If we have a valid URL, use it
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  
  // Professional fallbacks for your business
  return type === 'featured' 
    ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format&q=80' // Tech/business image
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80'; // Professional person
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ Get proper image URLs from database or fallbacks
  const featuredImageUrl = getImageUrl(post.featuredImage, 'featured');
  const authorAvatarUrl = getImageUrl(post.author?.avatar, 'avatar');

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={post.title || 'Blog post'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // ✅ Fallback to professional business image if database URL fails
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format&q=80';
            }}
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
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={authorAvatarUrl}
              alt={post.author?.name || 'Author'}
              width={32}
              height={32}
              className="rounded-full mr-3 object-cover"
              onError={(e) => {
                // ✅ Fallback to professional avatar if database URL fails
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80';
              }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author?.name}
              </p>
              <p className="text-xs text-gray-500">
                {post.author?.title}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag, index) => (
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