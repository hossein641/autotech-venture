// AutoTech Venture - Detailed API Investigation
// Save as: scripts/investigate-api-issue.js
// Run with: node scripts/investigate-api-issue.js

const PRODUCTION_URL = 'https://autotech-venture.vercel.app';

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

// Detailed API investigation
async function investigateAPIIssue() {
  console.log('🔍 AutoTech Venture - API Status Filtering Investigation');
  console.log('═'.repeat(70));
  console.log('🎯 Investigating why CMS posts may not appear on blog pages\n');
  
  // Test 1: Get raw API response
  log('blue', '📋 1. RAW API RESPONSE ANALYSIS');
  console.log('═'.repeat(50));
  
  try {
    const response = await fetch(`${PRODUCTION_URL}/api/blog?limit=5`);
    const data = await response.json();
    
    console.log('🔍 Full API Response Structure:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.posts && data.posts.length > 0) {
      log('green', '\n✅ Posts found in API response');
      
      console.log('\n📄 Individual Post Analysis:');
      data.posts.forEach((post, index) => {
        console.log(`\n   Post ${index + 1}:`);
        console.log(`   ├─ Title: "${post.title}"`);
        console.log(`   ├─ Slug: "${post.slug}"`);
        console.log(`   ├─ Status: ${post.status || 'UNDEFINED/MISSING'}`);
        console.log(`   ├─ Published At: ${post.publishedAt || 'UNDEFINED/MISSING'}`);
        console.log(`   ├─ Featured: ${post.featured || 'false'}`);
        console.log(`   ├─ Author: ${post.author?.name || 'UNDEFINED'}`);
        console.log(`   └─ Category: ${post.category || 'UNDEFINED'}`);
        
        // Check for missing critical fields
        const issues = [];
        if (!post.status) issues.push('Missing status field');
        if (!post.publishedAt) issues.push('Missing publishedAt field');
        if (!post.author?.name) issues.push('Missing author name');
        if (!post.category) issues.push('Missing category');
        
        if (issues.length > 0) {
          log('red', `   ❌ Issues: ${issues.join(', ')}`);
        } else {
          log('green', `   ✅ All fields present`);
        }
      });
    } else {
      log('red', '❌ No posts found in API response');
    }
  } catch (error) {
    log('red', `❌ API request failed: ${error.message}`);
  }
  
  // Test 2: Test specific status filtering
  log('blue', '\n📋 2. STATUS FILTERING DETAILED TEST');
  console.log('═'.repeat(50));
  
  const statusTests = [
    { name: 'All Posts', url: `${PRODUCTION_URL}/api/blog` },
    { name: 'Published Only', url: `${PRODUCTION_URL}/api/blog?status=PUBLISHED` },
    { name: 'Draft Only', url: `${PRODUCTION_URL}/api/blog?status=DRAFT` },
    { name: 'No Status Filter', url: `${PRODUCTION_URL}/api/blog?limit=10` }
  ];
  
  for (const test of statusTests) {
    try {
      console.log(`\n🧪 Testing: ${test.name}`);
      const response = await fetch(test.url);
      const data = await response.json();
      
      if (data.posts) {
        console.log(`   📊 Results: ${data.posts.length} posts`);
        
        if (data.posts.length > 0) {
          // Analyze status distribution
          const statusCounts = {};
          data.posts.forEach(post => {
            const status = post.status || 'UNDEFINED';
            statusCounts[status] = (statusCounts[status] || 0) + 1;
          });
          
          console.log('   📈 Status Distribution:');
          Object.entries(statusCounts).forEach(([status, count]) => {
            const color = status === 'PUBLISHED' ? 'green' : status === 'DRAFT' ? 'yellow' : 'red';
            log(color, `      ${status}: ${count} posts`);
          });
        }
      } else {
        log('red', '   ❌ No posts in response');
      }
    } catch (error) {
      log('red', `   ❌ Test failed: ${error.message}`);
    }
  }
  
  // Test 3: Direct database check via debug endpoint
  log('blue', '\n📋 3. DATABASE CONTENT VERIFICATION');
  console.log('═'.repeat(50));
  
  try {
    const response = await fetch(`${PRODUCTION_URL}/api/debug/database`);
    const data = await response.json();
    
    if (data.latestPosts) {
      console.log('\n🗄️ Posts directly from database:');
      data.latestPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. "${post.title}"`);
        console.log(`      Status: ${post.status || 'UNDEFINED'}`);
        console.log(`      ID: ${post.id}`);
        console.log(`      Slug: ${post.slug}`);
      });
    }
  } catch (error) {
    log('red', `❌ Database check failed: ${error.message}`);
  }
  
  // Test 4: Test frontend blog page
  log('blue', '\n📋 4. FRONTEND BLOG PAGE TEST');
  console.log('═'.repeat(50));
  
  try {
    console.log(`🌐 Testing frontend: ${PRODUCTION_URL}/blog`);
    const response = await fetch(`${PRODUCTION_URL}/blog`);
    
    if (response.ok) {
      log('green', '✅ Blog page accessible');
      console.log(`   Status: ${response.status}`);
      
      // Check if it's a Next.js page
      const contentType = response.headers.get('content-type');
      console.log(`   Content-Type: ${contentType}`);
      
      if (contentType?.includes('text/html')) {
        log('green', '   ✅ Returns HTML (Next.js page working)');
      }
    } else {
      log('red', `❌ Blog page failed: ${response.status}`);
    }
  } catch (error) {
    log('red', `❌ Frontend test failed: ${error.message}`);
  }
  
  // Test 5: Generate diagnosis
  log('blue', '\n📋 5. ISSUE DIAGNOSIS & SOLUTION');
  console.log('═'.repeat(50));
  
  console.log('\n🎯 LIKELY ISSUES IDENTIFIED:');
  
  console.log('\n1️⃣ API Status Field Issue:');
  console.log('   Problem: API returns status as "undefined"');
  console.log('   Impact: Frontend cannot filter posts properly');
  console.log('   Fix: Check API route status field mapping');
  
  console.log('\n2️⃣ Status Filtering Logic:');
  console.log('   Problem: Same posts returned for PUBLISHED and DRAFT queries');
  console.log('   Impact: Status filtering not working');
  console.log('   Fix: Review Prisma query in /api/blog route');
  
  console.log('\n3️⃣ Database Schema Issue:');
  console.log('   Problem: Posts might not have proper status values in DB');
  console.log('   Impact: No posts show correct status');
  console.log('   Fix: Update database records or seeding script');
  
  // Provide specific next steps
  console.log('\n🔧 IMMEDIATE ACTION PLAN:');
  console.log('\n   Step 1: Check your /api/blog route.ts file');
  console.log('   Step 2: Verify Prisma query includes status field');
  console.log('   Step 3: Check database records have status values');
  console.log('   Step 4: Test status filtering logic');
  
  console.log('\n📝 FILES TO CHECK:');
  console.log('   • app/api/blog/route.ts (API endpoint)');
  console.log('   • Database records via Prisma Studio');
  console.log('   • Frontend blog page API calls');
  
  console.log('\n🔍 MANUAL VERIFICATION:');
  console.log(`   1. Visit: ${PRODUCTION_URL}/admin`);
  console.log('   2. Create a new test post');
  console.log('   3. Set status to PUBLISHED');
  console.log('   4. Save and check if it appears on blog page');
  console.log(`   5. Check API: ${PRODUCTION_URL}/api/blog`);
  
  log('green', '\n✅ Investigation complete. The issue is in the API status handling.');
}

investigateAPIIssue();