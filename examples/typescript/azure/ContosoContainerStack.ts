import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
import { AzurermProvider, VirtualNetwork, ContainerGroup, NetworkProfile, Subnet } from './.gen/providers/azurerm'

export class ContosoContainerStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AzurermProvider(this, 'AzureRm', {
      features: [{}]
    })

    const myVnet = new VirtualNetwork(this, 'tfVnet', {
      location: 'NorthEurope',
      addressSpace: ['10.0.0.0/24'],
      name: 'TerraformVNet',
      resourceGroupName: 'dev-rg'
    })

    const mySubnet = new Subnet(this, 'mySubnet', {
        name: 'mySubnet',
        addressPrefix: '10.0.0.0/25',
        resourceGroupName: 'dev-rg',
        virtualNetworkName:  myVnet.name,
        dependsOn: [myVnet],
        delegation: [{ name: 'DelegationService', serviceDelegation: [{ name: 'Microsoft.ContainerInstance/containerGroups' }]}]
    })

    const myNetowrkProfile = new NetworkProfile(this, 'networkProfile', {
        name: 'TerraformNetworkProfile',
        resourceGroupName: 'dev-rg',
        location: 'NorthEurope',    
        dependsOn: [mySubnet],
        containerNetworkInterface: [{name: 'networkConfig1', ipConfiguration: [{ name: 'ipConfig1', subnetId: myVnet.id + '/subnets/mySubnet' }]}]
    })

    new ContainerGroup(this, 'containerGroup',{
      location: 'NorthEurope',
      osType: 'Linux',
      ipAddressType: 'private',
      networkProfileId: myNetowrkProfile.id,
      name: 'unique-co-n-grou-p',
      resourceGroupName: 'dev-rg',        
      container: [{ cpu:1, memory: 1, image: 'nginx', name: 'my-container', ports: [{ port: 80, protocol: 'TCP'}]}]
     })
  }
}