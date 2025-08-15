import { config } from 'dotenv';
import { turso } from '../lib/turso';

// Load environment variables first
config();

console.log('🔍 Environment check:');
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL starts with libsql:', process.env.DATABASE_URL?.startsWith('libsql://'));

async function setupTursoDatabase() {
  try {
    console.log('🚀 Creating tables in Turso...');
    
    // Create Users table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS User (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        avatar TEXT,
        title TEXT,
        role TEXT DEFAULT 'AUTHOR',
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Categories table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS Category (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        color TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Tags table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS Tag (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create BlogPost table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS BlogPost (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        featuredImage TEXT,
        publishedAt TEXT,
        readTime INTEGER DEFAULT 5,
        featured BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'DRAFT',
        metaTitle TEXT,
        metaDescription TEXT,
        keywords TEXT DEFAULT '[]',
        authorId TEXT NOT NULL,
        categoryId TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (authorId) REFERENCES User (id),
        FOREIGN KEY (categoryId) REFERENCES Category (id)
      )
    `);

    // Create PostTag junction table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS PostTag (
        blogPostId TEXT NOT NULL,
        tagId TEXT NOT NULL,
        PRIMARY KEY (blogPostId, tagId),
        FOREIGN KEY (blogPostId) REFERENCES BlogPost (id) ON DELETE CASCADE,
        FOREIGN KEY (tagId) REFERENCES Tag (id) ON DELETE CASCADE
      )
    `);

    console.log('✅ All tables created successfully');
    await seedInitialData();
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  }
}

async function seedInitialData() {
  try {
    console.log('🌱 Seeding initial data...');
    
    // Create default author
    const authorId = 'author_hossein_' + Date.now();
    await turso.execute({
      sql: `INSERT OR IGNORE INTO User (id, email, name, title, role, password) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        authorId,
        'admin@atechv.com',
        'Dr. Hossein Mohammadi',
        'AI Solutions Expert & CEO',
        'ADMIN',
        '$2a$12$hashedpassword123' // You should hash this properly in production
      ]
    });

    // Create categories
    const categories = [
      { id: 'cat_ai', name: 'AI Solutions', slug: 'ai-solutions', description: 'Artificial Intelligence and Machine Learning' },
      { id: 'cat_web', name: 'Web Development', slug: 'web-development', description: 'Web design and development services' },
      { id: 'cat_seo', name: 'SEO Services', slug: 'seo-services', description: 'Search Engine Optimization' },
      { id: 'cat_auto', name: 'Automation', slug: 'automation', description: 'Business Process Automation' }
    ];

    for (const cat of categories) {
      await turso.execute({
        sql: `INSERT OR IGNORE INTO Category (id, name, slug, description) VALUES (?, ?, ?, ?)`,
        args: [cat.id, cat.name, cat.slug, cat.description]
      });
    }

    // Create sample blog posts
    const posts = [
      {
        id: 'post_ai_automation_' + Date.now(),
        slug: 'ai-automation-small-business-dayton',
        title: 'How AI Automation Transforms Small Businesses in Dayton',
        excerpt: 'Discover how local Dayton businesses are leveraging AI automation to streamline operations, reduce costs, and increase productivity in 2025.',
        content: `<h2>The AI Revolution in Dayton</h2>
<p>Small businesses in Dayton, Ohio are experiencing unprecedented growth through AI automation. From inventory management to customer service, artificial intelligence is transforming how local companies operate.</p>

<h3>Key Benefits for Dayton Businesses:</h3>
<ul>
<li>Automated customer service chatbots that respond 24/7</li>
<li>Intelligent inventory management that predicts demand</li>
<li>Predictive analytics for accurate sales forecasting</li>
<li>Automated social media management and content creation</li>
<li>Smart appointment scheduling systems</li>
</ul>

<p>At AutoTech Venture, we help Dayton businesses implement these cutting-edge solutions. Our AI automation services have helped local companies reduce operational costs by up to 40% while improving customer satisfaction.</p>

<h3>Success Stories from Dayton</h3>
<p>One of our clients, a local manufacturing company, implemented our AI quality control system and reduced defects by 60%. Another Dayton retailer used our inventory optimization AI to reduce stockouts by 75%.</p>

<p>Ready to transform your business with AI? Contact AutoTech Venture today for a free consultation and discover how artificial intelligence can revolutionize your operations.</p>`,
        authorId: authorId,
        categoryId: 'cat_ai',
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date().toISOString(),
        metaTitle: 'AI Automation for Small Business Dayton Ohio | AutoTech Venture',
        metaDescription: 'Learn how AI automation helps Dayton small businesses improve efficiency and reduce costs. Expert AI consulting services in Ohio.',
        keywords: '["AI automation", "small business Dayton", "business automation Ohio", "artificial intelligence consulting"]'
      },
      {
        id: 'post_seo_services_' + Date.now(),
        slug: 'seo-services-dayton-ohio-2025',
        title: 'Complete SEO Guide for Dayton Ohio Businesses in 2025',
        excerpt: 'Master local SEO strategies that help Dayton businesses rank higher in Google search results and attract more local customers.',
        content: `<h2>Local SEO Success in Dayton</h2>
<p>Ranking high in local search results is crucial for Dayton businesses. Our comprehensive SEO strategies help local companies dominate search results and attract more customers from the greater Dayton area.</p>

<h3>Our Proven Dayton SEO Services Include:</h3>
<ul>
<li>Google Business Profile optimization for maximum visibility</li>
<li>Local keyword research targeting Dayton-specific searches</li>
<li>Complete website technical SEO audits and fixes</li>
<li>Content marketing strategies that engage local audiences</li>
<li>Local citation building across Ohio directories</li>
<li>Online reputation management and review optimization</li>
</ul>

<h3>Why Dayton Businesses Choose AutoTech Venture for SEO</h3>
<p>We understand the local Dayton market and know exactly what it takes to rank well in Ohio. Our clients typically see a 200% increase in organic traffic within 6 months.</p>

<h3>Local SEO Results That Matter</h3>
<p>Our recent client, a Dayton accounting firm, went from page 3 to position #1 for "tax services Dayton Ohio" in just 4 months. A local restaurant we worked with increased their online orders by 150% through improved local search visibility.</p>

<p>Ready to dominate local search results? Contact AutoTech Venture for a free SEO audit and see how we can help your Dayton business attract more customers online.</p>`,
        authorId: authorId,
        categoryId: 'cat_seo',
        status: 'PUBLISHED',
        featured: false,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        metaTitle: 'SEO Services Dayton Ohio | Local Search Optimization | AutoTech Venture',
        metaDescription: 'Professional SEO services for Dayton businesses. Improve local search rankings and attract more customers with our proven strategies.',
        keywords: '["SEO services Dayton", "local SEO Ohio", "Dayton digital marketing", "search engine optimization"]'
      }
    ];

    for (const post of posts) {
      await turso.execute({
        sql: `INSERT OR IGNORE INTO BlogPost 
              (id, slug, title, excerpt, content, authorId, categoryId, status, featured, publishedAt, metaTitle, metaDescription, keywords)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          post.id, post.slug, post.title, post.excerpt, post.content,
          post.authorId, post.categoryId, post.status, post.featured,
          post.publishedAt, post.metaTitle, post.metaDescription, post.keywords
        ]
      });
    }

    console.log('✅ Initial data seeded successfully');
    console.log('📊 Created:');
    console.log('  - 1 Admin user (Dr. Hossein Mohammadi)');
    console.log('  - 4 Categories (AI, Web Dev, SEO, Automation)');
    console.log('  - 2 Sample blog posts');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run the setup
setupTursoDatabase().then(() => {
  console.log('🎉 Database setup complete!');
  console.log('🔗 Your blog should now work at /blog');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Setup failed:', error);
  process.exit(1);
});