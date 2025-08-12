// components/blog/FeaturedPost.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPostData } from './BlogCard';

interface FeaturedPostProps {
  post: BlogPostData;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-auto">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-6 left-6">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Featured Article
            </span>
          </div>
        </div>
        
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="mr-6">{formatDate(post.publishedAt)}</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime} min read</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.title}</p>
              </div>
            </div>
            
            <Link
              href={`/blog/${post.slug}`}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
            >
              Read Article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
