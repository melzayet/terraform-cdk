import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
import { AzurermProvider, CosmosdbAccount, CosmosdbSqlDatabase } from './.gen/providers/azurerm'

export class ContosoCosmosSqlFreeTierStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AzurermProvider(this, 'AzureRm', {
      features: [{}]
    })
  }

  mydbAccount = new CosmosdbAccount(this, 'tfdbAccount', {
    location: 'NorthEurope',  
    name: 'terraformdbaccount',
    resourceGroupName: 'dev-rg',
    offerType: 'Standard',
    consistencyPolicy: [{
      consistencyLevel: "Session"
    }],
    geoLocation: [{ location: 'NorthEurope', failoverPriority: 0}]    
  })

  mysqlDatabase = new CosmosdbSqlDatabase(this, 'tfsqlDB', {
    name: 'terraformsqldb',
    accountName: this.mydbAccount.name,
    resourceGroupName: 'dev-rg',
    dependsOn: [this.mydbAccount],
    throughput: 400
  })



}