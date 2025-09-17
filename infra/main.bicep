/*
  NTK-Gallery Azure Resources
  This template deploys:
  - App Service Plan and App Service for the Node.js backend
  - Static Web App for the React frontend
  - User-assigned managed identity for secure connections
*/

// Parameters
@description('The environment name. Default: dev')
param environmentName string = 'dev'

@description('The Azure region for all resources.')
param location string = resourceGroup().location

// Tags that will be applied to all resources
var tags = {
  'azd-env-name': environmentName
  application: 'ntk-gallery'
  environment: environmentName
}

// Resource token format must contain uniqueString(subscription().id, resourceGroup().id, location, environmentName)
var resourceToken = uniqueString(subscription().id, resourceGroup().id, location, environmentName)

// Resource name variables using resourceToken
var appServicePlanName = 'plan-${resourceToken}'
var backendAppServiceName = 'api-${resourceToken}'
var frontendStaticWebAppName = 'stapp-${resourceToken}'
var managedIdentityName = 'id-${resourceToken}'

// Create user-assigned managed identity for secure connections
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2022-01-31-preview' = {
  name: managedIdentityName
  location: location
  tags: tags
}

// App Service Plan for backend
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  tags: tags
  sku: {
    name: 'B1' // Basic tier, adjust as needed
  }
  properties: {
    reserved: true // Required for Linux
  }
}

// Backend App Service
resource backendAppService 'Microsoft.Web/sites@2022-03-01' = {
  name: backendAppServiceName
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appSettings: [
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~18'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
      ]
      cors: {
        allowedOrigins: [
          'https://${frontendStaticWebApp.properties.defaultHostname}'
        ]
        supportCredentials: false
      }
    }
  }
}

// Frontend Static Web App
resource frontendStaticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: frontendStaticWebAppName
  location: 'centralus' // Using centralus as it's a supported region for Static Web Apps
  tags: tags
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
}

// Outputs
output backendUrl string = 'https://${backendAppService.properties.defaultHostName}'
output frontendUrl string = 'https://${frontendStaticWebApp.properties.defaultHostname}'
output managedIdentityId string = managedIdentity.id
output managedIdentityClientId string = managedIdentity.properties.clientId
output resourceGroupName string = resourceGroup().name
output location string = location
output RESOURCE_GROUP_ID string = resourceGroup().id
