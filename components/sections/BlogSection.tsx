
// components/sections/BlogSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';

export default function BlogSection() {
  // Sample recent blog posts - in production, these would be fetched dynamically
  const recentPosts = [
    {
      id: "1",
      slug: "ai-transformation-small-business-ohio-2025",
      title: "AI Transformation for Small Businesses in Ohio: A 2025 Roadmap",
      excerpt: "Discover how Ohio small businesses are leveraging AI to compete with larger corporations and drive unprecedented growth.",
      featuredImage: "/images/blog/ai-transformation-2025.jpg",
      author: {
        name: "Dr. Hossein Mohammadi",
        avatar: "/images/team/hossein-mohammadi.jpg"
      },
      publishedAt: "2025-01-15T10:00:00Z",
      readTime: 8,
      category: "AI Solutions"
    },
    {
      id: "2",
      slug: "process-automation-roi-manufacturing-dayton",
      title: "Case Study: 75% Efficiency Gain Through Process Automation",
      excerpt: "How a Dayton manufacturing company saved $100K annually and reduced processing time by 75% with our automation solution.",
      featuredImage: "/images/blog/manufacturing-automation-case-study.jpg",
      author: {
        name: "Dr. Maziyar Pouyan",
        avatar: "/images/team/maziyar-pouyan.jpg"
      },
      publishedAt: "2025-01-10T14:30:00Z",
      readTime: 6,
      category: "Process Automation"
    },
    {
      id: "3",
      slug: "local-seo-strategies-ohio-businesses-2025",
      title: "Local SEO Strategies That Dominate Ohio Search Results",
      excerpt: "Proven SEO tactics that help Ohio businesses rank #1 in local search and attract more qualified customers.",
      featuredImage: "/images/blog/local-seo-ohio-2025.jpg",
      author: {
        name: "AutoTech Venture Team",
        avatar: "/images/team/autotech-venture-logo.jpg"
      },
      publishedAt: "2025-01-08T09:15:00Z",
      readTime: 10,
      category: "SEO & Marketing"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const blogStats = [
    { number: "50+", label: "Expert Articles" },
    { number: "10K+", label: "Monthly Readers" },
    { number: "PhD", label: "Expert Authors" },
    { number: "Weekly", label: "New Content" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Expert Insights & Analysis
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Technology Insights from PhD Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay ahead of the technology curve with expert insights on AI, automation, web development, 
            and digital transformation from our PhD team.
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

        {/* Recent Blog Posts */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full mr-3"
                  />
                  <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold inline-flex items-center gap-2"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
