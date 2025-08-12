// prisma/seed.ts - Now with working enum imports!

import { PrismaClient, Role, PostStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed with enums...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atechv.com' },
    update: {},
    create: {
      email: 'admin@atechv.com',
      name: 'Dr. Hossein Mohammadi',
      title: 'CEO & Co-Founder',
      avatar: '/images/team/hossein-mohammadi.jpg',
      role: Role.ADMIN, // ✅ Now using proper enum!
      password: hashedPassword,
    },
  });
  console.log('✅ Created admin user');

  // Create editor user
  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@atechv.com' },
    update: {},
    create: {
      email: 'editor@atechv.com',
      name: 'Sarah Johnson',
      title: 'Content Editor',
      avatar: '/images/team/sarah-johnson.jpg',
      role: Role.EDITOR, // ✅ Using enum
      password: await bcrypt.hash('editor123', 12),
    },
  });

  // Create categories
  const aiCategory = await prisma.category.upsert({
    where: { slug: 'ai-solutions' },
    update: {},
    create: {
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Artificial Intelligence and Machine Learning insights',
      color: '#6366f1',
    },
  });

  const automationCategory = await prisma.category.upsert({
    where: { slug: 'automation' },
    update: {},
    create: {
      name: 'Automation',
      slug: 'automation',
      description: 'Business process automation and efficiency',
      color: '#059669',
    },
  });

  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Modern web development techniques and best practices',
      color: '#dc2626',
    },
  });

  const strategyCategory = await prisma.category.upsert({
    where: { slug: 'digital-strategy' },
    update: {},
    create: {
      name: 'Digital Strategy',
      slug: 'digital-strategy',
      description: 'Strategic insights for digital transformation',
      color: '#7c3aed',
    },
  });
  console.log('✅ Created categories');

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'ai' },
      update: {},
      create: { name: 'AI', slug: 'ai' },
    }),
    prisma.tag.upsert({
      where: { slug: 'machine-learning' },
      update: {},
      create: { name: 'Machine Learning', slug: 'machine-learning' },
    }),
    prisma.tag.upsert({
      where: { slug: 'business' },
      update: {},
      create: { name: 'Business', slug: 'business' },
    }),
    prisma.tag.upsert({
      where: { slug: 'automation' },
      update: {},
      create: { name: 'Automation', slug: 'automation' },
    }),
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: { name: 'Next.js', slug: 'nextjs' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ohio' },
      update: {},
      create: { name: 'Ohio', slug: 'ohio' },
    }),
    prisma.tag.upsert({
      where: { slug: 'small-business' },
      update: {},
      create: { name: 'Small Business', slug: 'small-business' },
    }),
  ]);
  console.log('✅ Created tags');

  // Create sample blog posts
  const post1 = await prisma.blogPost.create({
    data: {
      title: 'AI Transformation for Small Businesses in Ohio: A 2025 Roadmap',
      slug: 'ai-transformation-small-business-ohio-2025',
      excerpt: 'Discover how Ohio small businesses are leveraging AI to compete with larger corporations and drive unprecedented growth in 2025.',
      content: `
        <h2>The AI Revolution is Here</h2>
        <p>Artificial Intelligence is no longer a futuristic concept—it's a present-day reality that's transforming businesses across Ohio. Small and medium-sized enterprises that embrace AI today are positioning themselves for unprecedented growth and competitive advantage.</p>
        
        <h3>Key Areas for AI Implementation</h3>
        <ul>
          <li><strong>Customer Service Automation:</strong> AI-powered chatbots can handle 80% of routine customer inquiries</li>
          <li><strong>Predictive Analytics:</strong> Forecast demand, optimize inventory, and improve decision-making</li>
          <li><strong>Process Automation:</strong> Streamline repetitive tasks and reduce operational costs</li>
          <li><strong>Personalized Marketing:</strong> Target customers with precision using AI-driven insights</li>
        </ul>

        <h3>Getting Started: Your 90-Day AI Roadmap</h3>
        <p>Our team at AutoTech Venture has developed a proven 90-day implementation strategy that helps Ohio businesses see measurable results quickly...</p>
      `,
      featuredImage: '/images/blog/ai-transformation-2025.jpg',
      metaTitle: 'AI Transformation for Small Businesses Ohio 2025 | AutoTech Venture',
      metaDescription: 'Complete guide to AI adoption for Ohio small businesses. Learn strategies, tools, and implementation steps from PhD experts.',
      keywords: JSON.stringify(['AI', 'small business', 'Ohio', 'digital transformation', 'automation']),
      featured: true,
      status: PostStatus.PUBLISHED, // ✅ Using enum
      readTime: 8,
      publishedAt: new Date('2025-01-15T10:00:00Z'),
      authorId: adminUser.id,
      categoryId: aiCategory.id,
      tags: {
        create: [
          { tagId: tags[0].id }, // AI
          { tagId: tags[2].id }, // Business
          { tagId: tags[5].id }, // Ohio
          { tagId: tags[6].id }, // Small Business
        ],
      },
    },
  });

  const post2 = await prisma.blogPost.create({
    data: {
      title: 'Building Scalable Web Applications with Next.js App Router',
      slug: 'scalable-web-apps-nextjs-app-router',
      excerpt: 'Learn how to build performant, scalable web applications using Next.js App Router with real-world examples and best practices.',
      content: `
        <h2>Next.js App Router: The Future of React Development</h2>
        <p>The new App Router in Next.js 13+ represents a paradigm shift in how we build React applications. It brings server components, improved routing, and better performance optimization out of the box.</p>
        
        <h3>Key Benefits</h3>
        <ul>
          <li>Server Components for better performance</li>
          <li>Nested layouts and loading states</li>
          <li>Improved SEO with automatic static optimization</li>
          <li>Better developer experience with co-located components</li>
        </ul>

        <p>At AutoTech Venture, we've migrated several client projects to the App Router and seen significant performance improvements...</p>
      `,
      featuredImage: '/images/blog/nextjs-app-router.jpg',
      metaTitle: 'Next.js App Router Tutorial | Web Development Best Practices',
      metaDescription: 'Learn to build scalable web applications with Next.js App Router. Expert tips and real-world examples included.',
      keywords: JSON.stringify(['Next.js', 'React', 'web development', 'App Router', 'performance']),
      featured: false,
      status: PostStatus.PUBLISHED, // ✅ Using enum
      readTime: 6,
      publishedAt: new Date('2025-01-10T14:30:00Z'),
      authorId: editorUser.id,
      categoryId: webDevCategory.id,
      tags: {
        create: [
          { tagId: tags[4].id }, // Next.js
        ],
      },
    },
  });

  const post3 = await prisma.blogPost.create({
    data: {
      title: 'The ROI of Business Process Automation: A Case Study',
      slug: 'roi-business-process-automation-case-study',
      excerpt: 'See how one Ohio manufacturing company saved $150K annually and reduced processing time by 75% through strategic automation.',
      content: `
        <h2>The Challenge</h2>
        <p>Our client, a mid-sized manufacturing company in Dayton, was struggling with manual processes that were eating into their profits and slowing down operations...</p>
        
        <h2>The Solution</h2>
        <p>We implemented a comprehensive automation strategy that included:</p>
        <ul>
          <li>Automated inventory management</li>
          <li>Digital document processing</li>
          <li>Customer communication automation</li>
          <li>Quality control workflows</li>
        </ul>

        <h2>The Results</h2>
        <p>Within 6 months of implementation, the company saw remarkable improvements...</p>
      `,
      featuredImage: '/images/blog/automation-roi-case-study.jpg',
      metaTitle: 'Business Process Automation ROI Case Study | AutoTech Venture',
      metaDescription: 'Real case study showing 75% efficiency gains and $150K annual savings through business process automation.',
      keywords: JSON.stringify(['automation', 'ROI', 'case study', 'business efficiency', 'manufacturing']),
      featured: false,
      status: PostStatus.DRAFT, // ✅ Using enum
      readTime: 5,
      authorId: adminUser.id,
      categoryId: automationCategory.id,
      tags: {
        create: [
          { tagId: tags[3].id }, // Automation
          { tagId: tags[2].id }, // Business
        ],
      },
    },
  });

  console.log('✅ Created sample blog posts');
  console.log('🎉 Database seeding completed successfully!');
  console.log('\nCreated:');
  console.log(`- Admin user: ${adminUser.email} (password: admin123)`);
  console.log(`- Editor user: ${editorUser.email} (password: editor123)`);
  console.log(`- ${post1.title} (PUBLISHED)`);
  console.log(`- ${post2.title} (PUBLISHED)`);
  console.log(`- ${post3.title} (DRAFT)`);
  console.log('\n🚀 Run "npx prisma studio" to view your data!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });