// AutoTech Venture Production Environment Diagnostic Script
// Save as: scripts/diagnose-production.js
// Run with: node scripts/diagnose-production.js

// ⚠️ UPDATE THIS URL TO YOUR ACTUAL PRODUCTION URL
const PRODUCTION_URL = 'https://autotech-venture.vercel.app/';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test production database connection
async function testProductionDatabase() {
  log('blue', '\n🔍 1. TESTING PRODUCTION DATABASE CONNECTION');
  log('blue', '═'.repeat(60));
  
  try {
    console.log(`Testing: ${PRODUCTION_URL}/api/debug/database`);
    
    const response = await fetch(`${PRODUCTION_URL}/api/debug/database`);
    const data = await response.json();
    
    if (response.ok && data.status === 'SUCCESS') {
      log('green', '✅ Production database connection successful');
      console.log('📊 Database Statistics:');
      console.log(`   Posts: ${data.stats?.posts || 0}`);
      console.log(`   Users: ${data.stats?.users || 0}`);
      console.log(`   Categories: ${data.stats?.categories || 0}`);
      
      if (data.latestPosts && data.latestPosts.length > 0) {
        console.log('\n📝 Recent Posts in Database:');
        data.latestPosts.forEach((post, index) => {
          console.log(`   ${index + 1}. "${post.title}" (${post.status})`);
        });
        
        // Check for DRAFT vs PUBLISHED posts
        const drafts = data.latestPosts.filter(p => p.status === 'DRAFT').length;
        const published = data.latestPosts.filter(p => p.status === 'PUBLISHED').length;
        
        if (drafts > published) {
          log('yellow', `\n⚠️  WARNING: More DRAFT posts (${drafts}) than PUBLISHED (${published})`);
          log('yellow', '   This could be why posts don\'t appear on your blog page');
        }
      } else {
        log('red', '\n❌ No posts found in production database');
        log('yellow', '   This explains why your blog page is empty');
      }
      
      return { success: true, data };
    } else {
      log('red', '❌ Production database connection failed');
      console.log('Error:', data.error || 'Unknown error');
      console.log('Status:', data.status || 'Unknown status');
      return { success: false, error: data.error };
    }
  } catch (error) {
    log('red', '❌ Could not connect to production database endpoint');
    console.log('Network Error:', error.message);
    console.log('\n💡 Possible causes:');
    console.log('   • Production site is down');
    console.log('   • Incorrect production URL');
    console.log('   • Database endpoint not deployed');
    return { success: false, error: error.message };
  }
}

// Test production blog API
async function testProductionBlogAPI() {
  log('blue', '\n🌐 2. TESTING PRODUCTION BLOG API');
  log('blue', '═'.repeat(60));
  
  const tests = [
    {
      name: 'All Posts',
      url: `${PRODUCTION_URL}/api/blog`,
      description: 'Fetches all blog posts'
    },
    {
      name: 'Published Posts Only',
      url: `${PRODUCTION_URL}/api/blog?status=PUBLISHED`,
      description: 'Fetches only published posts (what users see)'
    },
    {
      name: 'Draft Posts',
      url: `${PRODUCTION_URL}/api/blog?status=DRAFT`,
      description: 'Fetches draft posts (hidden from users)'
    },
    {
      name: 'Featured Posts',
      url: `${PRODUCTION_URL}/api/blog?featured=true`,
      description: 'Fetches featured posts'
    }
  ];
  
  const results = {};
  
  for (const test of tests) {
    try {
      console.log(`\n🧪 Testing: ${test.name}`);
      console.log(`   ${test.description}`);
      
      const response = await fetch(test.url);
      const data = await response.json();
      
      if (response.ok && data.posts) {
        log('green', `✅ Success - Found ${data.posts.length} posts`);
        
        if (data.posts.length > 0) {
          const samplePost = data.posts[0];
          console.log(`   📖 Sample: "${samplePost.title}"`);
          console.log(`   📅 Status: ${samplePost.status || 'undefined'}`);
          console.log(`   👤 Author: ${samplePost.author?.name || 'undefined'}`);
        }
        
        results[test.name.toLowerCase().replace(' ', '_')] = data.posts.length;
      } else {
        log('red', `❌ Failed (${response.status})`);
        console.log('   Error:', data.error || 'Unknown error');
        results[test.name.toLowerCase().replace(' ', '_')] = 0;
      }
    } catch (error) {
      log('red', `❌ Network error: ${error.message}`);
      results[test.name.toLowerCase().replace(' ', '_')] = 0;
    }
    
    await wait(500); // Rate limiting
  }
  
  return results;
}

// Test production CMS access
async function testProductionCMS() {
  log('blue', '\n⚙️ 3. TESTING PRODUCTION CMS ACCESS');
  log('blue', '═'.repeat(60));
  
  try {
    console.log(`Testing CMS endpoint: ${PRODUCTION_URL}/admin`);
    
    const response = await fetch(`${PRODUCTION_URL}/admin`);
    
    if (response.ok) {
      log('green', '✅ Production CMS page is accessible');
      console.log(`   Status: ${response.status}`);
      console.log(`   CMS URL: ${PRODUCTION_URL}/admin`);
      
      return { accessible: true };
    } else {
      log('yellow', `⚠️  CMS page returned status: ${response.status}`);
      return { accessible: false, status: response.status };
    }
  } catch (error) {
    log('red', `❌ Could not access CMS: ${error.message}`);
    return { accessible: false, error: error.message };
  }
}

// Test individual post endpoints
async function testIndividualPosts(apiResults) {
  log('blue', '\n📄 4. TESTING INDIVIDUAL POST PAGES');
  log('blue', '═'.repeat(60));
  
  if (!apiResults.all_posts || apiResults.all_posts === 0) {
    log('yellow', '⚠️  No posts available to test individual pages');
    return { tested: 0, working: 0 };
  }
  
  try {
    // Get a few posts to test
    const response = await fetch(`${PRODUCTION_URL}/api/blog?limit=3`);
    const data = await response.json();
    
    if (!data.posts || data.posts.length === 0) {
      log('yellow', '⚠️  No posts returned for individual testing');
      return { tested: 0, working: 0 };
    }
    
    let working = 0;
    
    for (const post of data.posts) {
      try {
        console.log(`\n🧪 Testing: ${post.slug}`);
        
        const postResponse = await fetch(`${PRODUCTION_URL}/api/blog/${post.slug}`);
        
        if (postResponse.ok) {
          const postData = await postResponse.json();
          log('green', `✅ Individual post page working`);
          console.log(`   Title: ${postData.title}`);
          console.log(`   URL: ${PRODUCTION_URL}/blog/${post.slug}`);
          working++;
        } else {
          log('red', `❌ Individual post failed (${postResponse.status})`);
          console.log(`   This means ${PRODUCTION_URL}/blog/${post.slug} will show 404`);
        }
      } catch (error) {
        log('red', `❌ Error testing ${post.slug}: ${error.message}`);
      }
      
      await wait(300);
    }
    
    return { tested: data.posts.length, working };
  } catch (error) {
    log('red', `❌ Could not test individual posts: ${error.message}`);
    return { tested: 0, working: 0 };
  }
}

// Check environment-specific issues
async function checkProductionEnvironment() {
  log('blue', '\n🌍 5. CHECKING PRODUCTION ENVIRONMENT');
  log('blue', '═'.repeat(60));
  
  console.log('🔍 Checking production environment indicators...\n');
  
  // Check if using Turso (production database)
  try {
    const response = await fetch(`${PRODUCTION_URL}/api/debug/database`);
    const data = await response.json();
    
    if (data.database && data.database.includes('Turso')) {
      log('green', '✅ Using Turso cloud database (production setup)');
    } else if (data.database && data.database.includes('SQLite')) {
      log('yellow', '⚠️  Using local SQLite (may be development setup)');
    } else {
      log('yellow', '⚠️  Database type unclear');
    }
    
    console.log(`   Database: ${data.database || 'Unknown'}`);
    console.log(`   Connection: ${data.status || 'Unknown'}`);
    
  } catch (error) {
    log('red', '❌ Could not determine database type');
  }
  
  // Check deployment timestamp
  console.log(`\n📅 Current test time: ${new Date().toISOString()}`);
  console.log(`🌐 Testing URL: ${PRODUCTION_URL}`);
}

// Generate action plan based on results
function generateActionPlan(dbResult, apiResults, cmsResult, postResult) {
  log('blue', '\n📋 6. DIAGNOSIS & ACTION PLAN');
  log('blue', '═'.repeat(60));
  
  console.log('\n🎯 DIAGNOSIS SUMMARY:');
  
  // Database issues
  if (!dbResult.success) {
    log('red', '\n❌ CRITICAL: Database connection failed');
    console.log('🔧 IMMEDIATE ACTIONS NEEDED:');
    console.log('   1. Check Vercel environment variables');
    console.log('   2. Verify DATABASE_URL is correct');
    console.log('   3. Check Turso database is active');
    console.log('   4. Redeploy with correct environment variables');
    return;
  }
  
  // Empty database
  if (dbResult.data?.stats?.posts === 0) {
    log('yellow', '\n⚠️  ISSUE: Database is empty');
    console.log('🔧 ACTIONS NEEDED:');
    console.log('   1. Access production CMS and create posts');
    console.log('   2. Or run database seeding script');
    console.log('   3. Ensure posts are set to "PUBLISHED" status');
  }
  
  // Draft vs Published issues
  if (apiResults.published_posts_only === 0 && apiResults.draft_posts > 0) {
    log('yellow', '\n⚠️  ISSUE: All posts are DRAFT (not visible to users)');
    console.log('🔧 ACTIONS NEEDED:');
    console.log('   1. Access production CMS');
    console.log('   2. Edit existing posts');
    console.log('   3. Change status from DRAFT to PUBLISHED');
    console.log('   4. Save changes');
  }
  
  // CMS access issues
  if (!cmsResult.accessible) {
    log('yellow', '\n⚠️  ISSUE: CMS not accessible');
    console.log('🔧 ACTIONS NEEDED:');
    console.log('   1. Check if admin page is deployed');
    console.log('   2. Verify authentication system is working');
    console.log('   3. Check browser console for errors');
  }
  
  // Individual post issues
  if (postResult.tested > 0 && postResult.working === 0) {
    log('yellow', '\n⚠️  ISSUE: Individual post pages not working');
    console.log('🔧 ACTIONS NEEDED:');
    console.log('   1. Check if app/blog/[slug]/page.tsx exists');
    console.log('   2. Verify dynamic routing is deployed');
    console.log('   3. Check for build errors');
  }
  
  // Success case
  if (dbResult.success && apiResults.published_posts_only > 0 && cmsResult.accessible) {
    log('green', '\n✅ SYSTEM APPEARS HEALTHY');
    console.log('🎉 Your production blog system seems to be working correctly!');
    console.log('\n📝 If you\'re still not seeing posts on the blog page:');
    console.log('   1. Clear browser cache');
    console.log('   2. Check if posts are featured (for homepage)');
    console.log('   3. Verify frontend is fetching from correct API endpoints');
  }
  
  console.log('\n🔗 USEFUL LINKS:');
  console.log(`   • Production Blog: ${PRODUCTION_URL}/blog`);
  console.log(`   • Production CMS: ${PRODUCTION_URL}/admin`);
  console.log(`   • Database Debug: ${PRODUCTION_URL}/api/debug/database`);
  console.log(`   • Vercel Dashboard: https://vercel.com/hossein641s-projects/autotech-venture`);
}

// Main diagnostic function
async function runProductionDiagnosis() {
  console.log('🚀 AutoTech Venture Production Environment Diagnosis');
  console.log('═'.repeat(70));
  console.log(`🌐 Testing: ${PRODUCTION_URL}`);
  console.log('🎯 Focus: Turso database and Vercel deployment\n');
  
  // Update production URL if needed
  if (PRODUCTION_URL.includes('autotech-venture-nye9mbyb3')) {
    log('yellow', '⚠️  Using default production URL. Update PRODUCTION_URL in script if needed.\n');
  }
  
  try {
    // Run all tests
    const dbResult = await testProductionDatabase();
    await wait(1000);
    
    const apiResults = await testProductionBlogAPI();
    await wait(1000);
    
    const cmsResult = await testProductionCMS();
    await wait(1000);
    
    const postResult = await testIndividualPosts(apiResults);
    await wait(1000);
    
    await checkProductionEnvironment();
    
    // Generate action plan
    generateActionPlan(dbResult, apiResults, cmsResult, postResult);
    
  } catch (error) {
    log('red', '\n💥 Diagnosis failed with error:');
    console.log(error);
    console.log('\n🔧 Basic troubleshooting:');
    console.log('   1. Check if production site is accessible');
    console.log('   2. Verify PRODUCTION_URL in this script is correct');
    console.log('   3. Check Vercel deployment status');
  }
  
  console.log('\n📞 Need help? Share this diagnosis output for support.');
}

// Update production URL prompt
console.log('🔧 SETUP: Update PRODUCTION_URL at the top of this script with your actual production URL');
console.log('📝 Current URL:', PRODUCTION_URL);
console.log('⏱️  Starting diagnosis in 3 seconds...\n');

setTimeout(runProductionDiagnosis, 3000);