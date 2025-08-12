// Test script to verify your API endpoints
const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  try {
    // Test GET /api/blog
    console.log('Testing GET /api/blog...');
    const response = await fetch(`${API_BASE}/blog`);
    const data = await response.json();
    console.log('✅ Blog posts fetched:', data.posts?.length || 0);

    // Test POST /api/blog (requires authentication)
    console.log('Testing authentication required endpoints...');
    // Add your authentication token here for testing
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

testAPI();