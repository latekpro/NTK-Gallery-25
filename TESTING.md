# Testing Documentation

This document outlines the testing implementation for the NTK Gallery application.

## Frontend Tests

### Location
- `frontend/src/App.test.js`

### Description
Basic React component tests using Jest and Testing Library:
- **Smoke test**: Verifies the main App component renders without crashing
- **Structure test**: Ensures the application content is properly rendered

### Running Frontend Tests
```bash
# From frontend directory
cd frontend
npm test

# From root directory
npm test
```

## Backend Tests

### Location
- `backend/api-test.js`

### Description
Simple integration tests for the API endpoints:
- **Health Check**: Tests `/api/health` endpoint for proper response
- **Speakers API**: Tests `/api/speakers` endpoint for data retrieval

### Running Backend Tests
```bash
# Start the backend server first
cd backend
npm start

# In another terminal, run the API tests
cd backend
npm test
```

## Test Commands

### Frontend Only
```bash
npm test                    # Run frontend tests
```

### Backend Only
```bash
# Requires backend server to be running
npm test --prefix backend   # Run API tests
```

### All Tests
```bash
npm run test-all           # Run both frontend and backend tests
```

## Test Structure

The test implementation provides:
1. **Basic functionality verification** - Ensures components render
2. **API endpoint testing** - Verifies backend endpoints respond correctly
3. **Mock data support** - Uses mocked hooks to avoid external API dependencies
4. **CI/CD ready** - Tests can be integrated into deployment pipelines

## Notes

- Frontend tests use mocked data to avoid external API calls during testing
- Backend tests require the server to be running and perform actual HTTP requests
- Both test suites provide basic smoke tests to verify core functionality