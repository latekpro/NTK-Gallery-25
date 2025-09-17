# CORS Configuration for Azure App Services

## Problem
When you have a frontend and backend deployed on different domains (like separate Azure App Services), you may encounter Cross-Origin Resource Sharing (CORS) errors like:

```
Access to XMLHttpRequest at '[BACKEND_URL]' from origin '[FRONTEND_URL]' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This happens because browsers enforce a security feature called the Same-Origin Policy, which prevents web pages from making requests to a different domain than the one that served the web page.

## Solution

### 1. Server-side CORS Configuration (Node.js/Express)

In your Express.js backend application, use the `cors` middleware with specific configuration:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS
const corsOptions = {
  origin: [
    'https://frontend-lbwuup5ajwcv2.azurewebsites.net', 
    'http://localhost:3000'  // Include local development URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
};

app.use(cors(corsOptions));
```

### 2. Azure App Service CORS Configuration

Additionally, configure CORS in your Azure App Service settings:

1. Navigate to your backend App Service in the Azure Portal
2. In the left menu, select "CORS" under "API"
3. Add your frontend URLs to the "Allowed Origins" list
4. Check "Enable Access-Control-Allow-Credentials" if your application requires credentials
5. Click "Save"

Using Azure CLI:
```bash
# View current CORS configuration
az webapp cors show --resource-group <resource-group> --name <app-name>

# Update CORS configuration with allowed origins
az webapp cors add --resource-group <resource-group> --name <app-name> --allowed-origins <frontend-url>
```

### 3. Testing CORS Configuration

To verify your CORS configuration is working:
- Open your frontend application
- Open the browser developer tools (F12) and check the Network tab
- Look for requests to your backend API
- Ensure they don't show CORS errors
- Check that the response headers include:
  - `Access-Control-Allow-Origin: <your-frontend-url>`
  - `Access-Control-Allow-Credentials: true` (if credentials are needed)

### Common Errors and Solutions

1. **Missing headers in response**: Ensure your CORS middleware is configured correctly and applied before any route handlers.

2. **Preflight requests failing**: Some complex requests trigger a preflight OPTIONS request. Ensure your server handles OPTIONS requests correctly.

3. **Credentials not allowed**: If using credentials, both the server and client must be configured to support them.

4. **Wildcards with credentials**: Using `origin: '*'` is not allowed with `credentials: true`. You must specify exact domains.

5. **Headers being overwritten**: Ensure CORS middleware runs before any other middleware that might modify headers.