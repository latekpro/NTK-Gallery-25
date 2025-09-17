# NTK Gallery Backend

Backend API server for the NTK Speakers Gallery application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. For production:
```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/speakers` - Get all speakers
- `GET /api/speakers/:id` - Get specific speaker

## Features

- CORS enabled for frontend integration
- In-memory caching (5 minutes)
- Error handling and logging
- Data normalization from NTK API
- Speaker profile aggregation