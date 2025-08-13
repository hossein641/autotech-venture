// prisma/seed.ts - Fixed version with working image URLs

import { PrismaClient, Role, PostStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atechv.com' },
    update: {
      name: 'Dr. Hossein Mohammadi',
      title: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: Role.ADMIN,
    },
    create: {
      email: 'admin@atechv.com',
      name: 'Dr. Hossein Mohammadi',
      title: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: Role.ADMIN,
      password: adminPassword,
    },
  });
  console.log('✅ Created/updated admin user');

  // Create editor user
  const editorPassword = await bcrypt.hash('editor123', 12);
  
  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@atechv.com' },
    update: {
      name: 'Sarah Johnson',
      title: 'Content Editor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: Role.EDITOR,
    },
    create: {
      email: 'editor@atechv.com',
      name: 'Sarah Johnson',
      title: 'Content Editor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: Role.EDITOR,
      password: editorPassword,
    },
  });
  console.log('✅ Created/updated editor user');

  // Create categories (same as before)
  const aiCategory = await prisma.category.upsert({
    where: { slug: 'ai-solutions' },
    update: {
      name: 'AI Solutions',
      description: 'Artificial Intelligence and Machine Learning insights',
      color: '#6366f1',
    },
    create: {
      name: 'AI Solutions',
      slug: 'ai-solutions',
      description: 'Artificial Intelligence and Machine Learning insights',
      color: '#6366f1',
    },
  });

  const automationCategory = await prisma.category.upsert({
    where: { slug: 'automation' },
    update: {
      name: 'Automation',
      description: 'Business process automation and efficiency',
      color: '#059669',
    },
    create: {
      name: 'Automation',
      slug: 'automation',
      description: 'Business process automation and efficiency',
      color: '#059669',
    },
  });

  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {
      name: 'Web Development',
      description: 'Modern web development techniques and best practices',
      color: '#dc2626',
    },
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Modern web development techniques and best practices',
      color: '#dc2626',
    },
  });

  const strategyCategory = await prisma.category.upsert({
    where: { slug: 'digital-strategy' },
    update: {
      name: 'Digital Strategy',
      description: 'Strategic insights for digital transformation',
      color: '#7c3aed',
    },
    create: {
      name: 'Digital Strategy',
      slug: 'digital-strategy',
      description: 'Strategic insights for digital transformation',
      color: '#7c3aed',
    },
  });
  console.log('✅ Created/updated categories');

  // Create tags (same as before)
  const tagData = [
    { name: 'AI', slug: 'ai' },
    { name: 'Machine Learning', slug: 'machine-learning' },
    { name: 'Business', slug: 'business' },
    { name: 'Automation', slug: 'automation' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'Ohio', slug: 'ohio' },
    { name: 'Small Business', slug: 'small-business' },
  ];

  const tags = [];
  for (const tag of tagData) {
    const createdTag = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: { name: tag.name },
      create: tag,
    });
    tags.push(createdTag);
  }
  console.log('✅ Created/updated tags');

  // Create/update sample blog posts with working image URLs
  const post1 = await prisma.blogPost.upsert({
    where: { slug: 'ai-transformation-small-business-ohio-2025' },
    update: {
      title: 'AI Transformation for Small Businesses in Ohio: A 2025 Roadmap',
      excerpt: 'Discover how Ohio small businesses are leveraging AI to compete with larger corporations and drive unprecedented growth in 2025.',
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      featured: true,
      status: PostStatus.PUBLISHED,
    },
    create: {
      title: 'AI Transformation for Small Businesses in Ohio: A 2025 Roadmap',
      slug: 'ai-transformation-small-business-ohio-2025',
      excerpt: 'Discover how Ohio small businesses are leveraging AI to compete with larger corporations and drive unprecedented growth in 2025.',
      content: `<h2>The AI Revolution is Here</h2>
<p>Artificial Intelligence is no longer a futuristic concept—it's a present-day reality that's transforming businesses across Ohio. Small and medium-sized enterprises that embrace AI today are positioning themselves for unprecedented growth and competitive advantage.</p>

<h3>Key Areas for AI Implementation</h3>
<ul>
  <li><strong>Customer Service Automation:</strong> AI-powered chatbots can handle 80% of routine customer inquiries</li>
  <li><strong>Predictive Analytics:</strong> Forecast demand, optimize inventory, and improve decision-making</li>
  <li><strong>Process Automation:</strong> Streamline repetitive tasks and reduce operational costs</li>
  <li><strong>Personalized Marketing:</strong> Target customers with precision using AI-driven insights</li>
</ul>

<h3>Getting Started: Your 90-Day AI Roadmap</h3>
<p>Our team at AutoTech Venture has developed a proven 90-day implementation strategy that helps Ohio businesses see measurable results quickly.</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      metaTitle: 'AI Transformation for Small Businesses Ohio 2025 | AutoTech Venture',
      metaDescription: 'Complete guide to AI adoption for Ohio small businesses. Learn strategies, tools, and implementation steps from PhD experts.',
      keywords: JSON.stringify(['AI', 'small business', 'Ohio', 'digital transformation', 'automation']),
      featured: true,
      status: PostStatus.PUBLISHED,
      readTime: 8,
      publishedAt: new Date('2025-01-15T10:00:00Z'),
      authorId: adminUser.id,
      categoryId: aiCategory.id,
    },
  });

  const post2 = await prisma.blogPost.upsert({
    where: { slug: 'scalable-web-apps-nextjs-app-router' },
    update: {
      title: 'Building Scalable Web Applications with Next.js App Router',
      excerpt: 'Learn how to build performant, scalable web applications using Next.js App Router with real-world examples and best practices.',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      status: PostStatus.PUBLISHED,
    },
    create: {
      title: 'Building Scalable Web Applications with Next.js App Router',
      slug: 'scalable-web-apps-nextjs-app-router',
      excerpt: 'Learn how to build performant, scalable web applications using Next.js App Router with real-world examples and best practices.',
      content: `<h2>Next.js App Router: The Future of React Development</h2>
<p>The new App Router in Next.js 13+ represents a paradigm shift in how we build React applications. It brings server components, improved routing, and better performance optimization out of the box.</p>

<h3>Key Benefits of App Router</h3>
<ul>
  <li><strong>Server Components:</strong> Reduce client-side JavaScript and improve performance</li>
  <li><strong>Nested Layouts:</strong> Create complex layouts with ease</li>
  <li><strong>Loading States:</strong> Built-in loading UI patterns</li>
  <li><strong>Error Boundaries:</strong> Better error handling at the route level</li>
</ul>`,
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      metaTitle: 'Next.js App Router Tutorial | Web Development Best Practices',
      metaDescription: 'Learn to build scalable web applications with Next.js App Router. Expert tips and real-world examples included.',
      keywords: JSON.stringify(['Next.js', 'React', 'web development', 'App Router', 'performance']),
      featured: false,
      status: PostStatus.PUBLISHED,
      readTime: 6,
      publishedAt: new Date('2025-01-10T14:30:00Z'),
      authorId: editorUser.id,
      categoryId: webDevCategory.id,
    },
  });

  const post3 = await prisma.blogPost.upsert({
    where: { slug: 'roi-business-process-automation-case-study' },
    update: {
      title: 'The ROI of Business Process Automation: A Case Study',
      excerpt: 'See how one Ohio manufacturing company saved $150K annually and reduced processing time by 75% through strategic automation.',
      featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      status: PostStatus.DRAFT,
    },
    create: {
      title: 'The ROI of Business Process Automation: A Case Study',
      slug: 'roi-business-process-automation-case-study',
      excerpt: 'See how one Ohio manufacturing company saved $150K annually and reduced processing time by 75% through strategic automation.',
      content: `<h2>Executive Summary</h2>
<p>This case study examines how a mid-sized manufacturing company in Dayton, Ohio, achieved remarkable efficiency gains and cost savings through comprehensive business process automation.</p>

<h2>The Challenge</h2>
<p>Our client was struggling with manual processes that were eating into their profits and slowing down operations...</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      metaTitle: 'Business Process Automation ROI Case Study | AutoTech Venture',
      metaDescription: 'Real case study showing 75% efficiency gains and $150K annual savings through business process automation.',
      keywords: JSON.stringify(['automation', 'ROI', 'case study', 'business efficiency', 'manufacturing']),
      featured: false,
      status: PostStatus.DRAFT,
      readTime: 5,
      authorId: adminUser.id,
      categoryId: automationCategory.id,
    },
  });

  // Handle post-tag relationships (delete existing and recreate)
  await prisma.postTag.deleteMany({
    where: {
      postId: { in: [post1.id, post2.id, post3.id] }
    }
  });

  // Create new tag relationships
  await prisma.postTag.createMany({
    data: [
      // Post 1 tags
      { postId: post1.id, tagId: tags[0].id }, // AI
      { postId: post1.id, tagId: tags[2].id }, // Business
      { postId: post1.id, tagId: tags[5].id }, // Ohio
      { postId: post1.id, tagId: tags[6].id }, // Small Business
      // Post 2 tags
      { postId: post2.id, tagId: tags[4].id }, // Next.js
      // Post 3 tags
      { postId: post3.id, tagId: tags[3].id }, // Automation
      { postId: post3.id, tagId: tags[2].id }, // Business
    ]
  });

  console.log('✅ Created/updated sample blog posts');
  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Data Summary:');
  console.log(`👤 Admin user: ${adminUser.email} (password: admin123)`);
  console.log(`👤 Editor user: ${editorUser.email} (password: editor123)`);
  console.log(`📝 ${post1.title} (PUBLISHED, FEATURED)`);
  console.log(`📝 ${post2.title} (PUBLISHED)`);
  console.log(`📝 ${post3.title} (DRAFT)`);
  console.log(`🏷️  Categories: 4 created/updated`);
  console.log(`🔖 Tags: 7 created/updated`);
  console.log('\n🚀 Next steps:');
  console.log('1. Start dev server: "npm run dev"');
  console.log('2. Visit CMS: "http://localhost:3000/admin"');
  console.log('3. Login with admin credentials above');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });