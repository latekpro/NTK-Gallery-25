# Azure Static Web App Deployment Instructions

Since we're encountering issues with automated deployment tools, here are the steps to deploy manually through the Azure Portal:

1. Open the Azure Portal: https://portal.azure.com/

2. Navigate to the Azure Static Web App resource:
   - Resource Group: ntk-gallery-rg
   - Resource Name: stapp-lbwuup5ajwcv2

3. In the left menu, under "Settings", look for "Configuration" (it may be called "Application settings" or similar)

4. For manual deployment, you can:
   - Use the "Source" section to configure source control deployment
   - Use "Advanced Tools" for direct file upload

## Option 1: Configure GitHub Actions
1. In the Azure Portal, under your Static Web App, look for "Source" or "Deployment Source"
2. Select "GitHub" as the source
3. Connect to your GitHub account if prompted
4. Select the repository: latekpro/NTK-Gallery
5. Configure build settings:
   - Build Preset: React
   - App location: /frontend
   - Output location: build
6. Click "Save" or "Apply"

## Option 2: Manual Deployment Using CLI
1. Make sure you have the frontend-build.zip file created from the build folder
2. Use the Azure Static Web Apps CLI:
   ```
   npm install -g @azure/static-web-apps-cli
   swa deploy ./frontend/build --deployment-token YOUR_DEPLOYMENT_TOKEN --env production
   ```
3. You can find the deployment token in the Azure Portal under the Static Web App > Configuration > Deployment tokens

## Option 3: Using Azure CLI
1. Make sure the frontend is built (`npm run build`)
2. Use Azure CLI to deploy:
   ```
   az staticwebapp create --name "stapp-lbwuup5ajwcv2" --resource-group "ntk-gallery-rg" --source ".\frontend\build" --location "centralus" --sku "Standard"
   ```
   or to update an existing one:
   ```
   az staticwebapp update --name "stapp-lbwuup5ajwcv2" --resource-group "ntk-gallery-rg" --source ".\frontend\build"
   ```

## Option 4: Direct File Upload via Azure Portal
1. In the Azure Portal, navigate to your Static Web App resource
2. Select "Content" or "File Explorer" from the left menu
3. Use the Upload button to upload your build files:
   - First upload the staticwebapp.config.json file
   - Then upload index.html and other root files
   - Create folders as needed (like static/, js/, css/) and upload files into them
4. This is more manual but provides a direct way to manage your files

## Verify Deployment
After deploying, visit the URL: https://witty-flower-0e739f010.2.azurestaticapps.net

## Troubleshooting
If you encounter issues:
- Check the deployment logs in the Azure Portal
- Verify that the .env.production file has the correct API URL
- Make sure CORS is enabled on the backend API Service