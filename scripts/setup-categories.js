// scripts/setup-categories.js - Setup Categories in Turso Database
// Run with: node scripts/setup-categories.js

const { createClient } = require('@libsql/client');
require('dotenv').config();

const client = createClient({
  url: process.env.DATABASE_URL,
});

async function setupCategories() {
  console.log('🔧 Setting up categories and default user in Turso database...');
  
  try {
    // First, create default user
    console.log('👤 Creating default user...');
    await client.execute({
      sql: `INSERT OR REPLACE INTO User (id, email, name, title, role, password, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'user_admin_1',
        'admin@atechv.com',
        'Dr. Hossein Mohammadi',
        'AI Solutions Expert & CEO',
        'ADMIN',
        'hashed_password_placeholder', // In real app, this would be properly hashed
        new Date().toISOString(),
        new Date().toISOString()
      ]
    });
    console.log('✅ Default user created');

    // Categories to create
    const categories = [
      {
        id: 'cat_ai_solutions_1755215496487',
        name: 'AI Solutions',
        slug: 'ai-solutions',
        description: 'Artificial intelligence and machine learning solutions for businesses',
        color: '#6366f1'
      },
      {
        id: 'cat_seo_services_1755215496488',
        name: 'SEO Services',
        slug: 'seo-services',
        description: 'Search engine optimization and digital marketing services',
        color: '#10b981'
      },
      {
        id: 'cat_web_development_1755215496489',
        name: 'Web Development',
        slug: 'web-development',
        description: 'Modern web development and application building',
        color: '#f59e0b'
      },
      {
        id: 'cat_automation_1755215496490',
        name: 'Automation',
        slug: 'automation',
        description: 'Business process automation and workflow optimization',
        color: '#ef4444'
      }
    ];

    // Insert categories
    for (const category of categories) {
      console.log(`📁 Creating category: ${category.name}`);
      
      await client.execute({
        sql: `INSERT OR REPLACE INTO Category (id, name, slug, description, color, createdAt) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          category.id,
          category.name,
          category.slug,
          category.description,
          category.color,
          new Date().toISOString()
        ]
      });
      
      console.log(`✅ Created: ${category.name} (${category.id})`);
    }

    // Verify setup
    console.log('\n🔍 Verifying setup...');
    
    const userResult = await client.execute('SELECT id, name, email FROM User LIMIT 1');
    console.log('\n👤 Default user:');
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      console.log(`   - ${user.name} (${user.email}) [ID: ${user.id}]`);
    }

    const categoryResult = await client.execute('SELECT id, name, slug FROM Category ORDER BY name');
    console.log('\n📋 Categories in database:');
    categoryResult.rows.forEach(row => {
      console.log(`   - ${row.name} (${row.slug}) [ID: ${row.id}]`);
    });

    console.log('\n✅ Setup completed successfully!');
    console.log('\n🎯 You can now create posts in the admin panel!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  }
}

setupCategories();