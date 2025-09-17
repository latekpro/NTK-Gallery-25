# MIME Type Issues in Azure Static Web App

## Problem

When deploying a Single Page Application (SPA) like React to Azure Static Web Apps, you might encounter the following error:

```
Refused to execute script from '[URL]/static/js/main.[hash].js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled
```

This happens when the server returns HTML content when the browser is expecting JavaScript content. This is typically a routing issue where the server does not recognize the correct MIME types for static assets.

## Solution

### 1. Update staticwebapp.config.json

Ensure your `staticwebapp.config.json` file includes proper MIME type definitions:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "rewrite": "/index.html"
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif}", "/css/*", "/static/css/*", "/static/js/*", "/static/media/*", "/api/*"]
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "content-security-policy": "default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'",
    "cache-control": "no-cache"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".js": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".map": "application/json",
    ".txt": "text/plain"
  }
}
```

Key points:
- The `mimeTypes` section maps file extensions to their proper MIME types
- The `navigationFallback.exclude` section must include paths to your static assets to prevent the SPA router from intercepting them
- Place this file in the root of your build output folder (e.g., `/build` for React)

### 2. Deployment

To deploy with the correct configuration:

**Manual deployment:**
```bash
swa deploy ./build --deployment-token YOUR_DEPLOYMENT_TOKEN --env production
```

**GitHub Actions:**
Update your workflow file to include a step that creates the correct configuration file before deployment.

### 3. Verification

After deployment, check your browser's developer tools Network tab to ensure JavaScript files are being served with the `application/javascript` MIME type rather than `text/html`.

## Prevention

- Always include a proper `staticwebapp.config.json` file in your build output
- Set up automated deployments with GitHub Actions using the provided workflow file
- Test static asset loading after each deployment