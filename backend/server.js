const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mockSpeakers = require('./mockData');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// Configure CORS to allow requests from the frontend domain
const corsOptions = {
  origin: [
    'https://frontend-lbwuup5ajwcv2.azurewebsites.net',
    'http://localhost:3000' // Allow local development as well
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
};
app.use(cors(corsOptions));
app.use(express.json());

// In-memory cache for performance
let speakersCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Normalize speaker data from NTK API
function normalizeSpeakerData(data) {
  const speakers = new Map();
  
  if (!data.speakers || !Array.isArray(data.speakers)) {
    console.log('No speakers array found in API response');
    return [];
  }

  // First, add all speakers from the speakers array
  data.speakers.forEach(speaker => {
    const speakerId = speaker.id || `speaker-${speaker.firstName}-${speaker.lastName}`;
    const fullName = `${speaker.firstName || ''} ${speaker.lastName || ''}`.trim();
    
    speakers.set(speakerId, {
      id: speakerId,
      name: fullName || 'Unknown Speaker',
      title: speaker.companyName || '',
      bio: speaker.biography || '',
      imageUrl: speaker.urlPicture || '',
      talks: [],
      tags: [],
      socialLinks: []
    });

    // Add social links
    const speakerData = speakers.get(speakerId);
    if (speaker.urlLinkedIn) {
      speakerData.socialLinks.push({ type: 'linkedin', url: speaker.urlLinkedIn });
    }
    if (speaker.urlTwitter) {
      speakerData.socialLinks.push({ type: 'twitter', url: speaker.urlTwitter });
    }
    if (speaker.urlWebsite) {
      speakerData.socialLinks.push({ type: 'website', url: speaker.urlWebsite });
    }
    if (speaker.urlBlog) {
      speakerData.socialLinks.push({ type: 'blog', url: speaker.urlBlog });
    }
  });

  // Then, add talk information from sessions if available
  if (data.sessions && Array.isArray(data.sessions)) {
    data.sessions.forEach(session => {
      if (session.speakers && Array.isArray(session.speakers)) {
        session.speakers.forEach(sessionSpeaker => {
          const speakerId = sessionSpeaker.id || sessionSpeaker.speakerId;
          const speakerData = speakers.get(speakerId);
          
          if (speakerData) {
            // Add talk information
            speakerData.talks.push({
              id: session.id || `session-${session.title}`,
              title: session.title || 'Untitled Talk',
              abstract: session.abstract || session.description || '',
              dateTime: session.start || session.startTime || '',
              location: session.room || session.location || '',
              duration: session.duration || '',
              track: session.track?.name || ''
            });

            // Add tags from track
            if (session.track?.name && !speakerData.tags.includes(session.track.name)) {
              speakerData.tags.push(session.track.name);
            }
            
            // Add tags from level
            if (session.level?.name && !speakerData.tags.includes(session.level.name)) {
              speakerData.tags.push(session.level.name);
            }
          }
        });
      }
    });
  }

  const result = Array.from(speakers.values());
  console.log(`Processed ${result.length} speakers from API`);
  return result;
}

// Get speakers from cache or fetch from API
async function getSpeakers() {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (speakersCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return speakersCache;
  }

  try {
    console.log('Fetching fresh data from NTK API...');
    const response = await axios.get('https://www.ntk.si/api/clientapi/schedule', {
      timeout: 10000,
      headers: {
        'User-Agent': 'NTK-Gallery/1.0'
      }
    });

    const normalizedSpeakers = normalizeSpeakerData(response.data);
    
    // Update cache
    speakersCache = normalizedSpeakers;
    cacheTimestamp = now;
    
    console.log(`Cached ${normalizedSpeakers.length} speakers`);
    return normalizedSpeakers;
  } catch (error) {
    console.error('Error fetching NTK schedule:', error.message);
    
    // Return cached data if available, even if stale
    if (speakersCache) {
      console.log('Returning stale cached data due to API error');
      return speakersCache;
    }
    
    // Fall back to mock data if API is not available
    console.log('API not available, using mock data for development');
    speakersCache = mockSpeakers;
    cacheTimestamp = now;
    return mockSpeakers;
  }
}

// Routes
app.get('/api/speakers', async (req, res) => {
  try {
    const speakers = await getSpeakers();
    res.json({
      success: true,
      data: speakers,
      count: speakers.length,
      cached: speakersCache && (Date.now() - cacheTimestamp) < CACHE_DURATION
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch speakers data',
      message: error.message
    });
  }
});

// Get specific speaker by ID
app.get('/api/speakers/:id', async (req, res) => {
  try {
    const speakers = await getSpeakers();
    const speaker = speakers.find(s => s.id === req.params.id);
    
    if (!speaker) {
      return res.status(404).json({
        success: false,
        error: 'Speaker not found'
      });
    }
    
    res.json({
      success: true,
      data: speaker
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch speaker data',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'NTK Gallery API is running',
    timestamp: new Date().toISOString(),
    cache: {
      hasData: !!speakersCache,
      speakerCount: speakersCache ? speakersCache.length : 0,
      lastUpdate: cacheTimestamp ? new Date(cacheTimestamp).toISOString() : null
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  const isAzure = process.env.WEBSITE_HOSTNAME ? true : false;
  const baseUrl = isAzure 
    ? `https://${process.env.WEBSITE_HOSTNAME}`
    : `http://localhost:${PORT}`;
    
  console.log(`🚀 NTK Gallery Backend running on port ${PORT}`);
  console.log(`📊 Health check: ${baseUrl}/api/health`);
  console.log(`👥 Speakers API: ${baseUrl}/api/speakers`);
  console.log(`🌐 Running in ${isAzure ? 'Azure' : 'local'} environment`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port or stop the existing service.`);
  }
});