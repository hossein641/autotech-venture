// prisma/seed.ts - Updated with reliable external image URLs
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed with production-ready image URLs...');

  // Create/update users with working avatar URLs
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atechv.com' },
    update: {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    },
    create: {
      email: 'admin@atechv.com',
      password: await bcrypt.hash('admin123', 12),
      name: 'Dr. Hossein Mohammadi',
      role: 'ADMIN',
      title: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80', // Professional man
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@atechv.com' },
    update: {
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69a59eb?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    },
    create: {
      email: 'editor@atechv.com',
      password: await bcrypt.hash('editor123', 12),
      name: 'Dr. Sarah Johnson',
      role: 'EDITOR',
      title: 'Lead Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69a59eb?w=150&h=150&fit=crop&crop=face&auto=format&q=80', // Professional woman
    },
  });

  console.log('✅ Users created/updated');

  // Create categories
  const aiSolutionsCategory = await prisma.category.upsert({
    where: { slug: 'ai-solutions' },
    update: {},
    create: {
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Artificial Intelligence and Machine Learning solutions',
      color: '#3B82F6',
    },
  });

  const automationCategory = await prisma.category.upsert({
    where: { slug: 'process-automation' },
    update: {},
    create: {
      name: 'Process Automation',
      slug: 'process-automation',
      description: 'Business process automation and workflow optimization',
      color: '#10B981',
    },
  });

  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Modern web development and digital solutions',
      color: '#8B5CF6',
    },
  });

  const seoCategory = await prisma.category.upsert({
    where: { slug: 'seo-services' },
    update: {},
    create: {
      name: 'SEO Services',
      slug: 'seo-services',
      description: 'Search engine optimization and digital marketing',
      color: '#F59E0B',
    },
  });

  console.log('✅ Categories created/updated');

  // Create tags
  const tags = [
    { name: 'AI', slug: 'ai' },
    { name: 'Machine Learning', slug: 'machine-learning' },
    { name: 'Business', slug: 'business' },
    { name: 'Automation', slug: 'automation' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'Ohio', slug: 'ohio' },
    { name: 'Small Business', slug: 'small-business' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'Technology', slug: 'technology' },
  ];

  const createdTags = [];
  for (const tag of tags) {
    const createdTag = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
    createdTags.push(createdTag);
  }

  console.log('✅ Tags created/updated');

  // Create blog posts with working external image URLs
  const blogPosts = [
    {
      title: 'How AI Automation Transforms Small Businesses in Dayton',
      slug: 'ai-automation-transforms-small-businesses-dayton',
      excerpt: 'Discover how local Dayton businesses are leveraging AI automation to streamline operations, reduce costs, and increase productivity in 2025.',
      content: `
# How AI Automation Transforms Small Businesses in Dayton

Small businesses in Dayton, Ohio are experiencing a technological revolution. With the rise of affordable AI tools and automation platforms, local companies are now able to compete with larger corporations by implementing sophisticated technology solutions that were once only available to enterprise-level businesses.

## The Current Landscape

In 2025, AI automation is no longer a luxury—it's a necessity for businesses that want to remain competitive. Here in Dayton, we're seeing remarkable transformations across various industries:

### Manufacturing Excellence
Local manufacturing companies are implementing AI-powered quality control systems that can detect defects with 99.7% accuracy, reducing waste and improving customer satisfaction.

### Service Industry Innovation  
Restaurants and retail businesses are using automated customer service systems that handle 80% of customer inquiries, allowing staff to focus on high-value interactions.

### Healthcare Efficiency
Medical practices are automating appointment scheduling, patient follow-ups, and billing processes, reducing administrative overhead by up to 60%.

## Implementation Strategies

Successfully implementing AI automation requires a strategic approach:

1. **Start Small**: Begin with one process and scale gradually
2. **Staff Training**: Ensure your team understands and embraces the technology
3. **Measure Results**: Track key metrics to demonstrate ROI
4. **Continuous Improvement**: Regularly update and optimize your systems

## Real Results

Our clients in Dayton have seen average improvements of:
- 45% reduction in processing time
- 30% decrease in operational costs  
- 25% increase in customer satisfaction
- 50% reduction in human error

The future of business in Dayton is automated, intelligent, and incredibly promising for those who embrace these technologies today.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format&q=80', // AI/Technology image
      authorId: adminUser.id,
      categoryId: aiSolutionsCategory.id,
      featured: true,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-08-14'),
      readTime: 8,
      metaTitle: 'AI Automation for Small Businesses in Dayton Ohio | AutoTech Venture',
      metaDescription: 'Discover how Dayton small businesses are using AI automation to compete with larger companies. Expert insights on implementation strategies and real results.',
      keywords: JSON.stringify(['AI automation', 'small business Dayton', 'business process automation', 'Ohio technology']),
    },
    {
      title: 'Complete SEO Guide for Dayton Ohio Businesses in 2025',
      slug: 'complete-seo-guide-dayton-ohio-businesses-2025',
      excerpt: 'Master local SEO strategies that help Dayton businesses rank higher in Google search results and attract more qualified customers in their local market.',
      content: `
# Complete SEO Guide for Dayton Ohio Businesses in 2025

Search Engine Optimization (SEO) has evolved significantly, and local businesses in Dayton need to adapt their strategies to stay competitive in 2025. This comprehensive guide covers everything you need to know about dominating local search results.

## Local SEO Fundamentals

Local SEO is crucial for Dayton businesses because 82% of mobile users search for local businesses. When someone searches for "web design Dayton" or "AI consulting Ohio," you want your business to appear at the top.

### Google Business Profile Optimization
Your Google Business Profile is your most important local SEO asset:

- **Complete Information**: Ensure all business details are accurate and complete
- **Professional Photos**: Add high-quality images of your business, team, and work
- **Customer Reviews**: Actively encourage and respond to customer reviews
- **Regular Updates**: Post updates, offers, and business news regularly

### On-Page SEO for Local Businesses

Optimize your website content for local search:

1. **Title Tags**: Include your primary keyword and location (e.g., "AI Consulting Services in Dayton, Ohio")
2. **Meta Descriptions**: Write compelling descriptions that include local keywords
3. **Header Tags**: Structure your content with H1, H2, and H3 tags
4. **Local Keywords**: Naturally incorporate Dayton-specific terms throughout your content

## Content Strategy for Local SEO

Create content that serves your local audience:

### Location-Specific Content
- Neighborhood guides and local business spotlights
- Community event coverage and participation
- Local industry insights and trends
- Customer success stories from Dayton businesses

### Technical SEO Essentials
- **Mobile Optimization**: Ensure your site works perfectly on mobile devices
- **Page Speed**: Optimize loading times (aim for under 3 seconds)
- **SSL Certificate**: Secure your website with HTTPS
- **Schema Markup**: Implement local business schema for better search visibility

## Measuring SEO Success

Track these key metrics:
- Local search rankings for target keywords
- Google Business Profile views and clicks
- Website traffic from local searches
- Phone calls and direction requests
- Online review quantity and quality

With consistent effort and the right strategy, Dayton businesses can achieve top rankings and drive significant local traffic.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80', // SEO/Marketing image
      authorId: editorUser.id,
      categoryId: seoCategory.id,
      featured: false,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-08-13'),
      readTime: 6,
      metaTitle: 'Complete SEO Guide for Dayton Ohio Businesses 2025 | AutoTech Venture',
      metaDescription: 'Comprehensive SEO guide for Dayton businesses. Learn local SEO strategies that drive traffic and customers to Ohio businesses.',
      keywords: JSON.stringify(['SEO Dayton Ohio', 'local SEO strategy', 'Google Business Profile', 'Ohio digital marketing']),
    },
  ];

  // Create blog posts and connect tags
  for (const postData of blogPosts) {
    const post = await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        featuredImage: postData.featuredImage,
        featured: postData.featured,
        readTime: postData.readTime,
        metaTitle: postData.metaTitle,
        metaDescription: postData.metaDescription,
        keywords: postData.keywords,
      },
      create: postData,
    });

    // Connect relevant tags to posts
    const relevantTagNames = postData.title.includes('AI') ? ['AI', 'Business', 'Ohio', 'Small Business'] :
                           postData.title.includes('SEO') ? ['SEO', 'Digital Marketing', 'Business', 'Ohio'] :
                           ['Technology', 'Business', 'Ohio'];

    for (const tagName of relevantTagNames) {
      const tag = createdTags.find(t => t.name === tagName);
      if (tag) {
        await prisma.postTag.upsert({
          where: {
            postId_tagId: {
              postId: post.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            postId: post.id,
            tagId: tag.id,
          },
        });
      }
    }
  }

  console.log('✅ Blog posts created/updated with working image URLs');
  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log('- 2 users (admin & editor) with professional avatars');
  console.log('- 4 categories (AI, Automation, Web Dev, SEO)');
  console.log('- 10 tags for content organization');
  console.log('- 2 blog posts with working external images');
  console.log('\n🔗 Image URLs are from Unsplash and optimized for performance');
  console.log('🌐 All content is production-ready and SEO-optimized');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });