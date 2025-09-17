# NTK-Gallery Deployment Guide

This document outlines the steps to deploy the NTK-Gallery application to Azure using Bicep templates and GitHub Actions.

## Architecture

The application consists of:
- **Backend**: Node.js/Express API running on Azure App Service
- **Frontend**: React application hosted on Azure Static Web App
- **CI/CD**: GitHub Actions workflows for automated deployments

## Prerequisites

1. An Azure account with an active subscription
2. GitHub repository for the project
3. Azure CLI installed for local deployments
4. GitHub repository secrets configured for CI/CD

## Setup GitHub Secrets

The following secrets need to be configured in your GitHub repository:

1. `AZURE_APP_SERVICE_NAME` - The name of your Azure App Service
2. `AZURE_APP_SERVICE_PUBLISH_PROFILE` - The publish profile for your Azure App Service
3. `AZURE_STATIC_WEB_APP_TOKEN` - The deployment token for your Azure Static Web App
4. `REACT_APP_API_URL` - The URL of your backend API (e.g., `https://api-ntk-dev-abc123.azurewebsites.net/api`)

## Manual Deployment

### Deploy Azure Resources

1. Create a resource group:
   ```powershell
   az group create --name ntk-gallery-rg --location eastus
   ```

2. Deploy the infrastructure using Bicep:
   ```powershell
   az deployment group create --resource-group ntk-gallery-rg --template-file ./infra/main.bicep --parameters ./infra/main.parameters.json
   ```

> **Note**: For Static Web App deployment, make sure to use a supported region (centralus, eastus2, westus2, westeurope, eastasia) and set the SKU to 'Standard'.

### Deploy Backend

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create a deployment package:
   ```powershell
   zip -r deploy.zip . -x "node_modules/*"
   ```

3. Deploy to Azure App Service:
   ```powershell
   az webapp deployment source config-zip --resource-group ntk-gallery-rg --name <your-app-service-name> --src deploy.zip
   ```

### Deploy Frontend

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Create an environment file with the backend URL:
   ```powershell
   echo "REACT_APP_API_URL=https://<your-app-service-name>.azurewebsites.net/api" > .env.production
   ```

3. Build the application:
   ```powershell
   npm run build
   ```

4. Deploy to Azure Static Web App using the Azure Portal or Azure CLI.

## Automated Deployment

For automated deployments, simply push changes to the main branch:

- Changes to the `backend/` directory will trigger the backend deployment workflow
- Changes to the `frontend/` directory will trigger the frontend deployment workflow

You can also manually trigger each workflow from the GitHub Actions tab.

## Environment Variables

### Backend (App Service)

Configure the following application settings in Azure App Service:
- `PORT` - The port for the server (default: 8080)

### Frontend (Static Web App)

The React application uses the following environment variables:
- `REACT_APP_API_URL` - The URL of the backend API

## Monitoring

- Backend API health check: `https://<your-app-service-name>.azurewebsites.net/api/health`
- Azure Portal provides monitoring and logging features for both App Service and Static Web App

## Troubleshooting

- Check Azure App Service logs for backend issues
- Verify that CORS is properly configured in the backend
- Ensure the frontend is using the correct API URL
- Check GitHub Actions workflow runs for deployment errors