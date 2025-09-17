const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Simple test endpoints
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({
    success: true,
    message: 'NTK Gallery API is running (test mode)',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/speakers', (req, res) => {
  console.log('Speakers endpoint requested');
  // Return mock data for testing
  const mockSpeakers = [
    {
      id: 'speaker-1',
      name: 'John Doe',
      title: 'Software Engineer',
      bio: 'Experienced software engineer with a passion for web development.',
      imageUrl: 'https://via.placeholder.com/200x200/667eea/ffffff?text=JD',
      talks: [
        {
          id: 'talk-1',
          title: 'Building Modern Web Applications',
          abstract: 'Learn how to build scalable web applications using modern technologies.',
          dateTime: '2025-09-18T10:00:00Z',
          location: 'Main Hall'
        }
      ],
      tags: ['JavaScript', 'React', 'Node.js'],
      socialLinks: [
        { type: 'twitter', url: 'https://twitter.com/johndoe' },
        { type: 'linkedin', url: 'https://linkedin.com/in/johndoe' }
      ]
    },
    {
      id: 'speaker-2',
      name: 'Jane Smith',
      title: 'UX Designer',
      bio: 'Creative UX designer focused on user-centered design principles.',
      imageUrl: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=JS',
      talks: [
        {
          id: 'talk-2',
          title: 'Design Systems for Developers',
          abstract: 'How to create and maintain effective design systems.',
          dateTime: '2025-09-18T14:00:00Z',
          location: 'Room A'
        }
      ],
      tags: ['UX', 'Design', 'Figma'],
      socialLinks: [
        { type: 'website', url: 'https://janesmith.design' }
      ]
    }
  ];

  res.json({
    success: true,
    data: mockSpeakers,
    count: mockSpeakers.length,
    cached: false,
    mode: 'test'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NTK Gallery Test Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Speakers API: http://localhost:${PORT}/api/speakers`);
  console.log(`📝 Test mode with mock data`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
  }
});