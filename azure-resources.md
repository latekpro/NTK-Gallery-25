# Azure Resource Names

This file contains the names and URLs of the Azure resources created by the Bicep deployment.

## Backend Resources
- App Service Plan: plan-lbwuup5ajwcv2 (eastus)
- App Service: api-lbwuup5ajwcv2 (eastus)

## Frontend Resources
- Static Web App: stapp-lbwuup5ajwcv2 (centralus)

## Other Resources
- User-assigned Managed Identity: id-lbwuup5ajwcv2
  - Client ID: 12ebf012-76cf-4dff-90c0-c69c460e5de0

## URLs
- Backend URL: https://api-lbwuup5ajwcv2.azurewebsites.net
- Frontend URL: https://witty-flower-0e739f010.2.azurestaticapps.net

## Resource Group
- Name: ntk-gallery-rg
- ID: /subscriptions/03e9d51d-eb6b-4152-a818-51b2f9fc6ea9/resourceGroups/ntk-gallery-rg
- Location: eastus

## GitHub Actions Setup

For CI/CD with GitHub Actions, set up the following secrets in your GitHub repository:

1. `AZURE_APP_SERVICE_NAME` = api-lbwuup5ajwcv2
2. `AZURE_APP_SERVICE_PUBLISH_PROFILE` = (Get this from the Azure portal - App Service > Deployment Center > Manage publish profile)
3. `AZURE_STATIC_WEB_APP_TOKEN` = (Get this from the Azure portal - Static Web App > Overview > Manage deployment token)
4. `REACT_APP_API_URL` = https://api-lbwuup5ajwcv2.azurewebsites.net/api