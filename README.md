# NTK Speakers Gallery

A visually stunning web application that showcases all speakers from the NTK conference by fetching their data from the NTK public schedule API.

![NTK Gallery Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=NTK+Speakers+Gallery)

## Project Structure

```
NTK-Gallery/
├── backend/          # Node.js Express API server
├── frontend/         # React application
├── start.bat         # Windows batch file to start both servers
├── start.ps1         # PowerShell script to start both servers
└── README.md         # This file
```

## Features

- 🎨 **Visual Gallery**: Dynamic, responsive speaker gallery with animations
- 🔍 **Search & Filter**: Live search by name and tag-based filtering
- 📱 **Responsive Design**: Mobile-first, touch-friendly design
- ✨ **Animations**: Hover effects, transitions, and micro-interactions
- 📋 **Speaker Profiles**: Detailed modal views with speaker information
- 🚀 **Performance**: Lazy loading and optimized image handling

## Quick Start

### Option 1: Use Start Scripts (Recommended)

**Windows Command Prompt:**
```bash
start.bat
```

**PowerShell:**
```bash
.\start.ps1
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Technology Stack

- **Frontend**: React 18+, Styled Components, Framer Motion, Masonry Layout
- **Backend**: Node.js, Express, Axios, CORS
- **External API**: NTK Schedule API

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Hot reloading enabled
```

### Building for Production
```bash
cd frontend
npm run build
```

## API Endpoints

- `GET /api/health` - Health check and cache status
- `GET /api/speakers` - Get all speakers with talks and metadata
- `GET /api/speakers/:id` - Get specific speaker details

## Architecture

The application follows a clean separation of concerns:

1. **Backend**: Serves as a proxy to the NTK API, normalizes data, and provides caching
2. **Frontend**: React SPA with component-based architecture and state management
3. **Styling**: Styled Components with CSS-in-JS approach
4. **Animations**: Framer Motion for smooth animations and transitions

## Data Flow

```
NTK API → Backend (Proxy/Cache) → Frontend (React) → User Interface
```

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## API Reference

The application fetches speaker data from: https://www.ntk.si/api/clientapi/schedule

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request