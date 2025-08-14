// prisma/seed.ts - Updated with external image URLs

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create/update users with external avatar URLs
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atechv.com' },
    update: {},
    create: {
      email: 'admin@atechv.com',
      password: await bcrypt.hash('admin123', 12),
      name: 'Dr. Hossein Mohammadi',
      role: 'ADMIN',
      title: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' // Professional man
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@atechv.com' },
    update: {},
    create: {
      email: 'editor@atechv.com',
      password: await bcrypt.hash('editor123', 12),
      name: 'Dr. Maziyar Pouyan',
      role: 'EDITOR',
      title: 'CTO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' // Professional man 2
    },
  });

  console.log('✅ Created/updated admin user');
  console.log('✅ Created/updated editor user');

  // Create/update categories
  const aiSolutionsCategory = await prisma.category.upsert({
    where: { slug: 'ai-solutions' },
    update: {},
    create: {
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Artificial Intelligence and Machine Learning solutions',
      color: '#3B82F6'
    },
  });

  const automationCategory = await prisma.category.upsert({
    where: { slug: 'automation' },
    update: {},
    create: {
      name: 'Automation',
      slug: 'automation',
      description: 'Business Process Automation and RPA',
      color: '#10B981'
    },
  });

  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Modern web development practices and technologies',
      color: '#8B5CF6'
    },
  });

  const digitalStrategyCategory = await prisma.category.upsert({
    where: { slug: 'digital-strategy' },
    update: {},
    create: {
      name: 'Digital Strategy',
      slug: 'digital-strategy',
      description: 'Digital transformation and business strategy',
      color: '#F59E0B'
    },
  });

  console.log('✅ Created/updated categories');

  // Create/update tags
  const tags = [
    { name: 'AI', slug: 'ai' },
    { name: 'Machine Learning', slug: 'machine-learning' },
    { name: 'Business', slug: 'business' },
    { name: 'Automation', slug: 'automation' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'Ohio', slug: 'ohio' },
    { name: 'Small Business', slug: 'small-business' }
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log('✅ Created/updated tags');

  // Create sample blog posts with external images
  const aiTransformationPost = await prisma.blogPost.upsert({
    where: { slug: 'ai-transformation-small-business-ohio-2025' },
    update: {},
    create: {
      title: 'AI Transformation for Small Businesses in Ohio: A 2025 Roadmap',
      slug: 'ai-transformation-small-business-ohio-2025',
      excerpt: 'Discover how Ohio small businesses are leveraging AI to compete with larger corporations and drive unprecedented growth in 2025.',
      content: `
        <p>The landscape of small business in Ohio is rapidly evolving, with artificial intelligence (AI) emerging as the great equalizer that allows smaller companies to compete with industry giants.</p>
        
        <h2>Why Ohio Small Businesses Need AI Now</h2>
        <p>Ohio's diverse business ecosystem, from manufacturing in Cleveland to tech startups in Columbus, presents unique opportunities for AI implementation. Small businesses that embrace AI technologies early will gain significant competitive advantages.</p>
        
        <h3>Key AI Applications for Small Businesses</h3>
        <ul>
          <li><strong>Customer Service Automation:</strong> AI-powered chatbots can handle routine inquiries 24/7</li>
          <li><strong>Inventory Management:</strong> Predictive analytics optimize stock levels and reduce waste</li>
          <li><strong>Marketing Automation:</strong> AI personalizes customer experiences and improves ROI</li>
          <li><strong>Financial Forecasting:</strong> Machine learning models predict cash flow and identify trends</li>
        </ul>
        
        <h2>Implementation Strategy</h2>
        <p>Starting your AI journey doesn't require a massive investment. Begin with simple automation tools and gradually expand to more sophisticated solutions.</p>
        
        <h3>Phase 1: Foundation (Months 1-3)</h3>
        <p>Focus on data collection and basic automation tools. Implement customer relationship management (CRM) systems that include AI features.</p>
        
        <h3>Phase 2: Expansion (Months 4-8)</h3>
        <p>Introduce predictive analytics for inventory and sales forecasting. Deploy chatbots for customer service.</p>
        
        <h3>Phase 3: Advanced Implementation (Months 9-12)</h3>
        <p>Implement machine learning models for personalized marketing and advanced business intelligence.</p>
        
        <h2>Ohio-Specific Resources</h2>
        <p>Take advantage of local resources like Ohio's technology incubators and state incentives for small business technology adoption.</p>
        
        <p>Ready to start your AI transformation? Contact AutoTech Venture for a personalized consultation tailored to your Ohio small business needs.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop', // AI/Technology image
      authorId: adminUser.id,
      categoryId: aiSolutionsCategory.id,
      status: 'PUBLISHED',
      featured: true,
      publishedAt: new Date('2025-01-15T10:00:00Z'),
      readTime: 8,
      metaTitle: 'AI Transformation for Small Businesses Ohio 2025 | AutoTech Venture',
      metaDescription: 'Complete guide to AI adoption for Ohio small businesses. Learn strategies, tools, and implementation steps from PhD experts.',
      keywords: JSON.stringify(['AI small business Ohio', 'business automation 2025', 'digital transformation'])
    },
  });

  const nextjsPost = await prisma.blogPost.upsert({
    where: { slug: 'building-scalable-web-applications-nextjs-app-router' },
    update: {},
    create: {
      title: 'Building Scalable Web Applications with Next.js App Router',
      slug: 'building-scalable-web-applications-nextjs-app-router',
      excerpt: 'Learn how to leverage Next.js 14 App Router for building enterprise-grade web applications that scale.',
      content: `
        <p>Next.js 14 introduces significant improvements to the App Router, making it easier than ever to build scalable, performant web applications.</p>
        
        <h2>Key Features of App Router</h2>
        <p>The App Router represents a paradigm shift in how we structure Next.js applications, offering better performance and developer experience.</p>
        
        <h3>Server Components by Default</h3>
        <p>All components in the app directory are Server Components by default, reducing client-side JavaScript and improving performance.</p>
        
        <h3>Improved Routing</h3>
        <p>File-based routing with support for layouts, loading states, and error boundaries makes building complex UIs more manageable.</p>
        
        <h2>Best Practices for Scalability</h2>
        <p>When building large applications, following these patterns will ensure your codebase remains maintainable and performant.</p>
        
        <h3>Component Organization</h3>
        <p>Structure your components in a logical hierarchy that reflects your application's data flow and user interface.</p>
        
        <h3>Data Fetching Strategies</h3>
        <p>Leverage Server Components for initial data loading and use client-side fetching only when necessary for interactivity.</p>
        
        <p>At AutoTech Venture, we use these patterns to build robust web applications for our clients across Ohio and beyond.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop', // Coding/Development image
      authorId: editorUser.id,
      categoryId: webDevCategory.id,
      status: 'PUBLISHED',
      featured: false,
      publishedAt: new Date('2025-01-10T14:00:00Z'),
      readTime: 12,
      metaTitle: 'Next.js App Router Guide: Building Scalable Web Apps | AutoTech Venture',
      metaDescription: 'Master Next.js 14 App Router for enterprise-grade applications. Learn best practices, patterns, and optimization techniques.',
      keywords: JSON.stringify(['Next.js App Router', 'web development', 'React', 'scalable applications'])
    },
  });

  const automationPost = await prisma.blogPost.upsert({
    where: { slug: 'roi-business-process-automation-case-study' },
    update: {},
    create: {
      title: 'The ROI of Business Process Automation: A Case Study',
      slug: 'roi-business-process-automation-case-study',
      excerpt: 'See how a Dayton manufacturing company achieved 300% ROI through strategic process automation implementation.',
      content: `
        <p>Business process automation (BPA) isn't just a buzzword—it's a strategic investment that delivers measurable returns.</p>
        
        <h2>Case Study: Dayton Manufacturing Company</h2>
        <p>Our client, a mid-sized manufacturing company in Dayton, Ohio, faced challenges with manual processes that were slowing growth and increasing costs.</p>
        
        <h3>The Challenge</h3>
        <p>Manual invoice processing, inventory tracking, and quality control documentation were consuming 40+ hours per week of staff time.</p>
        
        <h3>The Solution</h3>
        <p>We implemented a comprehensive automation solution including:</p>
        <ul>
          <li>Automated invoice processing and approval workflows</li>
          <li>Real-time inventory tracking with automatic reorder points</li>
          <li>Digital quality control checklists with automatic reporting</li>
          <li>Integration between existing systems</li>
        </ul>
        
        <h2>Results After 12 Months</h2>
        <p>The transformation exceeded expectations:</p>
        <ul>
          <li><strong>75% reduction</strong> in processing time</li>
          <li><strong>$100,000 annual savings</strong> in labor costs</li>
          <li><strong>50% fewer errors</strong> in data entry</li>
          <li><strong>300% ROI</strong> within the first year</li>
        </ul>
        
        <h2>Key Success Factors</h2>
        <p>Successful automation projects require careful planning, employee training, and gradual implementation.</p>
        
        <p>Ready to explore automation opportunities for your business? Contact AutoTech Venture for a free process assessment.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop', // Business/Automation image
      authorId: adminUser.id,
      categoryId: automationCategory.id,
      status: 'DRAFT',
      featured: false,
      publishedAt: null,
      readTime: 6,
      metaTitle: 'Business Process Automation ROI Case Study | AutoTech Venture',
      metaDescription: 'Real results from process automation implementation. See how one Dayton company achieved 300% ROI in 12 months.',
      keywords: JSON.stringify(['business process automation', 'ROI case study', 'manufacturing automation'])
    },
  });

  console.log('✅ Created/updated sample blog posts');

  // Create tag relationships
  const aiTag = await prisma.tag.findUnique({ where: { slug: 'ai' } });
  const businessTag = await prisma.tag.findUnique({ where: { slug: 'business' } });
  const automationTag = await prisma.tag.findUnique({ where: { slug: 'automation' } });
  const nextjsTag = await prisma.tag.findUnique({ where: { slug: 'nextjs' } });
  const ohioTag = await prisma.tag.findUnique({ where: { slug: 'ohio' } });
  const smallBusinessTag = await prisma.tag.findUnique({ where: { slug: 'small-business' } });

  // Add tags to posts using upsert to handle duplicates
  if (aiTag && businessTag && ohioTag && smallBusinessTag) {
    const tagAssignments = [
      { postId: aiTransformationPost.id, tagId: aiTag.id },
      { postId: aiTransformationPost.id, tagId: businessTag.id },
      { postId: aiTransformationPost.id, tagId: ohioTag.id },
      { postId: aiTransformationPost.id, tagId: smallBusinessTag.id }
    ];

    for (const assignment of tagAssignments) {
      await prisma.postTag.upsert({
        where: {
          postId_tagId: {
            postId: assignment.postId,
            tagId: assignment.tagId
          }
        },
        update: {},
        create: assignment
      });
    }
  }

  if (nextjsTag) {
    await prisma.postTag.upsert({
      where: {
        postId_tagId: {
          postId: nextjsPost.id,
          tagId: nextjsTag.id
        }
      },
      update: {},
      create: { postId: nextjsPost.id, tagId: nextjsTag.id }
    });
  }

  if (automationTag && businessTag) {
    const tagAssignments = [
      { postId: automationPost.id, tagId: automationTag.id },
      { postId: automationPost.id, tagId: businessTag.id }
    ];

    for (const assignment of tagAssignments) {
      await prisma.postTag.upsert({
        where: {
          postId_tagId: {
            postId: assignment.postId,
            tagId: assignment.tagId
          }
        },
        update: {},
        create: assignment
      });
    }
  }

  console.log('✅ Created/updated tags');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Data Summary:');
  console.log('👤 Admin user: admin@atechv.com (password: admin123)');
  console.log('👤 Editor user: editor@atechv.com (password: editor123)');
  console.log('📝 AI Transformation for Small Businesses in Ohio: A 2025 Roadmap (PUBLISHED, FEATURED)');
  console.log('📝 Building Scalable Web Applications with Next.js App Router (PUBLISHED)');
  console.log('📝 The ROI of Business Process Automation: A Case Study (DRAFT)');
  console.log('🏷️  Categories: 4 created/updated');
  console.log('🔖 Tags: 7 created/updated');
  console.log('\n🚀 Next steps:');
  console.log('1. Start dev server: "npm run dev"');
  console.log('2. Visit CMS: "http://localhost:3000/admin"');
  console.log('3. Login with admin credentials above');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });