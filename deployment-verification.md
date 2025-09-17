# NTK Gallery Deployment Verification

## Backend API
- API URL: https://api-lbwuup5ajwcv2.azurewebsites.net/api
- Health Check: https://api-lbwuup5ajwcv2.azurewebsites.net/api/health
- Speakers Endpoint: https://api-lbwuup5ajwcv2.azurewebsites.net/api/speakers

## Frontend Static Web App
- URL: https://witty-flower-0e739f010.2.azurestaticapps.net

## Verification Steps:

### 1. Backend Verification
```powershell
# Check API health
curl https://api-lbwuup5ajwcv2.azurewebsites.net/api/health

# Check speakers endpoint
curl https://api-lbwuup5ajwcv2.azurewebsites.net/api/speakers
```

### 2. Frontend Verification
- Open https://witty-flower-0e739f010.2.azurestaticapps.net in a browser
- Verify that the app loads correctly
- Check that speakers data is displayed
- Test search and filter functionality
- Verify speaker detail page functionality

### 3. End-to-End Testing
- Verify that frontend can successfully call the backend API
- Check browser developer console for any errors
- Test app functionality on mobile devices
- Verify app performance

## Deployment Details:

### Backend
- Resource Type: Azure App Service
- Plan: Basic B1
- Runtime: Node.js 18 LTS

### Frontend
- Resource Type: Azure Static Web Apps
- SKU: Standard
- Region: Central US

## Troubleshooting:

If issues are encountered:
1. Check backend logs in Azure Portal
2. Verify CORS settings in backend server.js
3. Check network requests in browser developer tools
4. Validate environment variables in frontend .env.production file