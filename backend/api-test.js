// Simple test to verify the backend server functionality
const http = require('http');

// Test configuration
const API_HOST = 'localhost';
const API_PORT = 8080;
const BASE_URL = `http://${API_HOST}:${API_PORT}`;

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Basic API tests
async function runTests() {
  console.log('🧪 Running basic API tests...\n');
  
  try {
    // Test 1: Health check endpoint
    console.log('1. Testing health check endpoint...');
    const healthResponse = await makeRequest(`${BASE_URL}/api/health`);
    
    if (healthResponse.status === 200 && healthResponse.data.success) {
      console.log('✅ Health check passed');
      console.log(`   Message: ${healthResponse.data.message}`);
    } else {
      console.log('❌ Health check failed');
      console.log(`   Status: ${healthResponse.status}`);
    }
    
    // Test 2: Speakers endpoint
    console.log('\n2. Testing speakers endpoint...');
    const speakersResponse = await makeRequest(`${BASE_URL}/api/speakers`);
    
    if (speakersResponse.status === 200 && speakersResponse.data.success) {
      console.log('✅ Speakers endpoint passed');
      console.log(`   Speakers count: ${speakersResponse.data.count}`);
    } else {
      console.log('❌ Speakers endpoint failed');
      console.log(`   Status: ${speakersResponse.status}`);
    }
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.log('\n❌ Test failed with error:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 8080');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };